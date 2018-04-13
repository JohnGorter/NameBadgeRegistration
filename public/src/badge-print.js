import '/node_modules/@polymer/polymer/polymer-legacy.js';
import { PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js';

const html = String.raw;
const htmlTemplate = html`
    <style>
        .badgecontainer { display:flex;flex-flow:column;justify-content:flex-start;align-items:center;position:absolute;top:0px;left:0px;background-color:white;flex:1;width:100vw;height:100vh;}
        .container { display:flex;flex-wrap:wrap;margin-top:64px;height:75vh;width:100vw;overflow-y:scroll;}
    </style>
    <div class="badgecontainer">
        <div class="container" id="badgecontainer">
            <template is="dom-repeat" items="[[items]]">
                <barcode-target item="[[item]]"></barcode-target>
            </template>
        </div>
        <div class="buttons" style="margin-top:10px;width:100vw;display:flex;justify-content:flex-end;position:relative;border-top:1px solid #d8d5d5;background-color: white;">
            <span on-tap="_printbadge" style="user-select: none;margin:10px;margin-right:20px;color:var(--tint-color)" dialog-confirm>Print badge</span>
            <span style="user-select: none;margin:10px;color:var(--tint-color)" on-tap="_cancel">Sluiten</span>
        </div>
    </div>
`;

export class BarcodeTarget extends PolymerElement {
    static get template(){
        return `
        <style>
             .name { font-size:30px;margin-top:30px;}
            .details { padding-top: 14px;
                font-size: 15px;
                font-family: sans-serif;
                color: #402c57;
                position: absolute;
                top: 50px;
                height: 155px;
                background-color: white;
                left: 40px;
                padding-left: 10px;
                width: 280px;}
            .details_back { padding-top: 14px;
                    font-size: 15px;
                    font-family: sans-serif;
                    color: #402c57;
                    position: absolute;
                    top: 10px;
                    height: 180px;
                    background-color: white;
                    left: 40px;
                    padding-left: 10px;
                    width: 280px;}
            .strong { font-weight:bold}
            .banner { background-color:#402c57;position:absolute;width:100%;height:50px;}
            .badge { -webkit-print-color-adjust: exact;border:0.5px solid black;position:relative;margin:5px;width:360px;height:220px; background-size:cover;background-image:url('./images/bg.svg')}
            #barcode img {display: block;right: 32px;top:25px;height:80px;width:80px;background-color: white;padding: 8px;position: absolute;}
            .header { position:absolute;width:280px;display:flex;justify-content:space-between;margin-right:10px;}
            .row { position:relative;display:flex;justify-content:space-between;}
            .dotted { position: relative;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                margin-top: 25px;
                padding: 10px;}
            iron-icon { height:20px;width:20px;}
            .row { height:30px;display:flex;align-items:center;line-height:30px;}
            .row div { height:16px}
        </style>
        <div style="display:flex;">
            <div class="badge" id="badge">
                    <div class="banner"></div>
                    <div class="details">
                        <div class="strong">Start met verbinden:</div>
                        <div>sbadge.nl/download</div>
                        <div class="name">[[item.Username]]</div>
                        <div class="strong">[[item.Company]]</div>
                    </div>
                    <div id="barcode"></div>
            </div>
            <div class="badge" id="badge_back">
                    <div class="details_back">
                        <div class="header"><div>www.iconica.nl</div><div style="padding-right:10px;">www.sbadge.nl</div></div>
                        <div class="dotted">
                            <div class="row"><iron-icon icon="social:person"></iron-icon><div style="margin-left:10px;flex:1;border-bottom:1px dotted black"></div></div>
                            <div class="row"><iron-icon icon="communication:phone"></iron-icon><div style="margin-left:10px;flex:1;border-bottom:1px dotted black"></div></div>
                            <div class="row"><iron-icon icon="mail"></iron-icon><div style="margin-left:10px;flex:1;border-bottom:1px dotted black"></div></div>
                            <div class="row"><iron-icon icon="communication:location-on"></iron-icon><div style="margin-left:10px;flex:1;border-bottom:1px dotted black"></div></div>
                        </div>
                    </div>
            </div>
        </div>
        `
    }
    toHTML(){
        return this.shadowRoot.innerHTML;
    }
    connectedCallback(){
        super.connectedCallback(); 
        // while (this.$.barcode.firstChild) this.$.barcode.removeChild(this.$.barcode.firstChild);
        var qrcode = new QRCode(this.$.barcode, {
            width : 100,
            height : 100
        });
        qrcode.makeCode(this.item.Username);
    }
}

export class BadgePrint extends PolymerElement {
    static get template() { return htmlTemplate;}
    static get properties() {}

    connectedCallback(){
        super.connectedCallback();
    }

     _cancel(){
        this.dispatchEvent(new CustomEvent("print-badge-done", { detail:{ completed:false}, composed:true, bubbles:true}));
     }

     _printbadge(){
         var printwindow = window.open("", "", "location=0,status=0,scrollbars=0,left=200,top=100,width=650,height=600");
         let stringinnerhtml = `
         <!DOCTYPE html><html><head>
         <script type='module' src='/src/badge-app.js'></script>
         <style type="text/css" media="print">
            div.badge
            {
                page-break-after: always;
                page-break-inside: avoid;
            }
        </style>
         <style>
         .name { font-size:30px;margin-top:30px;}
        .details { padding-top: 14px;
            font-size: 15px;
            font-family: sans-serif;
            color: #402c57;
            position: absolute;
            top: 50px;
            height: 155px;
            background-color: white;
            left: 40px;
            padding-left: 10px;
            width: 280px;}
        .details_back { padding-top: 14px;
                font-size: 15px;
                font-family: sans-serif;
                color: #402c57;
                position: absolute;
                top: 10px;
                height: 180px;
                background-color: white;
                left: 40px;
                padding-left: 10px;
                width: 280px;}
        .strong { font-weight:bold}
        .banner { background-color:#402c57;position:absolute;width:100%;height:50px;}
        .badge { -webkit-print-color-adjust: exact;border:0.5px solid black;position:relative;margin:5px;width:360px;height:220px; background-size:cover;background-image:url('./images/bg.svg')}
        
        #barcode img {display: block;right: 32px;top:25px;height:80px;width:80px;background-color: white;padding: 8px;position: absolute;}
        .header { position:absolute;width:280px;display:flex;justify-content:space-between;margin-right:10px;}
        .row { position:relative;display:flex;justify-content:space-between;}
        .dotted { position: relative;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            margin-top: 25px;
            padding: 10px;}
        iron-icon { height:20px;width:20px;}
        .row { height:30px;display:flex;align-items:center;line-height:30px;}
        .row div { height:16px }
    </style></head><body style="-webkit-print-color-adjust:exact;"><div style='display:flex;flex-wrap:wrap'>`;

         var barcodes = this.shadowRoot.querySelectorAll("barcode-target");
         barcodes.forEach(b => {
            stringinnerhtml += b.toHTML();
         });
         stringinnerhtml += "</div></body></html>";
         printwindow.document.body.innerHTML = stringinnerhtml;
         printwindow.print();
        printwindow.close();
         this.dispatchEvent(new CustomEvent("print-badge-done", { detail: {completed:true}, composed:true, bubbles:true}));
    }

}

customElements.define('barcode-target', BarcodeTarget);
customElements.define('badge-print', BadgePrint);