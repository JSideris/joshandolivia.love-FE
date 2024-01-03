"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_rsvp-stuff_c"],{

/***/ "./src/home/rsvp-stuff/clickable-input.ts":
/*!************************************************!*\
  !*** ./src/home/rsvp-stuff/clickable-input.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class ClickableInput extends dothtml_1.DotComponent {
    constructor() {
        super(...arguments);
        this.props = {
            showInput: false,
            value: ""
        };
        this.events = {
            save: (value) => { }
        };
        this.isLocked = false;
    }
    onClick() {
        console.log(this.isLocked);
        if (this.isLocked)
            return;
        this.props.showInput = true;
        this.$refs.input.value = this.props.value || "";
        this.$refs.input.focus();
    }
    onKeyDown(e) {
        // TODO: cancel if escape. 
        // Save if enter.
        if (e.code == "Enter") {
            this.saveAndClose();
        }
        else if (e.code == "Escape") {
            this.cancel();
        }
    }
    saveAndClose() {
        if (this.props.showInput) {
            this.props.showInput = false;
            this.props.value = this.$refs.input.value;
            this.events.save(this.props.value);
        }
    }
    cancel() {
        this.props.showInput = false;
    }
    builder(defaultValue, isLocked) {
        this.props.value = defaultValue;
        this.isLocked = isLocked;
        console.log("LOCKED?", isLocked);
        return dothtml_1.dot.div(dothtml_1.dot.input()
            .class({
            "input": true,
            hidden: () => !this.props.showInput
        })
            .onKeyDown((e) => this.onKeyDown(e))
            .onBlur(() => this.saveAndClose())
            .ref("input") // ref doesn't work!
            .div(() => this.props.value).class({
            "clickable-label": true,
            hidden: () => this.props.showInput
        }).onClick(() => this.onClick())).class("container");
    }
    style(css) {
        css(".container")
            .padding(10);
        css(".input")
            .height(16)
            .display("block")
            .widthP(100)
            .backgroundColor(0, 0, 0, 0.5)
            .cursor("pointer")
            .color("white")
            .padding(4);
        css(".clickable-label")
            .height(16)
            // .widthP(100)
            .backgroundColor(0, 0, 0, 0.5)
            .cursor("pointer")
            .color("white")
            .padding(4);
        css(".hidden")
            .display("none");
    }
}
exports["default"] = ClickableInput;


/***/ }),

/***/ "./src/home/rsvp-stuff/confirmation-pane.ts":
/*!**************************************************!*\
  !*** ./src/home/rsvp-stuff/confirmation-pane.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_section_1 = __importDefault(__webpack_require__(/*! ../page-section */ "./src/home/page-section.ts"));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const rsvp_options_1 = __importDefault(__webpack_require__(/*! ./rsvp-options */ "./src/home/rsvp-stuff/rsvp-options.ts"));
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
const invite_template_1 = __importDefault(__webpack_require__(/*! ./invite-template */ "./src/home/rsvp-stuff/invite-template.ts"));
let isLocked = window.location.search.indexOf("ADMIN=true") == -1;
class ConfirmationPane extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            loadingMessage: null,
            guest: null,
            err: null,
            lang: "en",
            eventDetailsHtml: ""
        };
        this.plus1s = [];
    }
    getStr(str, args) {
        return () => {
            let final = language_1.default[str][this.props.lang];
            if (args) {
                for (let i = 0; i < args.length; i++) {
                    final = final.split(`{${i}}`).join(args[i]);
                }
            }
            return final;
        };
    }
    getRawStr(str, args) {
        let final = language_1.default[str][this.props.lang];
        if (args) {
            for (let i = 0; i < args.length; i++) {
                final = final.split(`{${i}}`).join(args[i]);
            }
        }
        return final;
    }
    ready() {
        this.fetchGuest();
    }
    changeLang(lang) {
        dothtml_1.dot.bus.emit("language", lang);
        this.props.lang = lang;
        localStorage.setItem("lang", lang);
        this.$updateStyles();
        this.reloadEventDetailsHtml();
    }
    async showModal(message, buttons) {
        let removing = false;
        return new Promise((resolve) => {
            (0, dothtml_1.dot)(document.body).div(dothtml_1.dot.div(dothtml_1.dot.span(message)
                .br()
                .br()
                .each(buttons, b => {
                return dothtml_1.dot.button(b.caption).style(dothtml_1.dot.css.padding(10).fontSize(30).backgroundColor("gold").cursor("pointer").margin(20)).onClick(() => {
                    if (removing)
                        return;
                    removing = true;
                    // dot("#modal").style(dot.css.opacity(0));
                    document.getElementById("modal").style.opacity = "0";
                    setTimeout(() => {
                        document.body.removeChild(document.getElementById("modal"));
                        resolve(b.value);
                    }, 600);
                });
            }))
                .style(dothtml_1.dot.css
                .position("absolute")
                .color("white")
                .leftP(50)
                .topP(50)
                .margin("auto")
                .transform(t => t.translateXP(-50).translateYP(-50))
                .minWidth(300)
                .maxWidth(800)
                .minHeight(200)
                .padding(50)
                .paddingTop(100)
                .fontSize(24)
                .backgroundColor(30, 30, 30, 0.8)
                .borderRadius(80)
                .textAlign("center")
                .verticalAlign("middle")
                .border("5px solid gold"))).style(dothtml_1.dot.css
                .position("fixed")
                .top(0)
                .left(0)
                .right(0)
                .bottom(0)
                .zIndex(1000)
                .backdropFilter(f => f.blur(5).brightness(50).sepia(100))
                .opacity(1)
                .border("50px solid black")
                .transition("opacity 0.5s ease")).id("modal");
        });
    }
    async fetchGuest() {
        let guestId = "";
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramValue = urlParams.get("invite");
        if (paramValue) {
            guestId = paramValue.split("_")[0];
        }
        else {
            let hash = window.location.hash;
            guestId = hash.split("_")[1];
        }
        if (!guestId || guestId.length == 0) {
            this.props.err = "Invalid guestId.";
            return;
        }
        this.props.loadingMessage = language_1.default.loadingGuestMsg[this.props.lang];
        {
            let userLang = navigator.language || navigator["userLanguage"];
            userLang = (userLang || "").split('-')[0];
            if (userLang != "el" && userLang != "fr")
                userLang = "en";
            this.props.lang = userLang;
            localStorage.setItem("lang", this.props.lang);
        }
        try {
            let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-invite-details?guestId=${guestId}`);
            let jsonData = await result.json();
            this.plus1s = JSON.parse(jsonData.Plus1Data) ?? [];
            if (!isLocked && jsonData.RsvpStatus != "CONFIRMED") {
                // If it's the first load, set the language to whatever the invite says. This is a special feature for certain guests.
                if (jsonData.Lang == "el") {
                    this.props.lang = jsonData.Lang;
                    localStorage.setItem("lang", jsonData.Lang);
                }
                // Set default RSVP!
                let rsvp = "DECLINED";
                if (paramValue || window.location.hash.indexOf("#invite_") == 0) {
                    rsvp = await this.showModal(this.getStr("inviteModalQuestion")(), [
                        { caption: this.getStr("yesNoBtnYes")(), value: "CONFIRMED" },
                        { caption: this.getStr("yesNoBtnNo")(), value: "DECLINED" },
                    ]);
                }
                else {
                    rsvp = window.location.hash.indexOf("#confirm_") == 0 ? "CONFIRMED" : "DECLINED";
                }
                jsonData.RsvpStatus = rsvp;
                for (let i = 0; i < this.plus1s.length; i++) {
                    this.plus1s[i].RsvpStatus = rsvp;
                }
                await this.saveGuest(jsonData);
                this.showModal(this.getStr("rsvpConfirmation")(), [{ caption: "OK", value: "ok" }]);
            }
            this.props.loadingMessage = "";
            this.props.guest = jsonData;
            this.$updateStyles();
            this.reloadEventDetailsHtml();
            return jsonData;
        }
        catch (e) {
            console.error(e);
            this.props.loadingMessage = language_1.default.fetchGuestError[this.props.lang];
        }
    }
    async saveGuest(jsonData = this.props.guest) {
        this.props.loadingMessage = language_1.default.savingRsvpMsg[this.props.lang];
        jsonData.Plus1Data = JSON.stringify(this.plus1s.map(x => x));
        let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
            method: "POST",
            body: JSON.stringify(jsonData)
        });
        this.props.loadingMessage = "";
    }
    async savePlusOne(data) {
        // for(let i = 0; i < this.plus1s.length; i++){
        // 	let p1 = this.plus1s[i];
        // 	if(p1.Id == data.Id && p1.FullName == data.FullName){
        // 		console.log(p1);
        // 		break;
        // 	}
        // }
        // this.reloadEventDetailsHtml();
        await this.saveGuest();
    }
    reloadEventDetailsHtml() {
        this.props.eventDetailsHtml = invite_template_1.default
            .replace("{invitationDetailsGuestName}", this.getStr("invitationDetailsGuestName", [this.props.guest.FullName])())
            .replace("{invitationDetailsAmpersand}", this.getStr("invitationDetailsAmpersand")())
            .replace("{invitationDetailsGroomNamePrefix}", this.getStr("invitationDetailsGroomNamePrefix")())
            .replace("{invitationDetailsBrideNamePrefix}", this.getStr("invitationDetailsBrideNamePrefix")())
            .replace("{invitationDetailsMessage}", this.getStr("invitationDetailsMessage")())
            .replace("{weddingDate}", this.getStr("weddingDate")());
    }
    builder() {
        return super.builder(
        // dot.h1(this.getStr("reservationDetailsHeader"))
        dothtml_1.dot.div(dothtml_1.dot.when(() => {
            let g = this.props.guest;
            let e = this.props.err;
            return !!(g || e);
        }, () => {
            if (this.props.err) {
                return dothtml_1.dot.p(this.getStr("fetchGuestError"));
            }
            else {
                // return dot.h2(this.getStr("eventInformationHeader"))
                return dothtml_1.dot.div(dothtml_1.dot.div(() => this.props.eventDetailsHtml).class("invite-details")
                    .div(dothtml_1.dot.img().class("love-photo").src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/rsvp-love-img.jpg").width(400)).class("love-photo-container")).class("invite-section")
                    .h2("Locked In")
                    .div("Our special day is coming up in a matter of days, and reservations are now locked in. For last-minute status changes, contact the bride or groom.")
                    .h2(this.getStr("rsvpHeader"))
                    .div(dothtml_1.dot.h(() => {
                    let options = new rsvp_options_1.default(this.props.guest, isLocked);
                    options.on("update", (guest) => {
                        this.saveGuest(guest);
                    });
                    return options;
                })
                    .div(dothtml_1.dot.h2(this.getStr("yourPlusOnesHeader"))
                    .div(dothtml_1.dot.when(!this.plus1s?.length, () => dothtml_1.dot.p(this.getStr("noPlusOnesMessage")))))
                    .each(this.plus1s, d => {
                    let options = new rsvp_options_1.default(d, isLocked);
                    options.on("update", (guest) => {
                        this.savePlusOne(guest);
                    });
                    return options;
                }))
                    .h2(this.getStr("weddingFeastMenuHeader"))
                    .p(this.getStr("celebrationOfLoveFlavor"))
                    .div(dothtml_1.dot.ol(dothtml_1.dot.li(this.getStr("appetizersTeasePalate"))
                    .li(this.getStr("butternutSquashSoup"))
                    .li(this.getStr("mushroomPestoRigatoni"))
                    .li(this.getStr("chooseYourMain"))
                    .ul(dothtml_1.dot.li(this.getStr("veggieFiloTurnover"))
                    .li(this.getStr("vegetableTikkaSkewer"))
                    .li(this.getStr("veganRiceStuffedPeppers")))
                    .li(this.getStr("iceCreamCrepe")))).class("ol-container").br()
                    .div(dothtml_1.dot.div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/turnover.png"))
                    .div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/skewers.png"))
                    .div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/peppers.png"))).class("food-images").br()
                    .h2(this.getStr("giftsHeader"))
                    .p(this.getStr("giftsMessage"))
                    .h2(this.getStr("locationHeader"))
                    .div(dothtml_1.dot.div(dothtml_1.dot.p(this.getStr("ceremonyReceptionLocation")().replace("Fantasy Farm", `<a href="https://fantasyfarm.ca" target="_blank">Fantasy Farm</a>`).replace("Ballroom", "<b>Ballroom</b>"))).class("ceremony-location")
                    .br()
                    .a(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/map.png")).class("map-a").hRef("https://goo.gl/maps/fDuH6GWWtvymuGDK7").target("_blank"));
            }
        })
            .otherwise(() => {
            return dothtml_1.dot.p(() => this.props.loadingMessage);
        })));
    }
    style(css) {
        super.style(css);
        css("li")
            .marginBottom(8)
            .color("#EEE");
        // .fontWeight("bold")
        css(".invite-section")
            .display("flex")
            .gap(20)
            .position("relative")
            .alignItems("center")
            .flexWrap("wrap")
            .textAlign("center");
        css(".love-photo")
            .borderRadiusP(50)
            .border("3px solid #AA8730")
            .boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)")
            .transition("transform 0.3s ease, opacity 0.3s ease")
            .filter(f => f
            .brightness(150)
        // .contrast(120)
        // .sepia(20)
        );
        css(".love-photo-container")
            .flexGrow(1);
        css(".invite-details")
            .flexGrow(3)
            .backgroundColor("rgba(0,0,0,0.7)")
            .paddingTop(20)
            .paddingBottom(20)
            .borderRadius(20);
        css(".ceremony-location")
            .backgroundColor(70, 55, 0, 0.7)
            .borderRadius(8)
            .padding(8)
            .color(238, 187, 51);
        css("a")
            .color(238, 187, 51)
            .textDecoration("underline dotted");
        css(".map-a")
            .display("block")
            .widthP(100)
            .textAlign("center");
        css(".map-a img")
            .widthP(100)
            .maxWidth(800)
            .borderRadiusP(25)
            .border("3px solid white")
            .boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)")
            .filter(f => f
            // .contrast(150)
            .brightness(90)
            // .hueRotate("90deg" as any)
            // .grayscale(40)
            .sepia(100));
        css(".food-images")
            .gap(5)
            .display("flex")
            .justifyContent("space-evenly")
            .flexWrap("wrap");
        css(".food-images div")
            .textAlign("center")
            .flexGrow(1);
        css(".food-images img")
            .width(250)
            .height(250)
            .borderRadiusP(50)
            .border("3px solid #AA8220")
            .borderColor(238, 187, 51)
            .boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)");
    }
}
exports["default"] = ConfirmationPane;


/***/ }),

/***/ "./src/home/rsvp-stuff/invite-template.ts":
/*!************************************************!*\
  !*** ./src/home/rsvp-stuff/invite-template.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
	<p style="font-size:20px; color: rgb(170, 170, 170); text-align: center; font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy;">{invitationDetailsGuestName}</p>
	<h2 style="font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy; font-size: 32px; color: rgb(255, 255, 255); margin-bottom: 20px; text-align: center; line-height: 24px;"><span style="font-size: 18px;">{invitationDetailsGroomNamePrefix}</span><span style="font-size: 52px;">J</span>oshua<br><span style="font-size: 18px;">{invitationDetailsAmpersand}</span><br><span style="font-size: 18px;">{invitationDetailsBrideNamePrefix}</span><span style="font-size: 52px;">O</span>livia</h2>
	<p style="font-size:20px; color: rgb(170, 170, 170); text-align: center; font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy;">{invitationDetailsMessage}</p>
	<table style="width: auto; margin: 0px auto; border-collapse: collapse; text-align: center;">
		<tr>
			<td x-apple-data-detectors="false" style="border-right: 3px solid rgb(238, 187, 51); padding: 16px; color: rgb(221, 221, 221); font-size: 24px;">3:45</td>
			<td x-apple-data-detectors="false" style="border-right: 3px solid rgb(238, 187, 51); padding: 16px; color: rgb(238, 238, 238); font-size: 42px;">{weddingDate}</td>
			<td x-apple-data-detectors="false" style="padding: 16px; color: rgb(221, 221, 221); font-size: 24px;">2024</td>
		</tr>
	</table>
	<div style="text-align: center; margin: 20px auto; font-size: 28px; color:rgb(238,187,51);">TORONTO</div>
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX2MuYjZiMmJmY2Q2ZjQ0MGFjYTA5ZGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFHbEUsTUFBcUIsY0FBZSxTQUFRLHNCQUFZO0lBQXhEOztRQUVDLFVBQUssR0FBRztZQUNQLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxFQUFFO1NBQ1Q7UUFFRCxXQUFNLEdBQW1EO1lBQ3hELElBQUksRUFBRSxDQUFDLEtBQWEsRUFBQyxFQUFFLEdBQUMsQ0FBQztTQUN6QixDQUFDO1FBRUYsYUFBUSxHQUFZLEtBQUssQ0FBQztJQTZFM0IsQ0FBQztJQTNFQSxPQUFPO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBRyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBMEIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBZ0I7UUFDekIsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUVqQixJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQjthQUNJLElBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBRUQsWUFBWTtRQUNYLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdB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TSxDQUFDO2FBQ2YsY0FBYyxDQUFDLGNBQWMsQ0FBQzthQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUNyQixTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFYixHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxhQUFhLENBQUMsRUFBRSxDQUFDO2FBQ2pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQixXQUFXLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUM7YUFDdkIsU0FBUyxDQUFDLCtCQUErQixDQUFDO0lBQzdDLENBQUM7Q0FDRDtBQTNZRCxzQ0EyWUM7Ozs7Ozs7Ozs7Ozs7QUM5WkQscUJBQWU7Ozs7Ozs7Ozs7OztDQVlkLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL2NsaWNrYWJsZS1pbnB1dC50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL2NvbmZpcm1hdGlvbi1wYW5lLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL3JzdnAtc3R1ZmYvaW52aXRlLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpY2thYmxlSW5wdXQgZXh0ZW5kcyBEb3RDb21wb25lbnR7XG5cblx0cHJvcHMgPSB7XG5cdFx0c2hvd0lucHV0OiBmYWxzZSxcblx0XHR2YWx1ZTogXCJcIlxuXHR9XG5cblx0ZXZlbnRzOiB7IFtrZXk6IHN0cmluZ106ICguLi5wYXJhbXM6IGFueVtdKSA9PiB2b2lkOyB9ID0ge1xuXHRcdHNhdmU6ICh2YWx1ZTogc3RyaW5nKT0+e31cblx0fTtcblxuXHRpc0xvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdG9uQ2xpY2soKXtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmlzTG9ja2VkKTtcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy5zaG93SW5wdXQgPSB0cnVlO1xuXHRcdCh0aGlzLiRyZWZzLmlucHV0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZSB8fCBcIlwiO1xuXHRcdHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKTtcblx0fVxuXHRvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XG5cdFx0Ly8gVE9ETzogY2FuY2VsIGlmIGVzY2FwZS4gXG5cdFx0Ly8gU2F2ZSBpZiBlbnRlci5cblxuXHRcdGlmKGUuY29kZSA9PSBcIkVudGVyXCIpe1xuXHRcdFx0dGhpcy5zYXZlQW5kQ2xvc2UoKTtcblx0XHR9XG5cdFx0ZWxzZSBpZihlLmNvZGUgPT0gXCJFc2NhcGVcIil7XG5cdFx0XHR0aGlzLmNhbmNlbCgpO1xuXHRcdH1cblx0fVxuXG5cdHNhdmVBbmRDbG9zZSgpe1xuXHRcdGlmKHRoaXMucHJvcHMuc2hvd0lucHV0KXtcblx0XHRcdHRoaXMucHJvcHMuc2hvd0lucHV0ID0gZmFsc2U7XG5cdFx0XHR0aGlzLnByb3BzLnZhbHVlID0gKHRoaXMuJHJlZnMuaW5wdXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cdFx0XHR0aGlzLmV2ZW50cy5zYXZlKHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdH1cblx0fVxuXHRjYW5jZWwoKXtcblx0XHR0aGlzLnByb3BzLnNob3dJbnB1dCA9IGZhbHNlO1xuXHR9XG5cblx0YnVpbGRlcihkZWZhdWx0VmFsdWU6IHN0cmluZywgaXNMb2NrZWQ6IGJvb2xlYW4pOiBJRG90RWxlbWVudCB7XG5cdFx0dGhpcy5wcm9wcy52YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR0aGlzLmlzTG9ja2VkID0gaXNMb2NrZWQ7XG5cdFx0Y29uc29sZS5sb2coXCJMT0NLRUQ/XCIsIGlzTG9ja2VkKTtcblxuXHRcdHJldHVybiBkb3QuZGl2KFxuXHRcdFx0ZG90LmlucHV0KClcblx0XHRcdFx0LmNsYXNzKHtcblx0XHRcdFx0XHRcImlucHV0XCI6IHRydWUsXG5cdFx0XHRcdFx0aGlkZGVuOiAoKT0+IXRoaXMucHJvcHMuc2hvd0lucHV0XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbktleURvd24oKGUpPT50aGlzLm9uS2V5RG93bihlKSlcblx0XHRcdFx0Lm9uQmx1cigoKT0+dGhpcy5zYXZlQW5kQ2xvc2UoKSlcblx0XHRcdFx0LnJlZihcImlucHV0XCIpIC8vIHJlZiBkb2Vzbid0IHdvcmshXG5cdFx0XHQuZGl2KCgpPT50aGlzLnByb3BzLnZhbHVlKS5jbGFzcyh7XG5cdFx0XHRcdFwiY2xpY2thYmxlLWxhYmVsXCI6IHRydWUsXG5cdFx0XHRcdGhpZGRlbjogKCk9PnRoaXMucHJvcHMuc2hvd0lucHV0XG5cdFx0XHR9KS5vbkNsaWNrKCgpPT50aGlzLm9uQ2xpY2soKSlcblx0XHQpLmNsYXNzKFwiY29udGFpbmVyXCIpXG5cdH1cblxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcblx0XHRjc3MoXCIuY29udGFpbmVyXCIpXG5cdFx0XHQucGFkZGluZygxMClcblxuXHRcdGNzcyhcIi5pbnB1dFwiKVxuXHRcdFx0LmhlaWdodCgxNilcblx0XHRcdC5kaXNwbGF5KFwiYmxvY2tcIilcblx0XHRcdC53aWR0aFAoMTAwKVxuXHRcdFx0LmJhY2tncm91bmRDb2xvcigwLDAsMCwwLjUpXG5cdFx0XHQuY3Vyc29yKFwicG9pbnRlclwiKVxuXHRcdFx0LmNvbG9yKFwid2hpdGVcIilcblx0XHRcdC5wYWRkaW5nKDQpXG5cblx0XHRjc3MoXCIuY2xpY2thYmxlLWxhYmVsXCIpXG5cdFx0XHQuaGVpZ2h0KDE2KVxuXHRcdFx0Ly8gLndpZHRoUCgxMDApXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDAsMCwwLDAuNSlcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXG5cdFx0XHQuY29sb3IoXCJ3aGl0ZVwiKVxuXHRcdFx0LnBhZGRpbmcoNClcblxuXHRcdGNzcyhcIi5oaWRkZW5cIilcblx0XHRcdC5kaXNwbGF5KFwibm9uZVwiKVxuXHR9XG59IiwiaW1wb3J0IHsgSURvdEdlbmVyaWNFbGVtZW50IH0gZnJvbSBcImRvdGh0bWwvbGliL2ktZG90XCI7XG5pbXBvcnQgUGFnZVNlY3Rpb24gZnJvbSBcIi4uL3BhZ2Utc2VjdGlvblwiO1xuaW1wb3J0IHsgSURvdENzcywgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcbmltcG9ydCBSc3ZwT3B0aW9ucyBmcm9tIFwiLi9yc3ZwLW9wdGlvbnNcIjtcbmltcG9ydCB7IEd1ZXN0IH0gZnJvbSBcIi4vZ3Vlc3RcIjtcbmltcG9ydCBsYW5ndWFnZSBmcm9tIFwiLi9sYW5ndWFnZVwiO1xuaW1wb3J0IGludml0ZVRlbXBsYXRlIGZyb20gXCIuL2ludml0ZS10ZW1wbGF0ZVwiO1xuXG50eXBlIE1hc3Rlckd1ZXN0ID0gR3Vlc3QgJiB7XG5cdFBsdXMxRGF0YTogc3RyaW5nO1xufVxuXG50eXBlIE1vZGVsQnV0dG9uID0ge1xuXHRjYXB0aW9uOiBzdHJpbmc7XG5cdHZhbHVlOiBzdHJpbmc7XG59XG5cbmxldCBpc0xvY2tlZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcIkFETUlOPXRydWVcIikgPT0gLTE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1hdGlvblBhbmUgZXh0ZW5kcyBQYWdlU2VjdGlvbntcblxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XG5cdFx0bG9hZGluZ01lc3NhZ2U6IG51bGwsXG5cdFx0Z3Vlc3Q6IG51bGwgYXMgTWFzdGVyR3Vlc3QsXG5cdFx0ZXJyOiBudWxsLFxuXHRcdGxhbmc6IFwiZW5cIiwvL2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ1wiKSB8fCBcImVsXCIsXG5cdFx0ZXZlbnREZXRhaWxzSHRtbDogXCJcIlxuXHR9O1xuXG5cdHBsdXMxczogQXJyYXk8R3Vlc3Q+ID0gW107XG5cblx0Z2V0U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSksIGFyZ3M/OiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW4+KXtcblx0XHRyZXR1cm4gKCk9Pntcblx0XHRcdGxldCBmaW5hbCA9IGxhbmd1YWdlW3N0cl1bdGhpcy5wcm9wcy5sYW5nXTtcblx0XHRcdGlmKGFyZ3Mpe1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0ZmluYWwgPSBmaW5hbC5zcGxpdChgeyR7aX19YCkuam9pbihhcmdzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpbmFsO1xuXHRcdH07XG5cdH1cblxuXHRnZXRSYXdTdHIoc3RyOiBrZXlvZiAodHlwZW9mIGxhbmd1YWdlKSwgYXJncz86IEFycmF5PHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj4pe1xuXHRcdGxldCBmaW5hbCA9IGxhbmd1YWdlW3N0cl1bdGhpcy5wcm9wcy5sYW5nXTtcblx0XHRpZihhcmdzKXtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0ZmluYWwgPSBmaW5hbC5zcGxpdChgeyR7aX19YCkuam9pbihhcmdzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmFsO1xuXHR9XG5cblx0cmVhZHkoKTogdm9pZCB7XG5cdFx0dGhpcy5mZXRjaEd1ZXN0KCk7XG5cdH1cblxuXHRjaGFuZ2VMYW5nKGxhbmcpe1xuXHRcdGRvdC5idXMuZW1pdChcImxhbmd1YWdlXCIsIGxhbmcpO1xuXHRcdHRoaXMucHJvcHMubGFuZyA9IGxhbmc7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYW5nXCIsIGxhbmcpO1xuXHRcdHRoaXMuJHVwZGF0ZVN0eWxlcygpO1xuXHRcdHRoaXMucmVsb2FkRXZlbnREZXRhaWxzSHRtbCgpO1xuXHR9XG5cblx0YXN5bmMgc2hvd01vZGFsKG1lc3NhZ2U6IHN0cmluZywgYnV0dG9uczogQXJyYXk8TW9kZWxCdXR0b24+KTogUHJvbWlzZTxzdHJpbmc+e1xuXHRcdGxldCByZW1vdmluZyA9IGZhbHNlO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlKSA9PiB7XG5cdFx0XHRkb3QoZG9jdW1lbnQuYm9keSkuZGl2KFxuXHRcdFx0XHRkb3QuZGl2KFxuXHRcdFx0XHRcdGRvdC5zcGFuKG1lc3NhZ2UpXG5cdFx0XHRcdFx0LmJyKClcblx0XHRcdFx0XHQuYnIoKVxuXHRcdFx0XHRcdC5lYWNoKGJ1dHRvbnMsIGI9Pntcblx0XHRcdFx0XHRcdHJldHVybiBkb3QuYnV0dG9uKGIuY2FwdGlvbikuc3R5bGUoXG5cdFx0XHRcdFx0XHRcdGRvdC5jc3MucGFkZGluZygxMCkuZm9udFNpemUoMzApLmJhY2tncm91bmRDb2xvcihcImdvbGRcIikuY3Vyc29yKFwicG9pbnRlclwiKS5tYXJnaW4oMjApXG5cdFx0XHRcdFx0XHQpLm9uQ2xpY2soKCk9PnsgXG5cdFx0XHRcdFx0XHRcdGlmKHJlbW92aW5nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRcdHJlbW92aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0Ly8gZG90KFwiI21vZGFsXCIpLnN0eWxlKGRvdC5jc3Mub3BhY2l0eSgwKSk7XG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIikuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpKTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGIudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9LDYwMCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdClcblx0XHRcdFx0LnN0eWxlKGRvdC5jc3Ncblx0XHRcdFx0XHQucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuXHRcdFx0XHRcdC5jb2xvcihcIndoaXRlXCIpXG5cdFx0XHRcdFx0LmxlZnRQKDUwKVxuXHRcdFx0XHRcdC50b3BQKDUwKVxuXHRcdFx0XHRcdC5tYXJnaW4oXCJhdXRvXCIpXG5cdFx0XHRcdFx0LnRyYW5zZm9ybSh0ID0+IHQudHJhbnNsYXRlWFAoLTUwKS50cmFuc2xhdGVZUCgtNTApKVxuXHRcdFx0XHRcdC5taW5XaWR0aCgzMDApXG5cdFx0XHRcdFx0Lm1heFdpZHRoKDgwMClcblx0XHRcdFx0XHQubWluSGVpZ2h0KDIwMClcblx0XHRcdFx0XHQucGFkZGluZyg1MClcblx0XHRcdFx0XHQucGFkZGluZ1RvcCgxMDApXG5cdFx0XHRcdFx0LmZvbnRTaXplKDI0KVxuXHRcdFx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMzAsMzAsMzAsMC44KVxuXHRcdFx0XHRcdC5ib3JkZXJSYWRpdXMoODApXG5cdFx0XHRcdFx0LnRleHRBbGlnbihcImNlbnRlclwiKVxuXHRcdFx0XHRcdC52ZXJ0aWNhbEFsaWduKFwibWlkZGxlXCIpXG5cdFx0XHRcdFx0LmJvcmRlcihcIjVweCBzb2xpZCBnb2xkXCIpXG5cdFx0XHRcdClcblx0XHRcdCkuc3R5bGUoZG90LmNzc1xuXHRcdFx0XHQucG9zaXRpb24oXCJmaXhlZFwiKVxuXHRcdFx0XHQudG9wKDApXG5cdFx0XHRcdC5sZWZ0KDApXG5cdFx0XHRcdC5yaWdodCgwKVxuXHRcdFx0XHQuYm90dG9tKDApXG5cdFx0XHRcdC56SW5kZXgoMTAwMClcblx0XHRcdFx0LmJhY2tkcm9wRmlsdGVyKGY9PmYuYmx1cig1KS5icmlnaHRuZXNzKDUwKS5zZXBpYSgxMDApKVxuXHRcdFx0XHQub3BhY2l0eSgxKVxuXHRcdFx0XHQuYm9yZGVyKFwiNTBweCBzb2xpZCBibGFja1wiKVxuXHRcdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMC41cyBlYXNlXCIpXG5cdFx0XHQpLmlkKFwibW9kYWxcIik7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBmZXRjaEd1ZXN0KCl7XG5cblx0XHRsZXQgZ3Vlc3RJZCA9IFwiXCI7XG5cdFx0XG5cdFx0Y29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXHRcdGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnlTdHJpbmcpO1xuXHRcdGNvbnN0IHBhcmFtVmFsdWUgPSB1cmxQYXJhbXMuZ2V0KFwiaW52aXRlXCIpO1xuXG5cdFx0aWYocGFyYW1WYWx1ZSl7XG5cdFx0XHRndWVzdElkID0gcGFyYW1WYWx1ZS5zcGxpdChcIl9cIilbMF07XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0Z3Vlc3RJZCA9IGhhc2guc3BsaXQoXCJfXCIpWzFdO1xuXHRcdH1cblxuXHRcdGlmKCFndWVzdElkIHx8IGd1ZXN0SWQubGVuZ3RoID09IDApe1xuXHRcdFx0dGhpcy5wcm9wcy5lcnIgPSBcIkludmFsaWQgZ3Vlc3RJZC5cIjtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnByb3BzLmxvYWRpbmdNZXNzYWdlID0gbGFuZ3VhZ2UubG9hZGluZ0d1ZXN0TXNnW3RoaXMucHJvcHMubGFuZ107XG5cblx0XHR7XG5cdFx0XHRsZXQgdXNlckxhbmcgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yW1widXNlckxhbmd1YWdlXCJdOyBcblx0XHRcdHVzZXJMYW5nID0gKHVzZXJMYW5nfHxcIlwiKS5zcGxpdCgnLScpWzBdO1xuXHRcdFx0aWYodXNlckxhbmcgIT0gXCJlbFwiICYmIHVzZXJMYW5nICE9IFwiZnJcIikgdXNlckxhbmcgPSBcImVuXCI7XG5cdFx0XHR0aGlzLnByb3BzLmxhbmcgPSB1c2VyTGFuZztcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFuZ1wiLCB0aGlzLnByb3BzLmxhbmcpO1xuXHRcdH1cblxuXG5cdFx0dHJ5e1xuXHRcdFxuXHRcdFx0bGV0IHJlc3VsdCA9IGF3YWl0IGZldGNoKGBodHRwczovLzJmaXVjZ2ljbDguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vZ2V0LWludml0ZS1kZXRhaWxzP2d1ZXN0SWQ9JHtndWVzdElkfWApO1xuXHRcdFx0bGV0IGpzb25EYXRhID0gYXdhaXQgcmVzdWx0Lmpzb24oKTtcblx0XHRcdHRoaXMucGx1czFzID0gSlNPTi5wYXJzZShqc29uRGF0YS5QbHVzMURhdGEpID8/IFtdO1xuXHRcdFx0XG5cdFx0XHRpZighaXNMb2NrZWQgJiYganNvbkRhdGEuUnN2cFN0YXR1cyAhPSBcIkNPTkZJUk1FRFwiKXtcblxuXHRcdFx0XHQvLyBJZiBpdCdzIHRoZSBmaXJzdCBsb2FkLCBzZXQgdGhlIGxhbmd1YWdlIHRvIHdoYXRldmVyIHRoZSBpbnZpdGUgc2F5cy4gVGhpcyBpcyBhIHNwZWNpYWwgZmVhdHVyZSBmb3IgY2VydGFpbiBndWVzdHMuXG5cblx0XHRcdFx0aWYoanNvbkRhdGEuTGFuZyA9PSBcImVsXCIpe1xuXHRcdFx0XHRcdHRoaXMucHJvcHMubGFuZyA9IGpzb25EYXRhLkxhbmc7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYW5nXCIsIGpzb25EYXRhLkxhbmcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGRlZmF1bHQgUlNWUCFcblxuXHRcdFx0XHRsZXQgcnN2cCA9IFwiREVDTElORURcIjtcblxuXHRcdFx0XHRpZihwYXJhbVZhbHVlIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoXCIjaW52aXRlX1wiKSA9PSAwKXtcblx0XHRcdFx0XHRyc3ZwID0gYXdhaXQgdGhpcy5zaG93TW9kYWwodGhpcy5nZXRTdHIoXCJpbnZpdGVNb2RhbFF1ZXN0aW9uXCIpKCksIFtcblx0XHRcdFx0XHRcdHtjYXB0aW9uOiB0aGlzLmdldFN0cihcInllc05vQnRuWWVzXCIpKCkgYXMgc3RyaW5nLCB2YWx1ZTogXCJDT05GSVJNRURcIn0sXG5cdFx0XHRcdFx0XHR7Y2FwdGlvbjogdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0bk5vXCIpKCkgYXMgc3RyaW5nLCB2YWx1ZTogXCJERUNMSU5FRFwifSxcblx0XHRcdFx0XHRdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHJzdnAgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKFwiI2NvbmZpcm1fXCIpID09IDAgPyBcIkNPTkZJUk1FRFwiIDogXCJERUNMSU5FRFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0XG5cdFx0XHRcdGpzb25EYXRhLlJzdnBTdGF0dXMgPSByc3ZwO1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wbHVzMXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHRoaXMucGx1czFzW2ldLlJzdnBTdGF0dXMgPSByc3ZwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlR3Vlc3QoanNvbkRhdGEpO1xuXHRcdFx0XHR0aGlzLnNob3dNb2RhbCh0aGlzLmdldFN0cihcInJzdnBDb25maXJtYXRpb25cIikoKSwgW3tjYXB0aW9uOiBcIk9LXCIsIHZhbHVlOiBcIm9rXCJ9XSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMucHJvcHMubG9hZGluZ01lc3NhZ2UgPSBcIlwiO1xuXHRcdFx0dGhpcy5wcm9wcy5ndWVzdCA9IGpzb25EYXRhO1xuXHRcdFx0dGhpcy4kdXBkYXRlU3R5bGVzKCk7XG5cdFx0XHR0aGlzLnJlbG9hZEV2ZW50RGV0YWlsc0h0bWwoKTtcblx0XHRcdHJldHVybiBqc29uRGF0YTtcblx0XHR9XG5cdFx0Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0dGhpcy5wcm9wcy5sb2FkaW5nTWVzc2FnZSA9IGxhbmd1YWdlLmZldGNoR3Vlc3RFcnJvclt0aGlzLnByb3BzLmxhbmddO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHNhdmVHdWVzdChqc29uRGF0YSA9IHRoaXMucHJvcHMuZ3Vlc3Qpe1xuXHRcdHRoaXMucHJvcHMubG9hZGluZ01lc3NhZ2UgPSBsYW5ndWFnZS5zYXZpbmdSc3ZwTXNnW3RoaXMucHJvcHMubGFuZ107XG5cdFx0anNvbkRhdGEuUGx1czFEYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5wbHVzMXMubWFwKHg9PngpKTtcblx0XHRsZXQgcmVzdWx0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vMmZpdWNnaWNsOC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cGRhdGUtZ3Vlc3Qtc3RhdHVzYCwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGpzb25EYXRhKVxuXHRcdH0pO1xuXHRcdHRoaXMucHJvcHMubG9hZGluZ01lc3NhZ2UgPSBcIlwiO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVBsdXNPbmUoZGF0YSl7XG5cdFx0Ly8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucGx1czFzLmxlbmd0aDsgaSsrKXtcblx0XHQvLyBcdGxldCBwMSA9IHRoaXMucGx1czFzW2ldO1xuXHRcdC8vIFx0aWYocDEuSWQgPT0gZGF0YS5JZCAmJiBwMS5GdWxsTmFtZSA9PSBkYXRhLkZ1bGxOYW1lKXtcblx0XHQvLyBcdFx0Y29uc29sZS5sb2cocDEpO1xuXHRcdC8vIFx0XHRicmVhaztcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cblx0XHQvLyB0aGlzLnJlbG9hZEV2ZW50RGV0YWlsc0h0bWwoKTtcblx0XHRhd2FpdCB0aGlzLnNhdmVHdWVzdCgpO1xuXHR9XG5cblx0cmVsb2FkRXZlbnREZXRhaWxzSHRtbCgpe1xuXHRcdHRoaXMucHJvcHMuZXZlbnREZXRhaWxzSHRtbCA9IGludml0ZVRlbXBsYXRlXG5cdFx0XHQucmVwbGFjZShcIntpbnZpdGF0aW9uRGV0YWlsc0d1ZXN0TmFtZX1cIiwgdGhpcy5nZXRTdHIoXCJpbnZpdGF0aW9uRGV0YWlsc0d1ZXN0TmFtZVwiLCBbdGhpcy5wcm9wcy5ndWVzdC5GdWxsTmFtZV0pKCkpXG5cdFx0XHQucmVwbGFjZShcIntpbnZpdGF0aW9uRGV0YWlsc0FtcGVyc2FuZH1cIiwgdGhpcy5nZXRTdHIoXCJpbnZpdGF0aW9uRGV0YWlsc0FtcGVyc2FuZFwiKSgpKVxuXHRcdFx0LnJlcGxhY2UoXCJ7aW52aXRhdGlvbkRldGFpbHNHcm9vbU5hbWVQcmVmaXh9XCIsIHRoaXMuZ2V0U3RyKFwiaW52aXRhdGlvbkRldGFpbHNHcm9vbU5hbWVQcmVmaXhcIikoKSlcblx0XHRcdC5yZXBsYWNlKFwie2ludml0YXRpb25EZXRhaWxzQnJpZGVOYW1lUHJlZml4fVwiLCB0aGlzLmdldFN0cihcImludml0YXRpb25EZXRhaWxzQnJpZGVOYW1lUHJlZml4XCIpKCkpXG5cdFx0XHQucmVwbGFjZShcIntpbnZpdGF0aW9uRGV0YWlsc01lc3NhZ2V9XCIsIHRoaXMuZ2V0U3RyKFwiaW52aXRhdGlvbkRldGFpbHNNZXNzYWdlXCIpKCkpXG5cdFx0XHQucmVwbGFjZShcInt3ZWRkaW5nRGF0ZX1cIiwgdGhpcy5nZXRTdHIoXCJ3ZWRkaW5nRGF0ZVwiKSgpKVxuXHR9XG5cblx0YnVpbGRlcigpOiBJRG90R2VuZXJpY0VsZW1lbnQge1xuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxuXHRcdFx0Ly8gZG90LmgxKHRoaXMuZ2V0U3RyKFwicmVzZXJ2YXRpb25EZXRhaWxzSGVhZGVyXCIpKVxuXHRcdFx0ZG90LmRpdihcblx0XHRcdFx0ZG90LndoZW4oKCk9Pntcblx0XHRcdFx0XHRsZXQgZyA9IHRoaXMucHJvcHMuZ3Vlc3Q7XG5cdFx0XHRcdFx0bGV0IGUgPSB0aGlzLnByb3BzLmVycjtcblx0XHRcdFx0XHRyZXR1cm4gISEoZyB8fCBlKTtcblx0XHRcdFx0fSwgKCk9Pntcblx0XHRcdFx0XHRpZih0aGlzLnByb3BzLmVycil7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG90LnAodGhpcy5nZXRTdHIoXCJmZXRjaEd1ZXN0RXJyb3JcIikpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHQvLyByZXR1cm4gZG90LmgyKHRoaXMuZ2V0U3RyKFwiZXZlbnRJbmZvcm1hdGlvbkhlYWRlclwiKSlcblx0XHRcdFx0XHRcdHJldHVybiBkb3QuZGl2KFxuXHRcdFx0XHRcdFx0XHRkb3QuZGl2KCgpPT50aGlzLnByb3BzLmV2ZW50RGV0YWlsc0h0bWwpLmNsYXNzKFwiaW52aXRlLWRldGFpbHNcIilcblx0XHRcdFx0XHRcdFx0LmRpdihcblx0XHRcdFx0XHRcdFx0XHRkb3QuaW1nKCkuY2xhc3MoXCJsb3ZlLXBob3RvXCIpLnNyYyhcImh0dHBzOi8vc2lkZXJpcy13ZWRkaW5nLWltYWdlcy5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9yc3ZwLWxvdmUtaW1nLmpwZ1wiKS53aWR0aCg0MDApXG5cdFx0XHRcdFx0XHRcdCkuY2xhc3MoXCJsb3ZlLXBob3RvLWNvbnRhaW5lclwiKVxuXHRcdFx0XHRcdFx0KS5jbGFzcyhcImludml0ZS1zZWN0aW9uXCIpXG5cblx0XHRcdFx0XHRcdC5oMihcIkxvY2tlZCBJblwiKVxuXHRcdFx0XHRcdFx0LmRpdihcIk91ciBzcGVjaWFsIGRheSBpcyBjb21pbmcgdXAgaW4gYSBtYXR0ZXIgb2YgZGF5cywgYW5kIHJlc2VydmF0aW9ucyBhcmUgbm93IGxvY2tlZCBpbi4gRm9yIGxhc3QtbWludXRlIHN0YXR1cyBjaGFuZ2VzLCBjb250YWN0IHRoZSBicmlkZSBvciBncm9vbS5cIilcblx0XHRcdFx0XHRcdC5oMih0aGlzLmdldFN0cihcInJzdnBIZWFkZXJcIikpXG5cdFx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0XHRkb3QuaCgoKT0+e1xuXHRcdFx0XHRcdFx0XHRcdGxldCBvcHRpb25zID0gbmV3IFJzdnBPcHRpb25zKHRoaXMucHJvcHMuZ3Vlc3QsIGlzTG9ja2VkKVxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub24oXCJ1cGRhdGVcIiwgKGd1ZXN0KT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zYXZlR3Vlc3QoZ3Vlc3QpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0XHRcdGRvdC5oMih0aGlzLmdldFN0cihcInlvdXJQbHVzT25lc0hlYWRlclwiKSlcblx0XHRcdFx0XHRcdFx0XHQuZGl2KGRvdC53aGVuKCF0aGlzLnBsdXMxcz8ubGVuZ3RoLCAoKT0+ZG90LnAodGhpcy5nZXRTdHIoXCJub1BsdXNPbmVzTWVzc2FnZVwiKSkpKVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdC5lYWNoKHRoaXMucGx1czFzLCBkPT57XG5cdFx0XHRcdFx0XHRcdFx0bGV0IG9wdGlvbnMgPSBuZXcgUnN2cE9wdGlvbnMoZCwgaXNMb2NrZWQpO1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub24oXCJ1cGRhdGVcIiwgKGd1ZXN0KT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zYXZlUGx1c09uZShndWVzdCk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQpXG5cblx0XHRcdFx0XHRcdC5oMih0aGlzLmdldFN0cihcIndlZGRpbmdGZWFzdE1lbnVIZWFkZXJcIikpXG5cdFx0XHRcdFx0XHQucCh0aGlzLmdldFN0cihcImNlbGVicmF0aW9uT2ZMb3ZlRmxhdm9yXCIpKVxuXHRcdFx0XHRcdFx0LmRpdihcblx0XHRcdFx0XHRcdFx0XHRkb3Qub2woXG5cdFx0XHRcdFx0XHRcdFx0XHRkb3QubGkodGhpcy5nZXRTdHIoXCJhcHBldGl6ZXJzVGVhc2VQYWxhdGVcIikpXG5cdFx0XHRcdFx0XHRcdFx0XHQubGkodGhpcy5nZXRTdHIoXCJidXR0ZXJudXRTcXVhc2hTb3VwXCIpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwibXVzaHJvb21QZXN0b1JpZ2F0b25pXCIpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwiY2hvb3NlWW91ck1haW5cIikpXG5cdFx0XHRcdFx0XHRcdFx0XHQudWwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRvdC5saSh0aGlzLmdldFN0cihcInZlZ2dpZUZpbG9UdXJub3ZlclwiKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwidmVnZXRhYmxlVGlra2FTa2V3ZXJcIikpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5saSh0aGlzLmdldFN0cihcInZlZ2FuUmljZVN0dWZmZWRQZXBwZXJzXCIpKVxuXHRcdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwiaWNlQ3JlYW1DcmVwZVwiKSlcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpLmNsYXNzKFwib2wtY29udGFpbmVyXCIpLmJyKClcblx0XHRcdFx0XHRcdC5kaXYoXG5cdFx0XHRcdFx0XHRcdGRvdC5kaXYoZG90LmltZygpLnNyYyhcImh0dHBzOi8vc2lkZXJpcy13ZWRkaW5nLWltYWdlcy5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS90dXJub3Zlci5wbmdcIikpXG5cdFx0XHRcdFx0XHRcdC5kaXYoZG90LmltZygpLnNyYyhcImh0dHBzOi8vc2lkZXJpcy13ZWRkaW5nLWltYWdlcy5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9za2V3ZXJzLnBuZ1wiKSlcblx0XHRcdFx0XHRcdFx0LmRpdihkb3QuaW1nKCkuc3JjKFwiaHR0cHM6Ly9zaWRlcmlzLXdlZGRpbmctaW1hZ2VzLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3BlcHBlcnMucG5nXCIpKVxuXHRcdFx0XHRcdFx0KS5jbGFzcyhcImZvb2QtaW1hZ2VzXCIpLmJyKClcblxuXHRcdFx0XHRcdFx0LmgyKHRoaXMuZ2V0U3RyKFwiZ2lmdHNIZWFkZXJcIikpXG5cdFx0XHRcdFx0XHQucCh0aGlzLmdldFN0cihcImdpZnRzTWVzc2FnZVwiKSlcblxuXHRcdFx0XHRcdFx0LmgyKHRoaXMuZ2V0U3RyKFwibG9jYXRpb25IZWFkZXJcIikpXG5cdFx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0XHRkb3QuZGl2KFxuXHRcdFx0XHRcdFx0XHRcdGRvdC5wKHRoaXMuZ2V0U3RyKFwiY2VyZW1vbnlSZWNlcHRpb25Mb2NhdGlvblwiKSgpLnJlcGxhY2UoXCJGYW50YXN5IEZhcm1cIiwgYDxhIGhyZWY9XCJodHRwczovL2ZhbnRhc3lmYXJtLmNhXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RmFudGFzeSBGYXJtPC9hPmApLnJlcGxhY2UoXCJCYWxscm9vbVwiLCBcIjxiPkJhbGxyb29tPC9iPlwiKSlcblx0XHRcdFx0XHRcdFx0KS5jbGFzcyhcImNlcmVtb255LWxvY2F0aW9uXCIpXG5cdFx0XHRcdFx0XHRcdC5icigpXG5cdFx0XHRcdFx0XHRcdC5hKFxuXHRcdFx0XHRcdFx0XHRcdGRvdC5pbWcoKS5zcmMoXCJodHRwczovL3NpZGVyaXMtd2VkZGluZy1pbWFnZXMuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vbWFwLnBuZ1wiKVxuXHRcdFx0XHRcdFx0XHQpLmNsYXNzKFwibWFwLWFcIikuaFJlZihcImh0dHBzOi8vZ29vLmdsL21hcHMvZkR1SDZHV1d0dnltdUdESzdcIikudGFyZ2V0KFwiX2JsYW5rXCIpXG5cdFx0XHRcdFx0XHQpXG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm90aGVyd2lzZSgoKT0+e1xuXHRcdFx0XHRcdHJldHVybiBkb3QucCgoKT0+dGhpcy5wcm9wcy5sb2FkaW5nTWVzc2FnZSlcblxuXHRcdFx0XHR9KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcblx0XHRzdXBlci5zdHlsZShjc3MpO1xuXG5cdFx0Y3NzKFwibGlcIilcblx0XHRcdC5tYXJnaW5Cb3R0b20oOClcblx0XHRcdC5jb2xvcihcIiNFRUVcIilcblx0XHRcdC8vIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuXG5cdFx0Y3NzKFwiLmludml0ZS1zZWN0aW9uXCIpXG5cdFx0XHQuZGlzcGxheShcImZsZXhcIilcblx0XHRcdC5nYXAoMjApXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuXHRcdFx0LmFsaWduSXRlbXMoXCJjZW50ZXJcIilcblx0XHRcdC5mbGV4V3JhcChcIndyYXBcIilcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIik7XG5cblx0XHRjc3MoXCIubG92ZS1waG90b1wiKVxuXHRcdFx0LmJvcmRlclJhZGl1c1AoNTApXG5cdFx0XHQuYm9yZGVyKFwiM3B4IHNvbGlkICNBQTg3MzBcIilcblx0XHRcdC5ib3hTaGFkb3coXCIwIDhweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC43KVwiKVxuXHRcdFx0LnRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLCBvcGFjaXR5IDAuM3MgZWFzZVwiKVxuXHRcdFx0LmZpbHRlcihmPT5mXG5cdFx0XHRcdC5icmlnaHRuZXNzKDE1MClcblx0XHRcdFx0Ly8gLmNvbnRyYXN0KDEyMClcblx0XHRcdFx0Ly8gLnNlcGlhKDIwKVxuXHRcdFx0KVxuXG5cdFx0Y3NzKFwiLmxvdmUtcGhvdG8tY29udGFpbmVyXCIpXG5cdFx0XHQuZmxleEdyb3coMSlcblxuXHRcdGNzcyhcIi5pbnZpdGUtZGV0YWlsc1wiKVxuXHRcdFx0LmZsZXhHcm93KDMpXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwicmdiYSgwLDAsMCwwLjcpXCIpXG5cdFx0XHQucGFkZGluZ1RvcCgyMClcblx0XHRcdC5wYWRkaW5nQm90dG9tKDIwKVxuXHRcdFx0LmJvcmRlclJhZGl1cygyMCk7XG5cblx0XHRjc3MoXCIuY2VyZW1vbnktbG9jYXRpb25cIilcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoNzAsNTUsMCwwLjcpXG5cdFx0XHQuYm9yZGVyUmFkaXVzKDgpXG5cdFx0XHQucGFkZGluZyg4KVxuXHRcdFx0LmNvbG9yKDIzOCwxODcsNTEpXG5cblx0XHRjc3MoXCJhXCIpXG5cdFx0XHQuY29sb3IoMjM4LCAxODcsIDUxKVxuXHRcdFx0LnRleHREZWNvcmF0aW9uKFwidW5kZXJsaW5lIGRvdHRlZFwiKVxuXG5cdFx0Y3NzKFwiLm1hcC1hXCIpXG5cdFx0XHQuZGlzcGxheShcImJsb2NrXCIpXG5cdFx0XHQud2lkdGhQKDEwMClcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcblxuXHRcdGNzcyhcIi5tYXAtYSBpbWdcIilcblx0XHRcdC53aWR0aFAoMTAwKVxuXHRcdFx0Lm1heFdpZHRoKDgwMClcblx0XHRcdC5ib3JkZXJSYWRpdXNQKDI1KVxuXHRcdFx0LmJvcmRlcihcIjNweCBzb2xpZCB3aGl0ZVwiKVxuXHRcdFx0LmJveFNoYWRvdyhcIjAgOHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjcpXCIpXG5cdFx0XHQuZmlsdGVyKGYgPT4gZlxuXHRcdFx0XHQvLyAuY29udHJhc3QoMTUwKVxuXHRcdFx0XHQuYnJpZ2h0bmVzcyg5MClcblx0XHRcdFx0Ly8gLmh1ZVJvdGF0ZShcIjkwZGVnXCIgYXMgYW55KVxuXHRcdFx0XHQvLyAuZ3JheXNjYWxlKDQwKVxuXHRcdFx0XHQuc2VwaWEoMTAwKVxuXHRcdFx0KVxuXG5cdFx0Y3NzKFwiLmZvb2QtaW1hZ2VzXCIpXG5cdFx0XHQuZ2FwKDUpXG5cdFx0XHQuZGlzcGxheShcImZsZXhcIilcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcInNwYWNlLWV2ZW5seVwiKVxuXHRcdFx0LmZsZXhXcmFwKFwid3JhcFwiKVxuXHRcdFx0XG5cdFx0Y3NzKFwiLmZvb2QtaW1hZ2VzIGRpdlwiKVxuXHRcdFx0LnRleHRBbGlnbihcImNlbnRlclwiKVxuXHRcdFx0LmZsZXhHcm93KDEpXG5cblx0XHRjc3MoXCIuZm9vZC1pbWFnZXMgaW1nXCIpXG5cdFx0XHQud2lkdGgoMjUwKVxuXHRcdFx0LmhlaWdodCgyNTApXG5cdFx0XHQuYm9yZGVyUmFkaXVzUCg1MClcblx0XHRcdC5ib3JkZXIoXCIzcHggc29saWQgI0FBODIyMFwiKVxuXHRcdFx0LmJvcmRlckNvbG9yKDIzOCwxODcsNTEpXG5cdFx0XHQuYm94U2hhZG93KFwiMCA4cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuNylcIilcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGBcblx0PHAgc3R5bGU9XCJmb250LXNpemU6MjBweDsgY29sb3I6IHJnYigxNzAsIDE3MCwgMTcwKTsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LWZhbWlseTogJnF1b3Q7U2NyaXB0IE1UJnF1b3Q7LCAmcXVvdDtTZWdvZSBzY3JpcHQmcXVvdDssIFJhZ2UsICZxdW90O0x1Y2lkYSBIYW5kd3JpdGluZyZxdW90OywgY3Vyc2l2ZSwgU2F0aXNmeTtcIj57aW52aXRhdGlvbkRldGFpbHNHdWVzdE5hbWV9PC9wPlxuXHQ8aDIgc3R5bGU9XCJmb250LWZhbWlseTogJnF1b3Q7U2NyaXB0IE1UJnF1b3Q7LCAmcXVvdDtTZWdvZSBzY3JpcHQmcXVvdDssIFJhZ2UsICZxdW90O0x1Y2lkYSBIYW5kd3JpdGluZyZxdW90OywgY3Vyc2l2ZSwgU2F0aXNmeTsgZm9udC1zaXplOiAzMnB4OyBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyBtYXJnaW4tYm90dG9tOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAyNHB4O1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAxOHB4O1wiPntpbnZpdGF0aW9uRGV0YWlsc0dyb29tTmFtZVByZWZpeH08L3NwYW4+PHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDUycHg7XCI+Sjwvc3Bhbj5vc2h1YTxicj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDtcIj57aW52aXRhdGlvbkRldGFpbHNBbXBlcnNhbmR9PC9zcGFuPjxicj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDtcIj57aW52aXRhdGlvbkRldGFpbHNCcmlkZU5hbWVQcmVmaXh9PC9zcGFuPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiA1MnB4O1wiPk88L3NwYW4+bGl2aWE8L2gyPlxuXHQ8cCBzdHlsZT1cImZvbnQtc2l6ZToyMHB4OyBjb2xvcjogcmdiKDE3MCwgMTcwLCAxNzApOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQtZmFtaWx5OiAmcXVvdDtTY3JpcHQgTVQmcXVvdDssICZxdW90O1NlZ29lIHNjcmlwdCZxdW90OywgUmFnZSwgJnF1b3Q7THVjaWRhIEhhbmR3cml0aW5nJnF1b3Q7LCBjdXJzaXZlLCBTYXRpc2Z5O1wiPntpbnZpdGF0aW9uRGV0YWlsc01lc3NhZ2V9PC9wPlxuXHQ8dGFibGUgc3R5bGU9XCJ3aWR0aDogYXV0bzsgbWFyZ2luOiAwcHggYXV0bzsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgdGV4dC1hbGlnbjogY2VudGVyO1wiPlxuXHRcdDx0cj5cblx0XHRcdDx0ZCB4LWFwcGxlLWRhdGEtZGV0ZWN0b3JzPVwiZmFsc2VcIiBzdHlsZT1cImJvcmRlci1yaWdodDogM3B4IHNvbGlkIHJnYigyMzgsIDE4NywgNTEpOyBwYWRkaW5nOiAxNnB4OyBjb2xvcjogcmdiKDIyMSwgMjIxLCAyMjEpOyBmb250LXNpemU6IDI0cHg7XCI+Mzo0NTwvdGQ+XG5cdFx0XHQ8dGQgeC1hcHBsZS1kYXRhLWRldGVjdG9ycz1cImZhbHNlXCIgc3R5bGU9XCJib3JkZXItcmlnaHQ6IDNweCBzb2xpZCByZ2IoMjM4LCAxODcsIDUxKTsgcGFkZGluZzogMTZweDsgY29sb3I6IHJnYigyMzgsIDIzOCwgMjM4KTsgZm9udC1zaXplOiA0MnB4O1wiPnt3ZWRkaW5nRGF0ZX08L3RkPlxuXHRcdFx0PHRkIHgtYXBwbGUtZGF0YS1kZXRlY3RvcnM9XCJmYWxzZVwiIHN0eWxlPVwicGFkZGluZzogMTZweDsgY29sb3I6IHJnYigyMjEsIDIyMSwgMjIxKTsgZm9udC1zaXplOiAyNHB4O1wiPjIwMjQ8L3RkPlxuXHRcdDwvdHI+XG5cdDwvdGFibGU+XG5cdDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbjogMjBweCBhdXRvOyBmb250LXNpemU6IDI4cHg7IGNvbG9yOnJnYigyMzgsMTg3LDUxKTtcIj5UT1JPTlRPPC9kaXY+XG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9