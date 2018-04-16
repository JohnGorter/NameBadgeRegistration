// @ts-check

import '/node_modules/@polymer/polymer/polymer-legacy.js'
import { PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js'
import '/node_modules/@polymer/paper-input/paper-input.js'

const template = `
        <style>
        :root {
            --paper-listbox-background-color:white;
            --paper-input-container-underline: {
              border:1px solid red;
            };
        }
        badge-buttongroup paper-button { margin-bottom:10px;}

        paper-button {
            background-color:#ddd;
            color:var(--tint-color);
            }
        paper-button[small] {
            width: 80px;
            height: 30px;
            font-size: 2vw;
        }
        paper-button.iron-selected {
        transform:translateX(-1px) translateY(-1px);
        background-color:var(--tint-color);
        color:white;
        box-shadow:5px 5px 5px #555;
        }
        .page { width:90vw;height:75vh;background-color:white;padding-left:40px;padding-right:0px;padding-top:30px;}
        paper-input { margin-left:20px;width:40vw;}
        paper-dropdown-menu { margin-left:20px;}
        paper-input[wide] { width:70vw;}
        paper-input[lessimportant] { 
            --paper-input-container-underline: {
                border:1px solid var(--tint-color);
              };
        }
        :root { --paper-input-container-color:#bbb;
            --paper-input-container-label: {
                font-size:3vw;
            }; }
        ico-wizard > div { overflow:scroll}
        p { font-size:3vw;}
        .strong { margin-left:20px;font-family:sans-serif;font-weight:bold;font-size:3vw}
        hr { border:0.5px solid silver;margin-top:25px;}
        paper-fab { background-color:var(--tint-color);position:fixed;right:20px;bottom:50px;}
        paper-fab[hidden] { display:none;}
        </style>

    <ico-wizard id="wizard" progressballs showfinish step="{{step}}">
        

        <div step0>
            <p class="strong">In drie stappen je netwerk verbreden.</p>
            <hr>
            <paper-input value="{{registration.FirstName}}" label="Je voornaam"></paper-input>
            <paper-input value="{{registration.LastName}}" label="Je achternaam"></paper-input>
            <paper-input value="{{registration.Email}}" label="Email address"></paper-input>
            <hr>
            <p>Ik ben een</p>
            <badge-buttongroup selected="{{registration.registrationType}}">
                <paper-button small >Ondernemer</paper-button>   
                <paper-button small >Student</paper-button>   
                <paper-button small >Bezoeker</paper-button>
            <badge-buttongroup> 
            <template is="dom-if" if="[[showError]]">
                 <span style="color:red;font-family:sans-serif;font-size:10px;">Kies een van de bovenstaande opties</span>
            </template>  
        </div>
        <div step1>
            <iron-pages selected="{{registration.registrationType}}">
                <div>
                    <p class="strong">Vertel ons meer over je business!</p>
                    <hr>
                    <paper-input value="{{registration.Company}}" label="Wat is de naam van je bedrijf?" ></paper-input>
                    <paper-dropdown-menu  allow-outside-scroll label="Actief in de sector:" value="{{registration.Sectors}}">
                        <paper-listbox slot="dropdown-content" selected="1">
                        <paper-item>Agriculture</paper-item>
                        <paper-item>Big data</paper-item>
                        <paper-item>Business Products</paper-item>
                        <paper-item>Business Services</paper-item>
                        <paper-item>Bio technology</paper-item>
                        <paper-item>Chemical</paper-item>
                        <paper-item>Consulting</paper-item>
                        <paper-item>Clean technology</paper-item>
                        <paper-item>Consumer Products</paper-item>
                        <paper-item>E-commerce</paper-item>
                        <paper-item>E-learning</paper-item>
                        <paper-item>Energy</paper-item>
                        <paper-item>Education & E-learning</paper-item>
                        <paper-item>Electronics</paper-item>
                        <paper-item>Entertainment</paper-item>
                        <paper-item>Financial Technology</paper-item>
                        <paper-item>Gaming</paper-item>
                        <paper-item>Health care & Medical</paper-item>
                        <paper-item>Life Sciences</paper-item>
                        <paper-item>Lifestyle</paper-item>
                        <paper-item>Logistics & Transport</paper-item>
                        <paper-item>Nano technology</paper-item>
                        <paper-item>Marketing & E-commerce</paper-item>
                        <paper-item>Mobile & Apps</paper-item>
                        <paper-item>Semi conductors</paper-item>
                        <paper-item>Social media</paper-item>
                        <paper-item>Smart Cities</paper-item>
                        <paper-item>Sports</paper-item>
                        <paper-item>Telecommunicaties</paper-item>
                        <paper-item>Travel & Tourism</paper-item>
                        <paper-item>Other</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    <paper-input  wide value="{{registration.Omschrijving}}" label="Met welke trefwoorden kan je je bedrijf omschrijven?"></paper-input>
                    <paper-input wide lessimportant value="{{registration.FoundingYear}}" label="In welk jaar is je bedrijf opgericht?"></paper-input>
                    <paper-input wide lessimportant value="{{registration.BusinessModel}}" label="Wat is je businessmodel?"></paper-input>
                    <paper-input wide lessimportant value="{{registration.WerknemersAantal}}" label="Hoeveel mensen werken in je bedrijf?"></paper-input>
                    <div style="font-size:3vw;margin-left:20px;margin-top:30px;margin-bottom:20px;">Ik zou graag in contact komen met mensen die me toegang kunnen bieden tot:</div>
                    <div style="margin-left:20px;">
                        <badge-buttongroup multi selecteds="{{ConnectTags}}">
                            <paper-button small>Talent</paper-button>   
                            <paper-button small>Capital</paper-button>   
                            <paper-button small>Support</paper-button>
                            <paper-button small>Network</paper-button>
                            <paper-button small>Knowledge</paper-button>
                            <paper-button small>Markets</paper-button>
                        <badge-buttongroup> 
                    </div>  
                    <paper-input wide lessimportant value="{{registration.Interests}}" label="Ik ga deelnemen aan?"></paper-input>
                    <hr>
                </div>
                <div>
                    <p class="strong">Wat leuk, je komt ons bezoeken als student!</p>
                    <hr>
                    <paper-input wide value="{{registration.Onderwijsinstelling}}" label="Aan welke onderwijsinstelling studeer je?" ></paper-input>
                    <paper-input wide style="margin-top: 10px;" value="{{registration.Motivatie}}" label="Waarom neem je deel aan dit evenement?"></paper-input>
                    <hr>
                </div>
                <div>
                    <p class="strong">We helpen je graag met het leggen van verbindingen</p>
                    <hr>
                    <paper-input value="{{registration.Company}}" label="Wat is de naam van je bedrijf?" ></paper-input>
                    <paper-input  wide value="{{registration.Omschrijving}}" label="Met welke trefwoorden kan je je bedrijf omschrijven?"></paper-input>
                    <paper-input value="{{registration.Functie}}" label="Wat is uw functie binnen het bedrijf?" ></paper-input>
                    <paper-dropdown-menu allow-outside-scroll label="Actief in de sector:" value="{{registration.Sector}}">
                        <paper-listbox slot="dropdown-content" selected="1">
                        <paper-item>Agriculture</paper-item>
                        <paper-item>Big data</paper-item>
                        <paper-item>Business Products</paper-item>
                        <paper-item>Business Services</paper-item>
                        <paper-item>Bio technology</paper-item>
                        <paper-item>Chemical</paper-item>
                        <paper-item>Consulting</paper-item>
                        <paper-item>Clean technology</paper-item>
                        <paper-item>Consumer Products</paper-item>
                        <paper-item>E-commerce</paper-item>
                        <paper-item>E-learning</paper-item>
                        <paper-item>Energy</paper-item>
                        <paper-item>Education & E-learning</paper-item>
                        <paper-item>Electronics</paper-item>
                        <paper-item>Entertainment</paper-item>
                        <paper-item>Financial Technology</paper-item>
                        <paper-item>Gaming</paper-item>
                        <paper-item>Health care & Medical</paper-item>
                        <paper-item>Life Sciences</paper-item>
                        <paper-item>Lifestyle</paper-item>
                        <paper-item>Logistics & Transport</paper-item>
                        <paper-item>Nano technology</paper-item>
                        <paper-item>Marketing & E-commerce</paper-item>
                        <paper-item>Mobile & Apps</paper-item>
                        <paper-item>Semi conductors</paper-item>
                        <paper-item>Social media</paper-item>
                        <paper-item>Smart Cities</paper-item>
                        <paper-item>Sports</paper-item>
                        <paper-item>Telecommunicaties</paper-item>
                        <paper-item>Travel & Tourism</paper-item>
                        <paper-item>Other</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    <paper-input wide lessimportant style="margin-top:10px;" value="{{registration.Activiteiten}}" label="Korte omschrijving van jouw organisatie en/of activiteiten"></paper-input>
                    <paper-input wide style="margin-top:10px;" value="{{registration.Samenwerking}}" label="Waar zoek jij samenwerkingen?"></paper-input>
                    <hr>
                </div>
            </iron-pages>
        </div>
        <div step3 on-open="_setFinish">
            <div style="flex-flow:column;display:flex;margin-right:40px;align-items:center;justify-content:center">
                <p class="strong">Voorwaarden</p>
                <p>Ik ga akkoord met het verstrekken van mijn telefoonnummer en email adres ten behoeve van het leggen van nieuwe contacten middels de SmartBadge(c) app. Deze gegevens worden uitstluitend gebruikt ter informatie voor overige deelnemers om in contact te komen met dit profiel.</p>

                <div style="margin-top:50px">
                    <p>Akkoord: <paper-checkbox checked="{{registration.akkoord}}" label="akkoord">
                    </paper-checkbox></p>
                </div>

                <div style="margin-top:50px">
                    <paper-button on-tap="_cancel">Annuleer registratie</paper-button>
                </div>
            </div>
        </div>
        <div step2>
            <div style="flex-flow:column;display:flex;align-items:center;justify-content:center">
                <input type="file" id="picButton" on-change="_drawPhoto" hidden accept="image/*">
                <paper-button on-tap="_takePic" style="margin-bottom:30px;margin-right:40px;">Maak foto</paper-button>
                <canvas id="canvas" width="300" height="300" style="margin-right:40px"></canvas>
            </div>
        </div>
</ico-wizard>

<paper-fab id="fab" on-tap="_nextPage" icon="[[icon]]"></paper-fab>
<span id="backbutton" style="bottom:70px;left:20px;position:fixed;font-family:sans-serif;font-size:10px;color:#888" on-tap="_previousPage"><iron-icon icon="arrow-back"></iron-icon> Terug</span>
`;

export class BadgeRegistration extends PolymerElement {
    static get template(){ return template;}
    static get properties() { return { 
        step:{type:Number, notify:true},
        icon: {type:String, value:"arrow-forward"},
        registration:{type:Object, value:{ registrationType:-1 }, notify:true, readOnly:false},
        nextstep:{ type:String, value:"Start", notify:true}
    }}
    
    _setFinish() {
        this.icon = "send";
        this.completed = true;
        this.showError = false;
    }

    _cancel(){
        this.$.backbutton.hidden = true;
        this.$.wizard.reset();
        this.$.fab.hidden = false;
        this.icon = "arrow-forward";
        this.completed = false;
        this.showError = false;
        this._clearPhoto();
        this.registration = { registrationType:-1 };
    }
    _previousPage(){
        this.completed = false;
        this.icon = "arrow-forward";
        this.$.wizard.previousPage();
    }
    _nextPage(){
        this.$.backbutton.hidden = false;
        if (!this.completed){
            if (this.registration.registrationType > -1) {
                this.$.wizard.nextPage();
            } else {
                this.showError = true;
            }
        }
        else {
            let connecttags = [];
            if (this.ConnectTags) {
                for (var t of this.ConnectTags){
                    connecttags.push(t.innerText);
                }
                this.registration.Connect = connecttags.join(",");
            }

            let tagnames = [];
            if (this.Tags){
                for (var t of this.Tags){
                    tagnames.push(t.innerText);
                }
                this.registration.Activiteiten = tagnames;
            }

            this.dispatchEvent(new CustomEvent("registration-completed", {detail:JSON.parse(JSON.stringify(this.registration)), composed:true, bubbles:true}));
        }
    }
    _takePic(){
        this.$.picButton.click();
    }

    _clearPhoto() {
        var context = this.$.canvas.getContext("2d");
        context.clearRect(0, 0, this.$.canvas.width, this.$.canvas.height);
    }
    _drawPhoto(e){
        var fr = new FileReader(); 
        fr.onload = (c) =>{
            var im = new Image(); 
            im.onload = () => {
                this.$.canvas.getContext("2d").drawImage(im, 0, 0, im.width, im.height, 0, 0, 300, 300);
                this.registration.Photo = this.$.canvas.toDataURL();
            }
            im.src = c.target.result;
        };
        fr.readAsDataURL(e.target.files[0]);

    }

    hidefab(){
        this.$.fab.hidden = true;
    }
    
    

   
}

customElements.define('badge-registration', BadgeRegistration);

