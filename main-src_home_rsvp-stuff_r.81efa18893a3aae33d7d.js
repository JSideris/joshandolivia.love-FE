"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_rsvp-stuff_r"],{

/***/ "./src/home/rsvp-stuff/rsvp-options.ts":
/*!*********************************************!*\
  !*** ./src/home/rsvp-stuff/rsvp-options.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const yes_no_select_1 = __importDefault(__webpack_require__(/*! ./yes-no-select */ "./src/home/rsvp-stuff/yes-no-select.ts"));
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
const clickable_input_1 = __importDefault(__webpack_require__(/*! ./clickable-input */ "./src/home/rsvp-stuff/clickable-input.ts"));
class RsvpOptions extends dothtml_1.DotComponent {
    constructor(guest, isLocked) {
        super(guest);
        this.guest = null;
        this.props = {
            lang: "en",
            attending: true,
            turnoverSelected: true,
            skewerSelected: false,
            peppersSelected: false,
            showSaveTxt: false,
        };
        this.events = {
            "update": (guest) => { }
        };
        dothtml_1.dot.bus.on("language", (lang) => {
            this.props.lang = lang;
        });
        this.isLocked = isLocked;
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
    save() {
        this.events.update(this.guest);
        dothtml_1.dot.css(this.$refs.savedTxt)
            .opacity(1)
            .transition("opacity 0.02s ease");
        setTimeout(() => {
            dothtml_1.dot.css(this.$refs.savedTxt)
                .opacity(0)
                .transition("opacity 2s ease");
            // this.props.showSaveTxt = false;
        }, 1000);
    }
    updateDietaryRestrictions(value) {
        this.guest.DietaryRestrictions = value;
        this.save();
    }
    updatePhoneNumber(value) {
        this.guest.Phone = value;
        this.save();
    }
    updateAlcohol(value) {
        this.guest.DrinksAlcohol = value;
        this.save();
    }
    chooseTurnover() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = true;
        this.props.skewerSelected = false;
        this.props.peppersSelected = false;
        this.guest.MealMainSelectionId = "turnover";
        this.save();
    }
    chooseSkewer() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = false;
        this.props.skewerSelected = true;
        this.props.peppersSelected = false;
        this.guest.MealMainSelectionId = "skewer";
        this.save();
    }
    choosePeppers() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = false;
        this.props.skewerSelected = false;
        this.props.peppersSelected = true;
        this.guest.MealMainSelectionId = "peppers";
        this.save();
    }
    builder(guest) {
        this.guest = guest;
        // this.props.name = guest.Name;
        // this.props.email = guest.Email;
        let attending = this.guest.RsvpStatus == "CONFIRMED";
        // this.props.attending = this.guest.RsvpStatus == "CONFIRMED";
        this.rsvpButton = new yes_no_select_1.default(attending, this.isLocked);
        this.guest.MealMainSelectionId = this.guest.MealMainSelectionId || "turnover";
        this.props.turnoverSelected = this.guest.MealMainSelectionId == "turnover";
        this.props.skewerSelected = this.guest.MealMainSelectionId == "skewer";
        this.props.peppersSelected = this.guest.MealMainSelectionId == "peppers";
        this.rsvpButton.on("change", (value) => {
            if (this.isLocked)
                return;
            // this.props.attending = value;
            attending = value;
            // if(value){
            // 	// this.$updateStyles();
            // }
            this.$refs.isAttending.style.display = value ? "block" : "none";
            this.$refs.isNotAttending.style.display = !value ? "block" : "none";
            this.guest.RsvpStatus = value ? "CONFIRMED" : "DECLINED";
            this.save();
        });
        this.alcoholButton = new yes_no_select_1.default(true, this.isLocked);
        this.dietaryRestrictions = new clickable_input_1.default(this.guest.DietaryRestrictions, this.isLocked);
        this.dietaryRestrictions.on("save", (value) => {
            this.updateDietaryRestrictions(value);
        });
        // this.phoneField = new ClickableInput(this.guest.Phone);
        // this.phoneField.on("save", (value)=>{this.updatePhoneNumber(value);});
        return dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.div(this.getStr("guestHeader", [this.guest.FullName])).class("guest-name")
            .div(this.getStr("savedConfirmation")).class({
            "saved-txt": true,
            "hide": () => !this.props.showSaveTxt,
            "show": () => this.props.showSaveTxt
        }).ref("savedTxt")
            .div(this.getStr("attendingLabel"))
            .div(this.rsvpButton)).class("header")
            .div(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.b(this.getStr("mealSelectionHeader")).class("subheader")
            .div(dothtml_1.dot.div(this.getStr("chooseMainCourse"))
            .div(dothtml_1.dot.button(this.getStr("veggieFiloTurnoverConcise")).onClick(() => this.chooseTurnover()).class({
            "select-meal-btn": true,
            selected: () => this.props.turnoverSelected
        })
            .button(this.getStr("vegetableTikkaSkewerConcise")).onClick(() => this.chooseSkewer()).class({
            "select-meal-btn": true,
            selected: () => this.props.skewerSelected
        })
            .button(this.getStr("veganRiceStuffedPeppersConcise")).onClick(() => this.choosePeppers()).class({
            "select-meal-btn": true,
            selected: () => this.props.peppersSelected
        })).class("meal-btns"))).class({ "hidden2": () => this.guest.IsChild }))
            .b(this.getStr("preferencesHeader")).class("subheader")
            .div(dothtml_1.dot.span(this.getStr("allergiesDietaryRestrictions"))
            .br()
            .h(this.dietaryRestrictions))
            .div(dothtml_1.dot.input()
            // .value(this.guest.DrinksAlcohol)
            .class({
            "alcohol-check": true,
            "hidden2": !!this.guest.IsChild
        })
            .type("checkbox")
            .disabled(this.isLocked)
            .onChange((e) => this.updateAlcohol(e.target.checked))
            .ref("drinksAlcohol")
            .label(this.getStr("expectDrinkingAlcohol")))
        // .b(this.getStr("contactInfoHeader")).class("subheader")
        // .div(
        // 	dot.span(this.getStr("phoneLabel"))
        // 	.br()
        // 	.h(this.phoneField)
        // )
        ).ref("isAttending")
            .i(this.getStr("notAttending")).ref("isNotAttending")
        // .when(()=>!this.props.attending, ()=>{
        // })
        ).class("options")).class("rsvp-options");
    }
    ready() {
        this.$refs.drinksAlcohol.checked = this.guest.DrinksAlcohol;
    }
    style(css) {
        // return;
        css(".hidden2")
            .display("none");
        css(".rsvp-options")
            .marginBottom(20);
        css(".header")
            .display("flex")
            .flexDirection("row")
            .padding(10)
            .backgroundColor(20, 20, 20, 0.8)
            .borderTopLeftRadius(5)
            .borderTopRightRadius(5)
            .fontSize(20);
        css(".guest-name")
            .flexGrow(10);
        css(".saved-txt")
            .flexGrow(1)
            .color("green")
            .fontWeight("bold");
        css(".saved-txt.hide")
            .opacity(0)
            .transition("opacity 2s ease");
        css(".saved-txt.show")
            .opacity(1)
            .transition("opacity 0.02s ease");
        css(".options")
            .flexDirection("row")
            .padding(10)
            .backgroundColor(255, 255, 255, 0.3)
            .borderBottomLeftRadius(5)
            .borderBottomRightRadius(5)
            .color("#111");
        css(".subheader")
            .display("block")
            .fontWeight("bold")
            .fontSize(18)
            .marginTop(10)
            .marginBottom(10);
        css(".meal-btns")
            .display("flex")
            .flexWrap("wrap")
            .gap(10)
            .justifyContent("space-evenly")
            .widthP(100);
        css(".select-meal-btn")
            .width(300)
            // .display("block")
            .margin(5)
            .padding(5)
            .marginLeft(10)
            .cursor("pointer")
            .borderRadius(5)
            .color("gold")
            .backgroundColor("#222")
            .transition("color 0.3s, background-color 0.3s ease");
        css(".select-meal-btn.selected")
            .color("black")
            .backgroundColor("gold")
            .fontWeight("bold");
        css(".alcohol-check")
            .marginRight(10)
            .width(16).height(16);
        css("label")
            .position("relative")
            .lineHeight(22)
            .height(22)
            .display("inline-block")
            .top(-3);
        css(this.$refs.isAttending).display(this.guest.RsvpStatus == "CONFIRMED" ? "block" : "none");
        css(this.$refs.isNotAttending).display(this.guest.RsvpStatus != "CONFIRMED" ? "block" : "none");
    }
}
exports["default"] = RsvpOptions;


/***/ }),

/***/ "./src/home/rsvp-stuff/unsubscribe-pane.ts":
/*!*************************************************!*\
  !*** ./src/home/rsvp-stuff/unsubscribe-pane.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_section_1 = __importDefault(__webpack_require__(/*! ../page-section */ "./src/home/page-section.ts"));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class UnsubscribePane extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            unsubbed: false
        };
    }
    async unsub() {
        (0, dothtml_1.dot)(this.$refs.buttons).empty().p("You will be unsubscribed from further communication. Contact the bride or the groom if this was done in error. ").a("Back to site.").hRef(window.location.href.split("#")[0]);
        this.$updateStyles();
        let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
            method: "POST",
            body: JSON.stringify({
                guestId: window.location.hash.split("_")[1],
                unsubscribe: true
            })
        });
    }
    goBack() {
        window.location.href = window.location.href.split("#")[0];
    }
    builder() {
        return super.builder(dothtml_1.dot.h1("Unsubscribe")
            .p("Are you sure you want to unsubscribe? If you do, you won't receive further notifications. This will not affect your RSVP status.")
            .br().br()
            .div(dothtml_1.dot.button("Yes, unsubscribe!").onClick(() => this.unsub())
            .br().br()
            .button("No, take me back!").onClick(() => this.goBack())).ref("buttons"));
    }
    style(css) {
        super.style(css);
        css("button").fontSize(36).cursor("pointer");
        css("a").color("#DDF");
    }
}
exports["default"] = UnsubscribePane;


/***/ }),

/***/ "./src/home/rsvp-stuff/yes-no-select.ts":
/*!**********************************************!*\
  !*** ./src/home/rsvp-stuff/yes-no-select.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
class YesNoSelect extends dothtml_1.DotComponent {
    constructor(defaultValue, isLocked) {
        super(defaultValue);
        this.props = {
            selected: false,
            lang: "en", // localStorage.getItem("lang") || "en",
        };
        this.events = {
            "change": () => { }
        };
        this.isLocked = false;
        this.isLocked = isLocked;
        dothtml_1.dot.bus.on("language", (lang) => {
            this.props.lang = lang;
        });
    }
    getStr(str) {
        return () => language_1.default[str][this.props.lang];
    }
    change() {
        if (this.isLocked)
            return;
        this.props.selected = !this.props.selected;
        this.events.change(this.props.selected);
    }
    builder(defaultValue) {
        this.props.selected = defaultValue;
        return dothtml_1.dot.div(dothtml_1.dot.div(() => this.props.selected ? this.getStr("yesNoBtnYes") : this.getStr("yesNoBtnNo")).class({ "inner-btn": true, yes: () => this.props.selected, no: () => !this.props.selected })).class("yes-no-btn").onClick(() => { this.change(); });
    }
    style(css) {
        css(".yes-no-btn")
            .position("relative")
            .borderRadius(5)
            .padding(3)
            .fontSize(14)
            .marginLeft(10)
            .width(40)
            .border("1px solid white")
            .cursor("pointer")
            .textAlign("center");
        css(".inner-btn")
            .transition("background-color 0.5s");
        css(".yes")
            .backgroundColor("green");
        css(".no")
            .backgroundColor("#444");
    }
}
exports["default"] = YesNoSelect;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX3IuODFlZmExODg5M2EzYWFlMzNkN2QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFDbEUsOEhBQTBDO0FBRTFDLCtHQUFrQztBQUNsQyxvSUFBK0M7QUFHL0MsTUFBcUIsV0FBWSxTQUFRLHNCQUFZO0lBdUJwRCxZQUFZLEtBQVksRUFBRSxRQUFpQjtRQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUF0QmQsVUFBSyxHQUFVLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQTRCO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFdBQVcsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFFRixXQUFNLEdBQUc7WUFDUixRQUFRLEVBQUUsQ0FBQyxLQUFZLEVBQUMsRUFBRSxHQUFDLENBQUM7U0FDNUI7UUFXQSxhQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTRCLEVBQUUsSUFBbUM7UUFDdkUsT0FBTyxHQUFFLEVBQUU7WUFDVixJQUFJLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBRyxJQUFJLEVBQUM7Z0JBQ1AsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JB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QUMsTUFBTSxDQUFDO0lBQzFCLENBQUM7Q0FDRDtBQTdERCxpQ0E2REMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL3JzdnAtb3B0aW9ucy50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL3Vuc3Vic2NyaWJlLXBhbmUudHMiLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zdHVmZi95ZXMtbm8tc2VsZWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5pbXBvcnQgWWVzTm9TZWxlY3QgZnJvbSBcIi4veWVzLW5vLXNlbGVjdFwiO1xuaW1wb3J0IHsgR3Vlc3QgfSBmcm9tIFwiLi9ndWVzdFwiO1xuaW1wb3J0IGxhbmd1YWdlIGZyb20gXCIuL2xhbmd1YWdlXCI7XG5pbXBvcnQgQ2xpY2thYmxlSW5wdXQgZnJvbSBcIi4vY2xpY2thYmxlLWlucHV0XCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnN2cE9wdGlvbnMgZXh0ZW5kcyBEb3RDb21wb25lbnR7XG5cblx0Z3Vlc3Q6IEd1ZXN0ID0gbnVsbDtcblxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XG5cdFx0bGFuZzogXCJlblwiLC8vbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5nXCIpIHx8IFwiZW5cIixcblx0XHRhdHRlbmRpbmc6IHRydWUsXG5cdFx0dHVybm92ZXJTZWxlY3RlZDogdHJ1ZSxcblx0XHRza2V3ZXJTZWxlY3RlZDogZmFsc2UsXG5cdFx0cGVwcGVyc1NlbGVjdGVkOiBmYWxzZSxcblx0XHRzaG93U2F2ZVR4dDogZmFsc2UsXG5cdH07XG5cblx0ZXZlbnRzID0ge1xuXHRcdFwidXBkYXRlXCI6IChndWVzdDogR3Vlc3QpPT57fVxuXHR9XG5cblx0cnN2cEJ1dHRvbjogWWVzTm9TZWxlY3Q7XG5cdGFsY29ob2xCdXR0b246IFllc05vU2VsZWN0O1xuXHRkaWV0YXJ5UmVzdHJpY3Rpb25zOiBDbGlja2FibGVJbnB1dDtcblx0cGhvbmVGaWVsZDogYW55O1xuXHRpc0xvY2tlZDogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3RvcihndWVzdDogR3Vlc3QsIGlzTG9ja2VkOiBib29sZWFuKXtcblx0XHRzdXBlcihndWVzdCk7XG5cblx0XHRkb3QuYnVzLm9uKFwibGFuZ3VhZ2VcIiwgKGxhbmcpPT57XG5cdFx0XHR0aGlzLnByb3BzLmxhbmcgPSBsYW5nO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5pc0xvY2tlZCA9IGlzTG9ja2VkO1xuXHR9XG5cblx0Z2V0U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSksIGFyZ3M/OiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW4+KXtcblx0XHRyZXR1cm4gKCk9Pntcblx0XHRcdGxldCBmaW5hbCA9IGxhbmd1YWdlW3N0cl1bdGhpcy5wcm9wcy5sYW5nXTtcblx0XHRcdGlmKGFyZ3Mpe1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0ZmluYWwgPSBmaW5hbC5zcGxpdChgeyR7aX19YCkuam9pbihhcmdzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpbmFsO1xuXHRcdH07XG5cdH1cblxuXHRzYXZlKCl7XG5cdFx0dGhpcy5ldmVudHMudXBkYXRlKHRoaXMuZ3Vlc3QpO1xuXG5cdFx0ZG90LmNzcyh0aGlzLiRyZWZzLnNhdmVkVHh0KVxuXHRcdFx0Lm9wYWNpdHkoMSlcblx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAwLjAycyBlYXNlXCIpXG5cdFx0XG5cdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0ZG90LmNzcyh0aGlzLiRyZWZzLnNhdmVkVHh0KVxuXHRcdFx0XHQub3BhY2l0eSgwKVxuXHRcdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMnMgZWFzZVwiKVxuXHRcdFx0Ly8gdGhpcy5wcm9wcy5zaG93U2F2ZVR4dCA9IGZhbHNlO1xuXG5cdFx0fSwgMTAwMCk7XG5cdH1cblxuXHR1cGRhdGVEaWV0YXJ5UmVzdHJpY3Rpb25zKHZhbHVlOiBzdHJpbmcpe1xuXHRcdHRoaXMuZ3Vlc3QuRGlldGFyeVJlc3RyaWN0aW9ucyA9IHZhbHVlO1xuXHRcdHRoaXMuc2F2ZSgpO1xuXHR9XG5cdHVwZGF0ZVBob25lTnVtYmVyKHZhbHVlOiBzdHJpbmcpe1xuXHRcdHRoaXMuZ3Vlc3QuUGhvbmUgPSB2YWx1ZTtcblx0XHR0aGlzLnNhdmUoKTtcblx0fVxuXHR1cGRhdGVBbGNvaG9sKHZhbHVlOiBib29sZWFuKXtcblx0XHR0aGlzLmd1ZXN0LkRyaW5rc0FsY29ob2wgPSB2YWx1ZTtcblx0XHR0aGlzLnNhdmUoKTtcblx0fVxuXG5cdGNob29zZVR1cm5vdmVyKCl7XG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IHRydWU7XG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gXCJ0dXJub3ZlclwiO1xuXHRcdHRoaXMuc2F2ZSgpO1xuXHR9XG5cblx0Y2hvb3NlU2tld2VyKCl7XG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gXCJza2V3ZXJcIjtcblx0XHR0aGlzLnNhdmUoKTtcblx0fVxuXG5cdGNob29zZVBlcHBlcnMoKXtcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gdHJ1ZTtcblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSBcInBlcHBlcnNcIjtcblx0XHR0aGlzLnNhdmUoKTtcblx0fVxuXG5cdGJ1aWxkZXIoZ3Vlc3Q6IEd1ZXN0KTogSURvdEVsZW1lbnQge1xuXG5cdFx0dGhpcy5ndWVzdCA9IGd1ZXN0O1xuXHRcdC8vIHRoaXMucHJvcHMubmFtZSA9IGd1ZXN0Lk5hbWU7XG5cdFx0Ly8gdGhpcy5wcm9wcy5lbWFpbCA9IGd1ZXN0LkVtYWlsO1xuXG5cdFx0bGV0IGF0dGVuZGluZyA9IHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9PSBcIkNPTkZJUk1FRFwiO1xuXHRcdC8vIHRoaXMucHJvcHMuYXR0ZW5kaW5nID0gdGhpcy5ndWVzdC5Sc3ZwU3RhdHVzID09IFwiQ09ORklSTUVEXCI7XG5cdFx0dGhpcy5yc3ZwQnV0dG9uID0gbmV3IFllc05vU2VsZWN0KGF0dGVuZGluZywgdGhpcy5pc0xvY2tlZCk7XG5cblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgfHwgXCJ0dXJub3ZlclwiO1xuXG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID09IFwidHVybm92ZXJcIjtcblx0XHR0aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID09IFwic2tld2VyXCI7XG5cdFx0dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPT0gXCJwZXBwZXJzXCI7XG5cblx0XHR0aGlzLnJzdnBCdXR0b24ub24oXCJjaGFuZ2VcIiwgKHZhbHVlKT0+e1xuXHRcdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xuXHRcdFx0Ly8gdGhpcy5wcm9wcy5hdHRlbmRpbmcgPSB2YWx1ZTtcblx0XHRcdGF0dGVuZGluZyA9IHZhbHVlO1xuXHRcdFx0Ly8gaWYodmFsdWUpe1xuXHRcdFx0Ly8gXHQvLyB0aGlzLiR1cGRhdGVTdHlsZXMoKTtcblx0XHRcdC8vIH1cblxuXHRcdFx0dGhpcy4kcmVmcy5pc0F0dGVuZGluZy5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcblx0XHRcdHRoaXMuJHJlZnMuaXNOb3RBdHRlbmRpbmcuc3R5bGUuZGlzcGxheSA9ICF2YWx1ZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xuXG5cdFx0XHR0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgPSB2YWx1ZSA/IFwiQ09ORklSTUVEXCIgOiBcIkRFQ0xJTkVEXCI7XG5cblx0XHRcdHRoaXMuc2F2ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5hbGNvaG9sQnV0dG9uID0gbmV3IFllc05vU2VsZWN0KHRydWUsIHRoaXMuaXNMb2NrZWQpO1xuXHRcdHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucyA9IG5ldyBDbGlja2FibGVJbnB1dCh0aGlzLmd1ZXN0LkRpZXRhcnlSZXN0cmljdGlvbnMsIHRoaXMuaXNMb2NrZWQpO1xuXHRcdHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucy5vbihcInNhdmVcIiwgKHZhbHVlKT0+e1xuXHRcdFx0dGhpcy51cGRhdGVEaWV0YXJ5UmVzdHJpY3Rpb25zKHZhbHVlKTtcblx0XHR9KTtcblxuXHRcdC8vIHRoaXMucGhvbmVGaWVsZCA9IG5ldyBDbGlja2FibGVJbnB1dCh0aGlzLmd1ZXN0LlBob25lKTtcblx0XHQvLyB0aGlzLnBob25lRmllbGQub24oXCJzYXZlXCIsICh2YWx1ZSk9Pnt0aGlzLnVwZGF0ZVBob25lTnVtYmVyKHZhbHVlKTt9KTtcblxuXHRcdHJldHVybiBkb3QuZGl2KFxuXHRcdFx0ZG90LmRpdihcblx0XHRcdFx0ZG90LmRpdih0aGlzLmdldFN0cihcImd1ZXN0SGVhZGVyXCIsIFt0aGlzLmd1ZXN0LkZ1bGxOYW1lXSkpLmNsYXNzKFwiZ3Vlc3QtbmFtZVwiKVxuXHRcdFx0XHQuZGl2KHRoaXMuZ2V0U3RyKFwic2F2ZWRDb25maXJtYXRpb25cIikpLmNsYXNzKHtcblx0XHRcdFx0XHRcInNhdmVkLXR4dFwiOiB0cnVlLFxuXHRcdFx0XHRcdFwiaGlkZVwiOiAoKT0+IXRoaXMucHJvcHMuc2hvd1NhdmVUeHQsXG5cdFx0XHRcdFx0XCJzaG93XCI6ICgpPT50aGlzLnByb3BzLnNob3dTYXZlVHh0XG5cdFx0XHRcdH0pLnJlZihcInNhdmVkVHh0XCIpXG5cdFx0XHRcdC5kaXYodGhpcy5nZXRTdHIoXCJhdHRlbmRpbmdMYWJlbFwiKSlcblx0XHRcdFx0LmRpdih0aGlzLnJzdnBCdXR0b24pXG5cdFx0XHQpLmNsYXNzKFwiaGVhZGVyXCIpXG5cdFx0XHQuZGl2KFxuXG5cdFx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdFx0ZG90LmRpdihcblx0XHRcdFx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdFx0XHRcdGRvdC5iKHRoaXMuZ2V0U3RyKFwibWVhbFNlbGVjdGlvbkhlYWRlclwiKSkuY2xhc3MoXCJzdWJoZWFkZXJcIilcblx0XHRcdFx0XHRcdFx0LmRpdihcblx0XHRcdFx0XHRcdFx0XHRkb3QuZGl2KHRoaXMuZ2V0U3RyKFwiY2hvb3NlTWFpbkNvdXJzZVwiKSlcblx0XHRcdFx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0XHRcdFx0ZG90LmJ1dHRvbih0aGlzLmdldFN0cihcInZlZ2dpZUZpbG9UdXJub3ZlckNvbmNpc2VcIikpLm9uQ2xpY2soKCk9PnRoaXMuY2hvb3NlVHVybm92ZXIoKSkuY2xhc3Moe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInNlbGVjdC1tZWFsLWJ0blwiOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogKCk9PnRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdC5idXR0b24odGhpcy5nZXRTdHIoXCJ2ZWdldGFibGVUaWtrYVNrZXdlckNvbmNpc2VcIikpLm9uQ2xpY2soKCk9PnRoaXMuY2hvb3NlU2tld2VyKCkpLmNsYXNzKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ6ICgpPT50aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0LmJ1dHRvbih0aGlzLmdldFN0cihcInZlZ2FuUmljZVN0dWZmZWRQZXBwZXJzQ29uY2lzZVwiKSkub25DbGljaygoKT0+dGhpcy5jaG9vc2VQZXBwZXJzKCkpLmNsYXNzKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ6ICgpPT50aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHQpLmNsYXNzKFwibWVhbC1idG5zXCIpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCkuY2xhc3Moe1wiaGlkZGVuMlwiOiAoKT0+dGhpcy5ndWVzdC5Jc0NoaWxkfSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0LmIodGhpcy5nZXRTdHIoXCJwcmVmZXJlbmNlc0hlYWRlclwiKSkuY2xhc3MoXCJzdWJoZWFkZXJcIilcblx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0ZG90LnNwYW4odGhpcy5nZXRTdHIoXCJhbGxlcmdpZXNEaWV0YXJ5UmVzdHJpY3Rpb25zXCIpKVxuXHRcdFx0XHRcdFx0LmJyKClcblx0XHRcdFx0XHRcdC5oKHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucylcblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0LmRpdihcblx0XHRcdFx0XHRcdGRvdC5pbnB1dCgpXG5cdFx0XHRcdFx0XHRcdC8vIC52YWx1ZSh0aGlzLmd1ZXN0LkRyaW5rc0FsY29ob2wpXG5cdFx0XHRcdFx0XHRcdC5jbGFzcyh7XG5cdFx0XHRcdFx0XHRcdFx0XCJhbGNvaG9sLWNoZWNrXCI6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XCJoaWRkZW4yXCI6ICEhdGhpcy5ndWVzdC5Jc0NoaWxkXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC50eXBlKFwiY2hlY2tib3hcIilcblx0XHRcdFx0XHRcdFx0LmRpc2FibGVkKHRoaXMuaXNMb2NrZWQpXG5cdFx0XHRcdFx0XHRcdC5vbkNoYW5nZSgoZSk9PnRoaXMudXBkYXRlQWxjb2hvbCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkpXG5cdFx0XHRcdFx0XHRcdC5yZWYoXCJkcmlua3NBbGNvaG9sXCIpXG5cdFx0XHRcdFx0XHQubGFiZWwodGhpcy5nZXRTdHIoXCJleHBlY3REcmlua2luZ0FsY29ob2xcIikpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC8vIC5iKHRoaXMuZ2V0U3RyKFwiY29udGFjdEluZm9IZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXG5cdFx0XHRcdFx0Ly8gLmRpdihcblx0XHRcdFx0XHQvLyBcdGRvdC5zcGFuKHRoaXMuZ2V0U3RyKFwicGhvbmVMYWJlbFwiKSlcblx0XHRcdFx0XHQvLyBcdC5icigpXG5cdFx0XHRcdFx0Ly8gXHQuaCh0aGlzLnBob25lRmllbGQpXG5cdFx0XHRcdFx0Ly8gKVxuXHRcdFx0XHQpLnJlZihcImlzQXR0ZW5kaW5nXCIpXG5cblx0XHRcdFx0LmkodGhpcy5nZXRTdHIoXCJub3RBdHRlbmRpbmdcIikpLnJlZihcImlzTm90QXR0ZW5kaW5nXCIpXG5cdFx0XHRcdC8vIC53aGVuKCgpPT4hdGhpcy5wcm9wcy5hdHRlbmRpbmcsICgpPT57XG5cdFx0XHRcdC8vIH0pXG5cdFx0XHQpLmNsYXNzKFwib3B0aW9uc1wiKVxuXHRcdCkuY2xhc3MoXCJyc3ZwLW9wdGlvbnNcIik7XG5cdH1cblxuXHRyZWFkeSgpe1xuXHRcdCh0aGlzLiRyZWZzLmRyaW5rc0FsY29ob2wgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCA9IHRoaXMuZ3Vlc3QuRHJpbmtzQWxjb2hvbDtcblx0fVxuXG5cdHN0eWxlKGNzczogSURvdENzcyk6IHZvaWQge1xuXHRcdC8vIHJldHVybjtcblx0XHRjc3MoXCIuaGlkZGVuMlwiKVxuXHRcdFx0LmRpc3BsYXkoXCJub25lXCIpO1xuXG5cdFx0Y3NzKFwiLnJzdnAtb3B0aW9uc1wiKVxuXHRcdFx0Lm1hcmdpbkJvdHRvbSgyMClcblxuXHRcdGNzcyhcIi5oZWFkZXJcIilcblx0XHRcdC5kaXNwbGF5KFwiZmxleFwiKVxuXHRcdFx0LmZsZXhEaXJlY3Rpb24oXCJyb3dcIilcblx0XHRcdC5wYWRkaW5nKDEwKVxuXHRcdFx0LmJhY2tncm91bmRDb2xvcigyMCwyMCwyMCwwLjgpXG5cdFx0XHQuYm9yZGVyVG9wTGVmdFJhZGl1cyg1KVxuXHRcdFx0LmJvcmRlclRvcFJpZ2h0UmFkaXVzKDUpXG5cdFx0XHQuZm9udFNpemUoMjApXG5cdFx0XHRcblx0XHRjc3MoXCIuZ3Vlc3QtbmFtZVwiKVxuXHRcdFx0LmZsZXhHcm93KDEwKVxuXG5cdFx0Y3NzKFwiLnNhdmVkLXR4dFwiKVxuXHRcdFx0LmZsZXhHcm93KDEpXG5cdFx0XHQuY29sb3IoXCJncmVlblwiKVxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXG5cblx0XHRjc3MoXCIuc2F2ZWQtdHh0LmhpZGVcIilcblx0XHRcdC5vcGFjaXR5KDApXG5cdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMnMgZWFzZVwiKVxuXHRcdGNzcyhcIi5zYXZlZC10eHQuc2hvd1wiKVxuXHRcdFx0Lm9wYWNpdHkoMSlcblx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAwLjAycyBlYXNlXCIpXG5cdFx0XG5cdFx0Y3NzKFwiLm9wdGlvbnNcIilcblx0XHRcdC5mbGV4RGlyZWN0aW9uKFwicm93XCIpXG5cdFx0XHQucGFkZGluZygxMClcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMjU1LDI1NSwyNTUsMC4zKVxuXHRcdFx0LmJvcmRlckJvdHRvbUxlZnRSYWRpdXMoNSlcblx0XHRcdC5ib3JkZXJCb3R0b21SaWdodFJhZGl1cyg1KVxuXHRcdFx0LmNvbG9yKFwiIzExMVwiKVxuXG5cdFx0Y3NzKFwiLnN1YmhlYWRlclwiKVxuXHRcdFx0LmRpc3BsYXkoXCJibG9ja1wiKVxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXG5cdFx0XHQuZm9udFNpemUoMTgpXG5cdFx0XHQubWFyZ2luVG9wKDEwKVxuXHRcdFx0Lm1hcmdpbkJvdHRvbSgxMClcblxuXHRcdGNzcyhcIi5tZWFsLWJ0bnNcIilcblx0XHRcdC5kaXNwbGF5KFwiZmxleFwiKVxuXHRcdFx0LmZsZXhXcmFwKFwid3JhcFwiKVxuXHRcdFx0LmdhcCgxMClcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcInNwYWNlLWV2ZW5seVwiKVxuXHRcdFx0LndpZHRoUCgxMDApXG5cblx0XHRjc3MoXCIuc2VsZWN0LW1lYWwtYnRuXCIpXG5cdFx0XHQud2lkdGgoMzAwKVxuXHRcdFx0Ly8gLmRpc3BsYXkoXCJibG9ja1wiKVxuXHRcdFx0Lm1hcmdpbig1KVxuXHRcdFx0LnBhZGRpbmcoNSlcblx0XHRcdC5tYXJnaW5MZWZ0KDEwKVxuXHRcdFx0LmN1cnNvcihcInBvaW50ZXJcIilcblx0XHRcdC5ib3JkZXJSYWRpdXMoNSlcblx0XHRcdC5jb2xvcihcImdvbGRcIilcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoXCIjMjIyXCIpXG5cdFx0XHQudHJhbnNpdGlvbihcImNvbG9yIDAuM3MsIGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlXCIpXG5cdFx0XHRcblx0XHRjc3MoXCIuc2VsZWN0LW1lYWwtYnRuLnNlbGVjdGVkXCIpXG5cdFx0XHQuY29sb3IoXCJibGFja1wiKVxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcImdvbGRcIilcblx0XHRcdC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuXG5cdFx0Y3NzKFwiLmFsY29ob2wtY2hlY2tcIilcblx0XHRcdC5tYXJnaW5SaWdodCgxMClcblx0XHRcdC53aWR0aCgxNikuaGVpZ2h0KDE2KVxuXG5cdFx0Y3NzKFwibGFiZWxcIilcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG5cdFx0XHQubGluZUhlaWdodCgyMilcblx0XHRcdC5oZWlnaHQoMjIpXG5cdFx0XHQuZGlzcGxheShcImlubGluZS1ibG9ja1wiKVxuXHRcdFx0LnRvcCgtMylcblx0XHRjc3ModGhpcy4kcmVmcy5pc0F0dGVuZGluZykuZGlzcGxheSh0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgPT0gXCJDT05GSVJNRURcIiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiKTtcblx0XHRjc3ModGhpcy4kcmVmcy5pc05vdEF0dGVuZGluZykuZGlzcGxheSh0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgIT0gXCJDT05GSVJNRURcIiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiKTtcblx0fVxufSIsImltcG9ydCB7IElEb3RHZW5lcmljRWxlbWVudCB9IGZyb20gXCJkb3RodG1sL2xpYi9pLWRvdFwiO1xuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuLi9wYWdlLXNlY3Rpb25cIjtcbmltcG9ydCB7IElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5zdWJzY3JpYmVQYW5lIGV4dGVuZHMgUGFnZVNlY3Rpb257XG5cblx0cHJvcHM6IHsgW2tleTogc3RyaW5nXTogYW55OyB9ID0ge1xuXHRcdHVuc3ViYmVkOiBmYWxzZVxuXHR9O1xuXG5cdGFzeW5jIHVuc3ViKCl7XG5cdFx0ZG90KHRoaXMuJHJlZnMuYnV0dG9ucykuZW1wdHkoKS5wKFwiWW91IHdpbGwgYmUgdW5zdWJzY3JpYmVkIGZyb20gZnVydGhlciBjb21tdW5pY2F0aW9uLiBDb250YWN0IHRoZSBicmlkZSBvciB0aGUgZ3Jvb20gaWYgdGhpcyB3YXMgZG9uZSBpbiBlcnJvci4gXCIpLmEoXCJCYWNrIHRvIHNpdGUuXCIpLmhSZWYod2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzBdKTtcblx0XHR0aGlzLiR1cGRhdGVTdHlsZXMoKTtcblx0XHRcblx0XHRsZXQgcmVzdWx0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vMmZpdWNnaWNsOC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cGRhdGUtZ3Vlc3Qtc3RhdHVzYCwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0Z3Vlc3RJZDogd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoXCJfXCIpWzFdLFxuXHRcdFx0XHR1bnN1YnNjcmliZTogdHJ1ZVxuXHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG5cdGdvQmFjaygpe1xuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzBdO1xuXHR9XG5cblx0YnVpbGRlcigpOiBJRG90R2VuZXJpY0VsZW1lbnQge1xuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxuXHRcdFx0ZG90LmgxKFwiVW5zdWJzY3JpYmVcIilcblx0XHRcdC5wKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHVuc3Vic2NyaWJlPyBJZiB5b3UgZG8sIHlvdSB3b24ndCByZWNlaXZlIGZ1cnRoZXIgbm90aWZpY2F0aW9ucy4gVGhpcyB3aWxsIG5vdCBhZmZlY3QgeW91ciBSU1ZQIHN0YXR1cy5cIilcblx0XHRcdC5icigpLmJyKClcblx0XHRcdC5kaXYoXG5cdFx0XHRcdGRvdC5idXR0b24oXCJZZXMsIHVuc3Vic2NyaWJlIVwiKS5vbkNsaWNrKCgpPT50aGlzLnVuc3ViKCkpXG5cdFx0XHRcdC5icigpLmJyKClcblx0XHRcdFx0LmJ1dHRvbihcIk5vLCB0YWtlIG1lIGJhY2shXCIpLm9uQ2xpY2soKCk9PnRoaXMuZ29CYWNrKCkpXG5cdFx0XHQpLnJlZihcImJ1dHRvbnNcIilcblx0XHQpO1xuXHR9XG5cblx0c3R5bGUoY3NzOiBJRG90Q3NzKTogdm9pZCB7XG5cdFx0c3VwZXIuc3R5bGUoY3NzKTtcblxuXHRcdGNzcyhcImJ1dHRvblwiKS5mb250U2l6ZSgzNikuY3Vyc29yKFwicG9pbnRlclwiKTtcblx0XHRjc3MoXCJhXCIpLmNvbG9yKFwiI0RERlwiKTtcblx0fVxufSIsImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5pbXBvcnQgbGFuZ3VhZ2UgZnJvbSBcIi4vbGFuZ3VhZ2VcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZXNOb1NlbGVjdCBleHRlbmRzIERvdENvbXBvbmVudHtcblxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XG5cdFx0c2VsZWN0ZWQ6IGZhbHNlLFxuXHRcdGxhbmc6IFwiZW5cIiwvLyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmdcIikgfHwgXCJlblwiLFxuXHR9O1xuXG5cdGV2ZW50czogeyBba2V5OiBzdHJpbmddOiAoLi4ucGFyYW1zOiBhbnlbXSkgPT4gdm9pZDsgfSA9IHtcblx0XHRcImNoYW5nZVwiOiAoKT0+e31cblx0fVxuXG5cdGlzTG9ja2VkID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoZGVmYXVsdFZhbHVlOiBib29sZWFuLCBpc0xvY2tlZDogYm9vbGVhbil7XG5cdFx0c3VwZXIoZGVmYXVsdFZhbHVlKTtcblx0XHR0aGlzLmlzTG9ja2VkID0gaXNMb2NrZWQ7XG5cblx0XHRkb3QuYnVzLm9uKFwibGFuZ3VhZ2VcIiwgKGxhbmcpPT57XG5cdFx0XHR0aGlzLnByb3BzLmxhbmcgPSBsYW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSkpe1xuXHRcdHJldHVybiAoKT0+bGFuZ3VhZ2Vbc3RyXVt0aGlzLnByb3BzLmxhbmddO1xuXHR9XG5cblx0Y2hhbmdlKCl7XG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMuc2VsZWN0ZWQgPSAhdGhpcy5wcm9wcy5zZWxlY3RlZDtcblxuXHRcdHRoaXMuZXZlbnRzLmNoYW5nZSh0aGlzLnByb3BzLnNlbGVjdGVkKTtcblx0fVxuXG5cdGJ1aWxkZXIoZGVmYXVsdFZhbHVlOiBib29sZWFuKTogSURvdEVsZW1lbnQge1xuXHRcdHRoaXMucHJvcHMuc2VsZWN0ZWQgPSBkZWZhdWx0VmFsdWU7XG5cdFx0cmV0dXJuIGRvdC5kaXYoXG5cdFx0XHRkb3QuZGl2KCgpPT50aGlzLnByb3BzLnNlbGVjdGVkID8gdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0blllc1wiKSA6IHRoaXMuZ2V0U3RyKFwieWVzTm9CdG5Ob1wiKSkuY2xhc3Moe1wiaW5uZXItYnRuXCI6IHRydWUsIHllczogKCk9PnRoaXMucHJvcHMuc2VsZWN0ZWQsIG5vOiAoKT0+IXRoaXMucHJvcHMuc2VsZWN0ZWR9KVxuXHRcdCkuY2xhc3MoXCJ5ZXMtbm8tYnRuXCIpLm9uQ2xpY2soKCk9Pnt0aGlzLmNoYW5nZSgpfSlcblx0fVxuXG5cdHN0eWxlKGNzczogSURvdENzcyk6IHZvaWQge1xuXHRcdGNzcyhcIi55ZXMtbm8tYnRuXCIpXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuXHRcdFx0LmJvcmRlclJhZGl1cyg1KVxuXHRcdFx0LnBhZGRpbmcoMylcblx0XHRcdC5mb250U2l6ZSgxNClcblx0XHRcdC5tYXJnaW5MZWZ0KDEwKVxuXHRcdFx0LndpZHRoKDQwKVxuXHRcdFx0LmJvcmRlcihcIjFweCBzb2xpZCB3aGl0ZVwiKVxuXHRcdFx0LmN1cnNvcihcInBvaW50ZXJcIilcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcblxuXHRcdGNzcyhcIi5pbm5lci1idG5cIilcblx0XHRcdC50cmFuc2l0aW9uKFwiYmFja2dyb3VuZC1jb2xvciAwLjVzXCIpXG5cblx0XHRjc3MoXCIueWVzXCIpXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiZ3JlZW5cIilcblxuXHRcdGNzcyhcIi5ub1wiKVxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcIiM0NDRcIilcblx0fVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==