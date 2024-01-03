"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_ab"],{

/***/ "./src/home/about-the-couple.ts":
/*!**************************************!*\
  !*** ./src/home/about-the-couple.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const small_pic_jpg_1 = __importDefault(__webpack_require__(/*! ../assets/images/small-pic.jpg */ "./src/assets/images/small-pic.jpg"));
class AboutTheCouple extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {};
    }
    builder() {
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.h1("About Olivia and Josh")
            .img().src(small_pic_jpg_1.default).ref("smallImage")
            // .p(["Josh and Olivia met at York University in 2011. Josh was enrolled in Computer Engineering, and Olivia",
            // 	"majored in English and Professional Writing. Josh was running a robot fighting club at the time when",
            // 	"Olivia reached out to join it.",
            // 	"<br /><br />",
            // 	"Josh happily accepted her into his club, where she took on an executive role, and the two became fast",
            // 	"friends.",
            // 	"<br /><br />",
            // 	"Over the course of two years, they became closer, and an eventual romance blossomed between the",
            // 	"two. They enjoyed shared interests, such as chess, video games, snowboarding, and, of course, robotics.",
            // 	"As the years passed, their love for one another deepened. Like a fine wine, it has improved over time",
            // 	"and continues to grow.",
            // 	"<br /><br />",
            // 	"On January 29, 2022, during a trip to Mexico, Josh and Olivia had been debating over the constellation",
            // 	"Orion when Josh decided to take their relationship to the next level and proposed marriage to Olivia.",
            // 	"After feeling like it was time—and that it was “written in the stars”—a shooting star made its way",
            // 	"through the center of the constellation Orion.",
            // 	"<br /><br />",
            // 	"With this profound blessing from the heavens, Josh got down on one knee to ask Olivia to be his bride.",
            // 	"Although there was no ring involved (as the proposal was not planned), the token of affection could not",
            // 	"have been sweeter: a Ferrero Rocher chocolate.",
            // 	"<br /><br />",
            // 	"With great joy, Olivia accepted his proposal, and the two invite you to join them in this wonderful",
            // 	"celebration of their love."].join(" "))
            // .hr()
            .p(["In the hallowed halls of York University, where dreams were woven from the threads of ambition,",
            "two souls converged in an unexpected alliance. Josh, a Computer Engineering virtuoso with a passion",
            "for mechanical combat, led a band of robot fighting enthusiasts. Olivia, an ethereal spirit majoring",
            "in English and Professional Writing, was captivated by the sparks of creativity she found there.",
            "<br /><br />",
            "A mysterious connection drew Olivia to the arena of metal and code, and she reached out to join the ranks.",
            "With a welcoming smile, Josh ushered her into his world, and she quickly found her place within the club.",
            "From the fusion of gears and prose, a camaraderie was born, and they were entwined as fast friends.",
            "<br /><br />",
            "In the dance of life, their connection evolved, flourishing into a romance that blossomed with shared passions",
            "- chess, video games, snowboarding, and, above all, robotics. Their love was a vintage blend, maturing and",
            "deepening like a rich wine.",
            "<br /><br />",
            "Upon the 29th of January, 2022, on a beautiful starry night in Mexico's warm embarce, amid a playful debate about the constellation",
            "Orion, Josh sensed a moment ripe to take a lover's chance to send their relationship to the next level.",
            "\"It's written in the stars,\" he mused. And as he spoke, a shooting star flew accross the sky and through the belt of Orion.",
            "A profound blessing from the heavans. And with the cosmos bearing witness he got down on one knee.",
            "No ring in hand (as the proposal was not planned), yet love's intent most clearly burned, A Ferrero Rocher,",
            "a token rich in meaning, though in gold unweighed.",
            "A question was asked, a universe held its breath, and with joyous cry, Olivia accepted.",
            "<br /><br />",
            "Now, they invite you to be a witness to a celebration like no other, a testament to a love born from friendship and nurtured through",
            "shared dreams. Join them in toasting to a love \"written in the stars,\" a love that transcends ordinary bounds,",
            "a love that is their eternal promise."].join(" "))).class("overlay")).ref("container").class("section-container"));
    }
    style(css) {
        super.style(css);
        css(".section-container")
            // .height(500)
            .widthP(100);
        css(".overlay")
            // .position("absolute")
            // .top(0)
            // .left(0)
            // .right(0)
            // .bottom(0)
            // .display("flex")
            // .flexDirection("column")
            // .alignItems("center")
            // .justifyContent("center")
            // .textAlign("center")
            // .zIndex(2)
            .backgroundColor(0, 0, 0, 0.3)
            .padding(20);
        // .backdropFilter(f => f.blur(3));
        css(".overlay h1")
            .fontSizeEm(2.5)
            .color("white")
            .margin(0);
        css(this.$refs.smallImage)
            .width(200)
            .height(200)
            .borderRadius(100)
            .float("right");
    }
}
exports["default"] = AboutTheCouple;


/***/ }),

/***/ "./src/home/app.ts":
/*!*************************!*\
  !*** ./src/home/app.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const main_section_1 = __importDefault(__webpack_require__(/*! ./main-section */ "./src/home/main-section.ts"));
const rsvp_section_1 = __importDefault(__webpack_require__(/*! ./rsvp-section */ "./src/home/rsvp-section.ts"));
const about_the_couple_1 = __importDefault(__webpack_require__(/*! ./about-the-couple */ "./src/home/about-the-couple.ts"));
const unsubscribe_pane_1 = __importDefault(__webpack_require__(/*! ./rsvp-stuff/unsubscribe-pane */ "./src/home/rsvp-stuff/unsubscribe-pane.ts"));
const confirmation_pane_1 = __importDefault(__webpack_require__(/*! ./rsvp-stuff/confirmation-pane */ "./src/home/rsvp-stuff/confirmation-pane.ts"));
var SIZE_MODE;
(function (SIZE_MODE) {
    SIZE_MODE[SIZE_MODE["DESKTOP"] = 0] = "DESKTOP";
    SIZE_MODE[SIZE_MODE["MOBILE"] = 1] = "MOBILE";
})(SIZE_MODE || (SIZE_MODE = {}));
class App extends dothtml_1.DotComponent {
    constructor() {
        super(...arguments);
        this.props = {
            sizeMode: SIZE_MODE.DESKTOP
        };
    }
    builder() {
        this.mainSection = new main_section_1.default();
        this.resize();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramValue = urlParams.get("invite");
        return dothtml_1.dot.div(dothtml_1.dot.when((!!paramValue) || window.location.hash.startsWith("#confirm_") || window.location.hash.startsWith("#invite_") || window.location.hash.startsWith("#decline_"), () => {
            return new confirmation_pane_1.default();
        })
            .otherwiseWhen(window.location.hash.startsWith("#unsubscribe_"), () => {
            return new unsubscribe_pane_1.default();
        })
            .otherwise(() => {
            return dothtml_1.dot.h(this.mainSection)
                .h(new rsvp_section_1.default())
                .h(new about_the_couple_1.default());
        })).ref("container")
            .class({
            "mobile-content": () => this.props.sizeMode == SIZE_MODE.MOBILE,
            "desktop-content": () => this.props.sizeMode == SIZE_MODE.DESKTOP
        });
    }
    style(css) {
        css(this.$refs.container)
            .position("relative")
            .backgroundColor(70, 55, 0, 0.6)
            // .backgroundColor(200,170,50,0.6)
            .borderRadius(10)
            .marginTop(0)
            .marginBottom(0)
            .marginLeft("auto")
            .marginRight("auto")
            .padding(30)
            .widthP(70)
            .maxWidth(1200)
            .zIndex(2)
            .backdropFilter(f => f.blur(3));
        // .opacity()
        css(".mobile-content")
            .widthP(100)
            .padding(0)
            .paddingTop(15);
        // .marginLeft(-15)
        // .marginRight(-15)
    }
    resize() {
        // let contentPanel = this.$refs.container;
        if (window.innerWidth <= 768) {
            this.props.sizeMode = SIZE_MODE.MOBILE;
        }
        else {
            this.props.sizeMode = SIZE_MODE.DESKTOP;
        }
        this.mainSection.resize();
    }
    ready() {
        window.addEventListener("resize", () => this.resize());
    }
}
exports["default"] = App;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9hYi45N2JmOTgxNjM5ZDVmYjU4NzMzNi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDhGQUF1QztBQUN2QyxnSEFBeUM7QUFFekMsd0lBQXdEO0FBRXhELE1BQXFCLGNBQWUsU0FBUSxzQkFBVztJQUF2RDs7UUFFQyxVQUFLLEdBQUcsRUFFUDtJQWdHRixDQUFDO0lBOUZBLE9BQU87UUFFTixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQ25CLGFBQUcsQ0FBQyxHQUFHLENBQ04sYUFBRyxDQUFDLEdBQUcsQ0FDTixhQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQzlCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUN4QywrR0FBK0c7WUFDL0csMkdBQTJHO1lBQzNHLHFDQUFxQztZQUNyQyxtQkFBbUI7WUFDbkIsNEdBQTRHO1lBQzVHLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsc0dBQXNHO1lBQ3RHLDhHQUE4RztZQUM5Ryw0R0FBNEc7WUFDNUcsNkJBQTZCO1lBQzdCLG1CQUFtQjtZQUNuQiw2R0FBNkc7WUFDN0csNEdBQTRHO1lBQzVHLHlHQUF5RztZQUN6RyxxREFBcUQ7WUFDckQsbUJBQW1CO1lBQ25CLDZHQUE2RztZQUM3Ryw4R0FBOEc7WUFDOUcscURBQXFEO1lBQ3JELG1CQUFtQjtZQUNuQiwwR0FBMEc7WUFDMUcsNENBQTRDO1lBQzVDLFFBQVE7YUFDUCxDQUFDLENBQUMsQ0FBQyxpR0FBaUc7WUFDcEcscUdBQXFHO1lBQ3JHLHNHQUFzRztZQUN0RyxrR0FBa0c7WUFDbEcsY0FBYztZQUNkLDRHQUE0RztZQUM1RywyR0FBMkc7WUFDM0cscUdBQXFHO1lBQ3JHLGNBQWM7WUFDZCxnSEFBZ0g7WUFDaEgsNEdBQTRHO1lBQzVHLDZCQUE2QjtZQUM3QixjQUFjO1lBQ2QscUlBQXFJO1lBQ3JJLHlHQUF5RztZQUN6RywrSEFBK0g7WUFDL0gsb0dBQW9HO1lBQ3BHLDZHQUE2RztZQUM3RyxvREFBb0Q7WUFDcEQseUZBQXlGO1lBQ3pGLGNBQWM7WUFDZCxzSUFBc0k7WUFDdEksa0hBQWtIO1lBQ2xILHVDQUF1QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3BELENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUNsQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsR0FBWTtRQUNqQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztZQUN4QixlQUFlO2FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNkLHdCQUF3QjtZQUN4QixVQUFVO1lBQ1YsV0FBVztZQUNYLFlBQVk7WUFDWixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLDJCQUEyQjtZQUMzQix3QkFBd0I7WUFDeEIsNEJBQTRCO1lBQzVCLHVCQUF1QjtZQUN2QixhQUFhO2FBQ1osZUFBZSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQzthQUMxQixPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1osbUNBQW1DO1FBRXBDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDaEIsVUFBVSxDQUFDLEdBQUcsQ0FBQzthQUNmLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNEO0FBcEdELG9DQW9HQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pHRCw4RkFBcUQ7QUFDckQsZ0hBQXlDO0FBRXpDLGdIQUF5QztBQUN6Qyw0SEFBZ0Q7QUFDaEQsa0pBQTREO0FBQzVELHFKQUE4RDtBQUU5RCxJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDYiwrQ0FBTztJQUNQLDZDQUFNO0FBQ1AsQ0FBQyxFQUhJLFNBQVMsS0FBVCxTQUFTLFFBR2I7QUFFRCxNQUFxQixHQUFJLFNBQVEsc0JBQVk7SUFBN0M7O1FBQ0MsVUFBSyxHQUFHO1lBQ1AsUUFBUSxFQUFFLFNBQVMsQ0FBQyxPQUFvQjtTQUN4QztJQXdFRixDQUFDO0lBckVBLE9BQU87UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzNDLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsT0FBTyxhQUFHLENBQUMsR0FBRyxDQUViLGFBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRSxFQUFFO1lBQzNLLE9BQU8sSUFBSSwyQkFBZ0IsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQzthQUNELGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRSxFQUFFO1lBQ3BFLE9BQU8sSUFBSSwwQkFBZSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsU0FBUyxDQUFDLEdBQUUsRUFBRTtZQUNkLE9BQU8sYUFBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2lCQUM1QixDQUFDLENBQUMsSUFBSSxzQkFBVyxFQUFFLENBQUM7aUJBQ3BCLENBQUMsQ0FBQyxJQUFJLDBCQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUVGLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzthQUNqQixLQUFLLENBQUM7WUFDTixnQkFBZ0IsRUFBRSxHQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsTUFBTTtZQUM5RCxpQkFBaUIsRUFBRSxHQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTztTQUNoRSxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFZO1FBRWpCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN2QixRQUFRLENBQUMsVUFBVSxDQUFDO2FBQ3BCLGVBQWUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUM7WUFDN0IsbUNBQW1DO2FBQ2xDLFlBQVksQ0FBQyxFQUFFLENBQUM7YUFDaEIsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNaLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDZixVQUFVLENBQUMsTUFBTSxDQUFDO2FBQ2xCLFdBQVcsQ0FBQyxNQUFNLENBQUM7YUFDbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNYLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDVixRQUFRLENBQUMsSUFBSSxDQUFDO2FBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNULGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxhQUFhO1FBRWQsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ1YsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNmLG1CQUFtQjtRQUNuQixvQkFBb0I7SUFDdEIsQ0FBQztJQUVELE1BQU07UUFDTCwyQ0FBMkM7UUFDM0MsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ3ZDO2FBQU07WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRDtBQTNFRCx5QkEyRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9hYm91dC10aGUtY291cGxlLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRG90Q3NzLCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuL3BhZ2Utc2VjdGlvblwiO1xuXG5pbXBvcnQgc21hbGxJbWFnZSBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9zbWFsbC1waWMuanBnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0VGhlQ291cGxlIGV4dGVuZHMgUGFnZVNlY3Rpb257XG5cblx0cHJvcHMgPSB7XG5cdFx0XG5cdH1cblxuXHRidWlsZGVyKCl7XG5cblx0XHRyZXR1cm4gc3VwZXIuYnVpbGRlcihcblx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdFx0ZG90LmgxKFwiQWJvdXQgT2xpdmlhIGFuZCBKb3NoXCIpXG5cdFx0XHRcdFx0LmltZygpLnNyYyhzbWFsbEltYWdlKS5yZWYoXCJzbWFsbEltYWdlXCIpXG5cdFx0XHRcdFx0Ly8gLnAoW1wiSm9zaCBhbmQgT2xpdmlhIG1ldCBhdCBZb3JrIFVuaXZlcnNpdHkgaW4gMjAxMS4gSm9zaCB3YXMgZW5yb2xsZWQgaW4gQ29tcHV0ZXIgRW5naW5lZXJpbmcsIGFuZCBPbGl2aWFcIixcblx0XHRcdFx0XHQvLyBcdFwibWFqb3JlZCBpbiBFbmdsaXNoIGFuZCBQcm9mZXNzaW9uYWwgV3JpdGluZy4gSm9zaCB3YXMgcnVubmluZyBhIHJvYm90IGZpZ2h0aW5nIGNsdWIgYXQgdGhlIHRpbWUgd2hlblwiLFxuXHRcdFx0XHRcdC8vIFx0XCJPbGl2aWEgcmVhY2hlZCBvdXQgdG8gam9pbiBpdC5cIixcblx0XHRcdFx0XHQvLyBcdFwiPGJyIC8+PGJyIC8+XCIsXG5cdFx0XHRcdFx0Ly8gXHRcIkpvc2ggaGFwcGlseSBhY2NlcHRlZCBoZXIgaW50byBoaXMgY2x1Yiwgd2hlcmUgc2hlIHRvb2sgb24gYW4gZXhlY3V0aXZlIHJvbGUsIGFuZCB0aGUgdHdvIGJlY2FtZSBmYXN0XCIsXG5cdFx0XHRcdFx0Ly8gXHRcImZyaWVuZHMuXCIsXG5cdFx0XHRcdFx0Ly8gXHRcIjxiciAvPjxiciAvPlwiLFxuXHRcdFx0XHRcdC8vIFx0XCJPdmVyIHRoZSBjb3Vyc2Ugb2YgdHdvIHllYXJzLCB0aGV5IGJlY2FtZSBjbG9zZXIsIGFuZCBhbiBldmVudHVhbCByb21hbmNlIGJsb3Nzb21lZCBiZXR3ZWVuIHRoZVwiLFxuXHRcdFx0XHRcdC8vIFx0XCJ0d28uIFRoZXkgZW5qb3llZCBzaGFyZWQgaW50ZXJlc3RzLCBzdWNoIGFzIGNoZXNzLCB2aWRlbyBnYW1lcywgc25vd2JvYXJkaW5nLCBhbmQsIG9mIGNvdXJzZSwgcm9ib3RpY3MuXCIsXG5cdFx0XHRcdFx0Ly8gXHRcIkFzIHRoZSB5ZWFycyBwYXNzZWQsIHRoZWlyIGxvdmUgZm9yIG9uZSBhbm90aGVyIGRlZXBlbmVkLiBMaWtlIGEgZmluZSB3aW5lLCBpdCBoYXMgaW1wcm92ZWQgb3ZlciB0aW1lXCIsXG5cdFx0XHRcdFx0Ly8gXHRcImFuZCBjb250aW51ZXMgdG8gZ3Jvdy5cIixcblx0XHRcdFx0XHQvLyBcdFwiPGJyIC8+PGJyIC8+XCIsXG5cdFx0XHRcdFx0Ly8gXHRcIk9uIEphbnVhcnkgMjksIDIwMjIsIGR1cmluZyBhIHRyaXAgdG8gTWV4aWNvLCBKb3NoIGFuZCBPbGl2aWEgaGFkIGJlZW4gZGViYXRpbmcgb3ZlciB0aGUgY29uc3RlbGxhdGlvblwiLFxuXHRcdFx0XHRcdC8vIFx0XCJPcmlvbiB3aGVuIEpvc2ggZGVjaWRlZCB0byB0YWtlIHRoZWlyIHJlbGF0aW9uc2hpcCB0byB0aGUgbmV4dCBsZXZlbCBhbmQgcHJvcG9zZWQgbWFycmlhZ2UgdG8gT2xpdmlhLlwiLFxuXHRcdFx0XHRcdC8vIFx0XCJBZnRlciBmZWVsaW5nIGxpa2UgaXQgd2FzIHRpbWXigJRhbmQgdGhhdCBpdCB3YXMg4oCcd3JpdHRlbiBpbiB0aGUgc3RhcnPigJ3igJRhIHNob290aW5nIHN0YXIgbWFkZSBpdHMgd2F5XCIsXG5cdFx0XHRcdFx0Ly8gXHRcInRocm91Z2ggdGhlIGNlbnRlciBvZiB0aGUgY29uc3RlbGxhdGlvbiBPcmlvbi5cIixcblx0XHRcdFx0XHQvLyBcdFwiPGJyIC8+PGJyIC8+XCIsXG5cdFx0XHRcdFx0Ly8gXHRcIldpdGggdGhpcyBwcm9mb3VuZCBibGVzc2luZyBmcm9tIHRoZSBoZWF2ZW5zLCBKb3NoIGdvdCBkb3duIG9uIG9uZSBrbmVlIHRvIGFzayBPbGl2aWEgdG8gYmUgaGlzIGJyaWRlLlwiLFxuXHRcdFx0XHRcdC8vIFx0XCJBbHRob3VnaCB0aGVyZSB3YXMgbm8gcmluZyBpbnZvbHZlZCAoYXMgdGhlIHByb3Bvc2FsIHdhcyBub3QgcGxhbm5lZCksIHRoZSB0b2tlbiBvZiBhZmZlY3Rpb24gY291bGQgbm90XCIsXG5cdFx0XHRcdFx0Ly8gXHRcImhhdmUgYmVlbiBzd2VldGVyOiBhIEZlcnJlcm8gUm9jaGVyIGNob2NvbGF0ZS5cIixcblx0XHRcdFx0XHQvLyBcdFwiPGJyIC8+PGJyIC8+XCIsXG5cdFx0XHRcdFx0Ly8gXHRcIldpdGggZ3JlYXQgam95LCBPbGl2aWEgYWNjZXB0ZWQgaGlzIHByb3Bvc2FsLCBhbmQgdGhlIHR3byBpbnZpdGUgeW91IHRvIGpvaW4gdGhlbSBpbiB0aGlzIHdvbmRlcmZ1bFwiLFxuXHRcdFx0XHRcdC8vIFx0XCJjZWxlYnJhdGlvbiBvZiB0aGVpciBsb3ZlLlwiXS5qb2luKFwiIFwiKSlcblx0XHRcdFx0XHQvLyAuaHIoKVxuXHRcdFx0XHRcdC5wKFtcIkluIHRoZSBoYWxsb3dlZCBoYWxscyBvZiBZb3JrIFVuaXZlcnNpdHksIHdoZXJlIGRyZWFtcyB3ZXJlIHdvdmVuIGZyb20gdGhlIHRocmVhZHMgb2YgYW1iaXRpb24sXCIsXG5cdFx0XHRcdFx0XHRcInR3byBzb3VscyBjb252ZXJnZWQgaW4gYW4gdW5leHBlY3RlZCBhbGxpYW5jZS4gSm9zaCwgYSBDb21wdXRlciBFbmdpbmVlcmluZyB2aXJ0dW9zbyB3aXRoIGEgcGFzc2lvblwiLFxuXHRcdFx0XHRcdFx0XCJmb3IgbWVjaGFuaWNhbCBjb21iYXQsIGxlZCBhIGJhbmQgb2Ygcm9ib3QgZmlnaHRpbmcgZW50aHVzaWFzdHMuIE9saXZpYSwgYW4gZXRoZXJlYWwgc3Bpcml0IG1ham9yaW5nXCIsXG5cdFx0XHRcdFx0XHRcImluIEVuZ2xpc2ggYW5kIFByb2Zlc3Npb25hbCBXcml0aW5nLCB3YXMgY2FwdGl2YXRlZCBieSB0aGUgc3BhcmtzIG9mIGNyZWF0aXZpdHkgc2hlIGZvdW5kIHRoZXJlLlwiLFxuXHRcdFx0XHRcdFx0XCI8YnIgLz48YnIgLz5cIixcblx0XHRcdFx0XHRcdFwiQSBteXN0ZXJpb3VzIGNvbm5lY3Rpb24gZHJldyBPbGl2aWEgdG8gdGhlIGFyZW5hIG9mIG1ldGFsIGFuZCBjb2RlLCBhbmQgc2hlIHJlYWNoZWQgb3V0IHRvIGpvaW4gdGhlIHJhbmtzLlwiLFxuXHRcdFx0XHRcdFx0XCJXaXRoIGEgd2VsY29taW5nIHNtaWxlLCBKb3NoIHVzaGVyZWQgaGVyIGludG8gaGlzIHdvcmxkLCBhbmQgc2hlIHF1aWNrbHkgZm91bmQgaGVyIHBsYWNlIHdpdGhpbiB0aGUgY2x1Yi5cIixcblx0XHRcdFx0XHRcdFwiRnJvbSB0aGUgZnVzaW9uIG9mIGdlYXJzIGFuZCBwcm9zZSwgYSBjYW1hcmFkZXJpZSB3YXMgYm9ybiwgYW5kIHRoZXkgd2VyZSBlbnR3aW5lZCBhcyBmYXN0IGZyaWVuZHMuXCIsXG5cdFx0XHRcdFx0XHRcIjxiciAvPjxiciAvPlwiLFxuXHRcdFx0XHRcdFx0XCJJbiB0aGUgZGFuY2Ugb2YgbGlmZSwgdGhlaXIgY29ubmVjdGlvbiBldm9sdmVkLCBmbG91cmlzaGluZyBpbnRvIGEgcm9tYW5jZSB0aGF0IGJsb3Nzb21lZCB3aXRoIHNoYXJlZCBwYXNzaW9uc1wiLFxuXHRcdFx0XHRcdFx0XCItIGNoZXNzLCB2aWRlbyBnYW1lcywgc25vd2JvYXJkaW5nLCBhbmQsIGFib3ZlIGFsbCwgcm9ib3RpY3MuIFRoZWlyIGxvdmUgd2FzIGEgdmludGFnZSBibGVuZCwgbWF0dXJpbmcgYW5kXCIsXG5cdFx0XHRcdFx0XHRcImRlZXBlbmluZyBsaWtlIGEgcmljaCB3aW5lLlwiLFxuXHRcdFx0XHRcdFx0XCI8YnIgLz48YnIgLz5cIixcblx0XHRcdFx0XHRcdFwiVXBvbiB0aGUgMjl0aCBvZiBKYW51YXJ5LCAyMDIyLCBvbiBhIGJlYXV0aWZ1bCBzdGFycnkgbmlnaHQgaW4gTWV4aWNvJ3Mgd2FybSBlbWJhcmNlLCBhbWlkIGEgcGxheWZ1bCBkZWJhdGUgYWJvdXQgdGhlIGNvbnN0ZWxsYXRpb25cIixcblx0XHRcdFx0XHRcdFwiT3Jpb24sIEpvc2ggc2Vuc2VkIGEgbW9tZW50IHJpcGUgdG8gdGFrZSBhIGxvdmVyJ3MgY2hhbmNlIHRvIHNlbmQgdGhlaXIgcmVsYXRpb25zaGlwIHRvIHRoZSBuZXh0IGxldmVsLlwiLFxuXHRcdFx0XHRcdFx0XCJcXFwiSXQncyB3cml0dGVuIGluIHRoZSBzdGFycyxcXFwiIGhlIG11c2VkLiBBbmQgYXMgaGUgc3Bva2UsIGEgc2hvb3Rpbmcgc3RhciBmbGV3IGFjY3Jvc3MgdGhlIHNreSBhbmQgdGhyb3VnaCB0aGUgYmVsdCBvZiBPcmlvbi5cIixcblx0XHRcdFx0XHRcdFwiQSBwcm9mb3VuZCBibGVzc2luZyBmcm9tIHRoZSBoZWF2YW5zLiBBbmQgd2l0aCB0aGUgY29zbW9zIGJlYXJpbmcgd2l0bmVzcyBoZSBnb3QgZG93biBvbiBvbmUga25lZS5cIixcblx0XHRcdFx0XHRcdFwiTm8gcmluZyBpbiBoYW5kIChhcyB0aGUgcHJvcG9zYWwgd2FzIG5vdCBwbGFubmVkKSwgeWV0IGxvdmUncyBpbnRlbnQgbW9zdCBjbGVhcmx5IGJ1cm5lZCwgQSBGZXJyZXJvIFJvY2hlcixcIixcblx0XHRcdFx0XHRcdFwiYSB0b2tlbiByaWNoIGluIG1lYW5pbmcsIHRob3VnaCBpbiBnb2xkIHVud2VpZ2hlZC5cIixcblx0XHRcdFx0XHRcdFwiQSBxdWVzdGlvbiB3YXMgYXNrZWQsIGEgdW5pdmVyc2UgaGVsZCBpdHMgYnJlYXRoLCBhbmQgd2l0aCBqb3lvdXMgY3J5LCBPbGl2aWEgYWNjZXB0ZWQuXCIsXG5cdFx0XHRcdFx0XHRcIjxiciAvPjxiciAvPlwiLFxuXHRcdFx0XHRcdFx0XCJOb3csIHRoZXkgaW52aXRlIHlvdSB0byBiZSBhIHdpdG5lc3MgdG8gYSBjZWxlYnJhdGlvbiBsaWtlIG5vIG90aGVyLCBhIHRlc3RhbWVudCB0byBhIGxvdmUgYm9ybiBmcm9tIGZyaWVuZHNoaXAgYW5kIG51cnR1cmVkIHRocm91Z2hcIixcblx0XHRcdFx0XHRcdFwic2hhcmVkIGRyZWFtcy4gSm9pbiB0aGVtIGluIHRvYXN0aW5nIHRvIGEgbG92ZSBcXFwid3JpdHRlbiBpbiB0aGUgc3RhcnMsXFxcIiBhIGxvdmUgdGhhdCB0cmFuc2NlbmRzIG9yZGluYXJ5IGJvdW5kcyxcIixcblx0XHRcdFx0XHRcdFwiYSBsb3ZlIHRoYXQgaXMgdGhlaXIgZXRlcm5hbCBwcm9taXNlLlwiXS5qb2luKFwiIFwiKSlcblx0XHRcdFx0KS5jbGFzcyhcIm92ZXJsYXlcIilcblx0XHRcdCkucmVmKFwiY29udGFpbmVyXCIpLmNsYXNzKFwic2VjdGlvbi1jb250YWluZXJcIilcblx0XHQpO1xuXHR9XG5cblx0c3R5bGUoY3NzOiBJRG90Q3NzKXtcblx0XHRzdXBlci5zdHlsZShjc3MpO1xuXG5cdFx0Y3NzKFwiLnNlY3Rpb24tY29udGFpbmVyXCIpXG5cdFx0XHQvLyAuaGVpZ2h0KDUwMClcblx0XHRcdC53aWR0aFAoMTAwKTtcblx0XHRcblx0XHRjc3MoXCIub3ZlcmxheVwiKVxuXHRcdFx0Ly8gLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcblx0XHRcdC8vIC50b3AoMClcblx0XHRcdC8vIC5sZWZ0KDApXG5cdFx0XHQvLyAucmlnaHQoMClcblx0XHRcdC8vIC5ib3R0b20oMClcblx0XHRcdC8vIC5kaXNwbGF5KFwiZmxleFwiKVxuXHRcdFx0Ly8gLmZsZXhEaXJlY3Rpb24oXCJjb2x1bW5cIilcblx0XHRcdC8vIC5hbGlnbkl0ZW1zKFwiY2VudGVyXCIpXG5cdFx0XHQvLyAuanVzdGlmeUNvbnRlbnQoXCJjZW50ZXJcIilcblx0XHRcdC8vIC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcblx0XHRcdC8vIC56SW5kZXgoMilcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMCwwLDAsMC4zKVxuXHRcdFx0LnBhZGRpbmcoMjApXG5cdFx0XHQvLyAuYmFja2Ryb3BGaWx0ZXIoZiA9PiBmLmJsdXIoMykpO1xuXHRcdFxuXHRcdGNzcyhcIi5vdmVybGF5IGgxXCIpXG5cdFx0XHQuZm9udFNpemVFbSgyLjUpXG5cdFx0XHQuY29sb3IoXCJ3aGl0ZVwiKVxuXHRcdFx0Lm1hcmdpbigwKTtcblxuXHRcdGNzcyh0aGlzLiRyZWZzLnNtYWxsSW1hZ2UpXG5cdFx0XHQud2lkdGgoMjAwKVxuXHRcdFx0LmhlaWdodCgyMDApXG5cdFx0XHQuYm9yZGVyUmFkaXVzKDEwMClcblx0XHRcdC5mbG9hdChcInJpZ2h0XCIpXG5cdH1cbn0iLCJpbXBvcnQgeyBEb3RDb21wb25lbnQsIElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5pbXBvcnQgTWFpblNlY3Rpb24gZnJvbSBcIi4vbWFpbi1zZWN0aW9uXCI7XG5pbXBvcnQgU3RhcnlCZyBmcm9tIFwiLi4vY29tcG9uZW50cy9zdGFyeS1iZ1wiO1xuaW1wb3J0IFJzdnBTZWN0aW9uIGZyb20gXCIuL3JzdnAtc2VjdGlvblwiO1xuaW1wb3J0IEFib3V0VGhlQ291cGxlIGZyb20gXCIuL2Fib3V0LXRoZS1jb3VwbGVcIjtcbmltcG9ydCBVbnN1YnNjcmliZVBhbmUgZnJvbSBcIi4vcnN2cC1zdHVmZi91bnN1YnNjcmliZS1wYW5lXCI7XG5pbXBvcnQgQ29uZmlybWF0aW9uUGFuZSBmcm9tIFwiLi9yc3ZwLXN0dWZmL2NvbmZpcm1hdGlvbi1wYW5lXCI7XG5cbmVudW0gU0laRV9NT0RFIHtcblx0REVTS1RPUCxcblx0TU9CSUxFXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIERvdENvbXBvbmVudHtcblx0cHJvcHMgPSB7XG5cdFx0c2l6ZU1vZGU6IFNJWkVfTU9ERS5ERVNLVE9QIGFzIFNJWkVfTU9ERVxuXHR9XG5cdG1haW5TZWN0aW9uOiBNYWluU2VjdGlvbjtcblxuXHRidWlsZGVyKCl7XG5cdFx0dGhpcy5tYWluU2VjdGlvbiA9IG5ldyBNYWluU2VjdGlvbigpO1xuXHRcdHRoaXMucmVzaXplKCk7XG5cblx0XHRjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG5cdFx0Y29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG5cdFx0Y29uc3QgcGFyYW1WYWx1ZSA9IHVybFBhcmFtcy5nZXQoXCJpbnZpdGVcIik7XG5cdFx0XG5cdFx0cmV0dXJuIGRvdC5kaXYoXG5cblx0XHRcdGRvdC53aGVuKCghIXBhcmFtVmFsdWUpIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN0YXJ0c1dpdGgoXCIjY29uZmlybV9cIikgfHwgd2luZG93LmxvY2F0aW9uLmhhc2guc3RhcnRzV2l0aChcIiNpbnZpdGVfXCIpIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN0YXJ0c1dpdGgoXCIjZGVjbGluZV9cIiksICgpPT57XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlybWF0aW9uUGFuZSgpO1xuXHRcdFx0fSlcblx0XHRcdC5vdGhlcndpc2VXaGVuKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN0YXJ0c1dpdGgoXCIjdW5zdWJzY3JpYmVfXCIpLCAoKT0+e1xuXHRcdFx0XHRyZXR1cm4gbmV3IFVuc3Vic2NyaWJlUGFuZSgpO1xuXHRcdFx0fSlcblx0XHRcdC5vdGhlcndpc2UoKCk9Pntcblx0XHRcdFx0cmV0dXJuIGRvdC5oKHRoaXMubWFpblNlY3Rpb24pXG5cdFx0XHRcdFx0LmgobmV3IFJzdnBTZWN0aW9uKCkpXG5cdFx0XHRcdFx0LmgobmV3IEFib3V0VGhlQ291cGxlKCkpO1xuXHRcdFx0fSlcblxuXHRcdCkucmVmKFwiY29udGFpbmVyXCIpXG5cdFx0LmNsYXNzKHtcblx0XHRcdFwibW9iaWxlLWNvbnRlbnRcIjogKCk9PiB0aGlzLnByb3BzLnNpemVNb2RlID09IFNJWkVfTU9ERS5NT0JJTEUsXG5cdFx0XHRcImRlc2t0b3AtY29udGVudFwiOiAoKT0+IHRoaXMucHJvcHMuc2l6ZU1vZGUgPT0gU0laRV9NT0RFLkRFU0tUT1Bcblx0XHR9KVxuXHR9XG5cblx0c3R5bGUoY3NzOiBJRG90Q3NzKXtcblxuXHRcdGNzcyh0aGlzLiRyZWZzLmNvbnRhaW5lcilcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDcwLDU1LDAsMC42KVxuXHRcdFx0Ly8gLmJhY2tncm91bmRDb2xvcigyMDAsMTcwLDUwLDAuNilcblx0XHRcdC5ib3JkZXJSYWRpdXMoMTApXG5cdFx0XHQubWFyZ2luVG9wKDApXG5cdFx0XHQubWFyZ2luQm90dG9tKDApXG5cdFx0XHQubWFyZ2luTGVmdChcImF1dG9cIilcblx0XHRcdC5tYXJnaW5SaWdodChcImF1dG9cIilcblx0XHRcdC5wYWRkaW5nKDMwKVxuXHRcdFx0LndpZHRoUCg3MClcblx0XHRcdC5tYXhXaWR0aCgxMjAwKVxuXHRcdFx0LnpJbmRleCgyKVxuXHRcdFx0LmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKTtcblx0XHRcdC8vIC5vcGFjaXR5KClcblxuXHRcdGNzcyhcIi5tb2JpbGUtY29udGVudFwiKVxuXHRcdFx0LndpZHRoUCgxMDApXG5cdFx0XHQucGFkZGluZygwKVxuXHRcdFx0LnBhZGRpbmdUb3AoMTUpXG5cdFx0XHQvLyAubWFyZ2luTGVmdCgtMTUpXG5cdFx0XHQvLyAubWFyZ2luUmlnaHQoLTE1KVxuXHR9XG5cblx0cmVzaXplKCl7XG5cdFx0Ly8gbGV0IGNvbnRlbnRQYW5lbCA9IHRoaXMuJHJlZnMuY29udGFpbmVyO1xuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjgpIHtcblx0XHRcdHRoaXMucHJvcHMuc2l6ZU1vZGUgPSBTSVpFX01PREUuTU9CSUxFO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnByb3BzLnNpemVNb2RlID0gU0laRV9NT0RFLkRFU0tUT1A7XG5cdFx0fVxuXG5cdFx0dGhpcy5tYWluU2VjdGlvbi5yZXNpemUoKTtcblx0fVxuXG5cdHJlYWR5KCk6IHZvaWQge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpPT50aGlzLnJlc2l6ZSgpKTtcblx0fVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==