// @ts-check
import { PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js'
import { GestureEventListeners } from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js'
import './badge-includes.js';

var template = `
       <style is="custom-style" include="app-styles"> 
        .hide { display:none;height:0px;}
        app-toolbar { transition: all 0.5s ease;top:0px;}
        app-toolbar.hidden  { top:-64px;}
        #tabs { transition: height 0.5s ease;position:fixed;bottom:0px;width:100vw;height:40px;--paper-tabs-selection-bar-color: #040356; background-color:#040356;}
        #tabs.hidden { position:fixed;bottom:-40px;width:100vw;height:40px;}
        iron-icon { --iron-icon-fill-color:white}
        paper-dialog iron-icon { --iron-icon-fill-color:black}
        a { text-decoration:none;color:black;}
       </style>
       <custom-style>
            <style is="custom-style" include="paper-material-styles"></style>
       </custom-style>
       <app-header-layout>
            <app-header id="header" slot="header" condenses fixed effects="waterfall">
               <app-toolbar id="toolbar" style="padding:0px;"><div class="logo" style="flex:1"><img src="/images/smartbadgeicon.png"></div>
               <template is="dom-if" if="[[_hasSelectedItems(selectedItems.*)]]">
                    <paper-icon-button icon="print" on-tap="_printBadge"></paper-icon-button>
               </template>
               <template is="dom-if" if="[[_hasSelectedItems(selectedItems.*)]]">
               <paper-icon-button icon="communication:clear-all" on-tap="_clearAll"></paper-icon-button>
                </template>
                <template is="dom-if" if="[[!_hasSelectedItems(selectedItems.*)]]">
                <paper-icon-button icon="done-all" on-tap="_selectAll"></paper-icon-button>
               </template>
               <paper-icon-button icon="search" on-tap="_search"></paper-icon-button>
               </app-toolbar>
           </app-header>
            <iron-pages selected="{{selpage}}">
                 <badge-registration id="registration" registrationdata="{{registration}}" username="{{username}}" step="{{step}}" on-registration-completed="_saveRegistration"></badge-registration>
                <badge-presentation id="presentation" emailaddress="{{emailaddress}}" items="{{items}}" selected-items="{{selectedItems}}" filter="{{filter}}" itemslastvisited="{{lastvisited}}" on-print-badge="_printBadge"></badge-presentation>
                <badge-print id="printBadge" on-print-badge-done="_printBadgeDone" items="{{selectedItems}}"></badge-print>
            </iron-pages>
       </app-header-layout>
       <badge-prompt on-close="_setFilter" id="seachprompt" header="Zoeken naar" content="Geef hieronder uw zoekargument op" label="zoeken naar"></badge-prompt>
       <paper-tabs id="tabs" selected="{{selpage}}">
            <paper-tab><iron-icon icon="create"></iron-icon></paper-tab>
            <paper-tab><iron-icon icon="image:grid-on"></iron-icon></paper-tab>
       </paper-tabs>

       <ico-app api-key="AIzaSyC-0AJ2JrHirZ7cKPojEUks26Fftcb12JA  auth-domain="iconica-sbadge.firebaseapp.com" database-U-R-L="https://iconica-sbadge.firebaseio.com" project-id="iconica-sbadge" storage-bucket="iconica-sbadge.appspot.com" messaging-sender-id="319820458930"></ico-app>

        <ico-query id="newsitems" path="newsitems/items" data="{{newsitems}}"></ico-query>
       <ico-auth id="auth" user="{{user}}"></ico-auth>

`;

export class BadgeApp extends GestureEventListeners(PolymerElement) {
    static get template(){ return template; }
    
    static get properties(){ return {
        emailaddress: { type:String },
        registration: { type:Object, value:{}},
        items: { type:Array},
        selectedItems: { type:Array},
        selpage: { type:Number, value:1, observer:'_resetForm'},
        filter: { type:String, value:''},
    }}

    _search() {
        var title = this.selpage == 1 ? "Zoeken naar deelnemers" : "Zoeken naar sessies";
        this.$.seachprompt.open(title, "Geef hieronder de term of een deel van de term waar u naar op zoek bent, in het onderstaande invulveld op.", "zoeken naar", this.filter);
    }

    _hasSelectedItems(){
        return this.selectedItems.length > 0;
    }

    _printBadge(e){
        console.log("printing badge", e);
        this.selpage = 2;
        

    }
    _resetForm(){
        if (this.selpage == 0) {
            this.$.registration._cancel();
        }
    }

    _clearAll(){
        this.selectedItems = [];
    }
    _selectAll(){
        this.selectedItems = this.items.slice();
    }
    _printBadgeDone(e){
        this.selpage = 1;
        if (e.detail.completed)
            this.set('selectedItems',[]);
    }

    _setFilter(e) {
        if (this.selpage == 1)
            this.filter = e.detail.value;
        else
            this.sessiefilter = e.detail.value;
    }

   _filter(){
       this.onlyMe = !this.onlyMe;
   }


   badgescanned(e){
        console.log('badge scanned:', e.detail );
        let found = this.items.find((item) => item.username == e.detail);
        if (!found)
            this.$.nomatchDialog.open();
        else
            this.moreinfo({detail:{item:found}});
    }


    _getImage(Photo, CompanyLogo){
        if (CompanyLogo != "n/a" && CompanyLogo.length > 0) return CompanyLogo;
        if (Photo != "n/a" && Photo.length > 0) return Photo;
        return "/images/nophoto.jpg";
    }

    connectedCallback(){
        super.connectedCallback();

        if ("registrationcount" in localStorage)    
            this.registrationcount =  parseInt(localStorage["registrationcount"]);
        
        if (!("registrations" in localStorage)){
            firebase.database().ref("registrations").once("value", (s) => {
                let val = s.val(); 
                if (val)
                    localStorage["registrations"] = JSON.stringify(Object.values(val));
            });
        }

        if (!("onsite_registrations" in localStorage)){
            firebase.database().ref("onsite_registrations").once("value", (s) => {
                let val = s.val(); 
                if (val)
                    localStorage["onsite_registrations"] = JSON.stringify(Object.values(val));
            });
        }
        this.items = [
            ...(localStorage["onsite_registrations"] ? JSON.parse(localStorage["onsite_registrations"]) : []),
            ...(localStorage["registrations"] ? JSON.parse(localStorage["registrations"]) : [])];
        
       
        setInterval(() => {
            // check to see if there are changes...
            this._syncData(); 
        }, 5000);
    }

    _syncData(){
        firebase.database().ref("registrationcount").once('value', (snapshot)=>{
            let val = snapshot.val();
            if (val){
                var count = parseInt(val); 
                // if the counter has increased.... we have new data...
                if (this.registrationcount != count) {
                    // grab new data
                    firebase.database().ref("onsite_registrations").once('value', (snapshot)=>{
                        console.log("snapshot taken, store it in localstorage");
                        localStorage["onsite_registrations"] = JSON.stringify(Object.values(snapshot.val())); 
                        this.items = [
                            ...(localStorage["onsite_registrations"] ? JSON.parse(localStorage["onsite_registrations"]) : []),
                            ...(localStorage["registrations"] ? JSON.parse(localStorage["registrations"]) : [])];
            
                    });  
                    this.registrationcount = count;
                    localStorage["registrationcount"] = count;
                }
            }
        });
    }


    nextPage(){
        this.$.auth.signInAnonymously();
    }

    _hasToolbar(){
        return window.outerHeight < (screen.height-24);
    }

    _saveRegistration(e){
        this.$.registration.hidefab(); 
       // console.log('registration complete', e);
        e.detail.id = this.registrationcount + 1 ;
        //"2018-02-19 15:14:06"

        let date = new Date();
        e.detail.ApplicationDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,0) + "-" + date.getDate().toString().padStart(2,0) + " " + date.getHours().toString().padStart(2,0) + ":" + date.getMinutes().toString().padStart(2,0) + ":" + date.getSeconds().toString().padStart(2,0);
        e.detail.Username = e.detail.FirstName.trim() + " " + e.detail.LastName.trim();
        e.detail.Created = Date.now();
        if (!e.detail.akkoord) e.detail.akkoord = false;
        firebase.database().ref("registrationcount").set(e.detail.id);
        firebase.database().ref("onsite_registrations").push(e.detail).then(() => {
            this.selpage = 1;
            this._syncData(); 
        });
    }

}

customElements.define('badge-app', BadgeApp);