"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_d"],{

/***/ "./src/home/date-widget.ts":
/*!*********************************!*\
  !*** ./src/home/date-widget.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class DateWidget extends dothtml_1.DotComponent {
    builder() {
        return dothtml_1.dot.table(dothtml_1.dot.tr(dothtml_1.dot
            .td("3:45 PM").class("td1")
            .td("Jan 13").class("td2")
            .td("2024").class("td3")));
    }
    style(css) {
        css("table")
            .width('auto')
            .marginLeft(0)
            .marginRight(0)
            .borderCollapse('collapse')
            .textAlign('center');
        css("td").padding(16);
        css(".td1")
            .fontSize(24)
            .color("#DDD")
            .borderRight("3px solid #EB3");
        css(".td2")
            .fontSize(42)
            .color("#EEE")
            .borderRight("3px solid #EB3");
        css(".td3")
            .fontSize(24)
            .color("#DDD");
    }
}
exports["default"] = DateWidget;


/***/ }),

/***/ "./src/home/main-section.ts":
/*!**********************************!*\
  !*** ./src/home/main-section.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const main_image_jpg_1 = __importDefault(__webpack_require__(/*! ../assets/images/main-image.jpg */ "./src/assets/images/main-image.jpg"));
const event_details_1 = __importDefault(__webpack_require__(/*! ../event-details */ "./src/event-details.ts"));
const date_widget_1 = __importDefault(__webpack_require__(/*! ./date-widget */ "./src/home/date-widget.ts"));
const CURSIVE_FONT = "Script MT, Segoe script, Rage, Lucida Handwriting, cursive, Satisfy";
const WEDDING_DATE = event_details_1.default.date;
function countdownToDate(targetDate = WEDDING_DATE) {
    const now = new Date();
    const timeDifference = (targetDate - now);
    // Convert difference in milliseconds to days
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / (24));
    return days > 0 ? `${days} DAYS` : ((days == 0 && hours >= 0) ? `${hours % 24} HOURS` : null);
}
class MainSection extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            countdown: countdownToDate()
        };
    }
    builder() {
        // Extracting and formatting the date and time from WEDDING_DATE
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div().class("wedding-bg")
            .div(dothtml_1.dot.h1("Josh and Olivia").ref("names")
            // .p("Special Day").ref("specialDay")
            .p("Join us in counting down to our special moment.").class("subheading")
            .br()
            .br()
            .div(dothtml_1.dot.span(() => this.props.countdown).ref("countdown")).id("countdown")
            .br()
            .br()
            .div(new date_widget_1.default())).class("overlay")).class("section-container"));
    }
    style(css) {
        super.style(css);
        css(".section-container")
            // .position("absolute")
            .position("relative")
            .height(1000)
            .widthP(100)
            .overflow("hidden");
        // .zIndex();
        css(".wedding-bg")
            .widthP(100)
            .height(1000)
            // .height("auto")
            .position("absolute")
            .topP(50)
            .backgroundImage(main_image_jpg_1.default)
            .backgroundPosition("50% 50%")
            .backgroundRepeat("no-repeat")
            .backgroundSize("cover")
            .transform(t => t.translateYP(-50));
        css(".overlay")
            .position("absolute")
            .top(0)
            .left(0)
            .right(0)
            .bottom(0)
            .backgroundColor(0, 0, 0, 0.6)
            .padding(20)
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
            .justifyContent("center")
            .textAlign("center")
            // .backdropFilter(f => f.blur(3))
            .transition("opacity 2s ease-in-out")
            .opacity(0);
        setTimeout(() => {
            css(".overlay").opacity(1);
        }, 1000);
        css(".subheading")
            .color("white")
            .fontWeight("300")
            .fontFamily(CURSIVE_FONT)
            .fontSizeEm(1.3);
        css(".wedding-date")
            .color("white")
            .marginTop(15)
            .fontWeight("bold")
            .fontSizeEm(2);
        css(this.$refs.countdown)
            .color(100, 100, 255)
            .fontFamily("consolas")
            .marginTop(15)
            .marginBottom(15)
            .marginLeft(0)
            .marginRight(0)
            .fontSizeEm(5);
        css(this.$refs.names)
            .fontSizeEm(8)
            .color("#EB3")
            // .background("linear-gradient(45deg, #000000, #221100, #000000)")
            .padding(20)
            .borderRadius(30)
            // .backdropFilter(f => f.blur(2))
            // .background("#000")
            .backgroundClip("text")
            .opacity(0.6)
            .margin(0)
            .fontFamily("faradila")
            .textShadow("2px 2px 2px rgba(0, 0, 0, 0.5)");
    }
    resize() {
        // // let contentPanel = this.$refs.container;
        // if (window.innerWidth <= 768) {
        // 	this.props.sizeMode = SIZE_MODE.MOBILE;
        // } else {
        // 	this.props.sizeMode = SIZE_MODE.DESKTOP;
        // }
        // this.mainSection.resize();
    }
    ready() {
        setInterval(() => {
            this.props.countdown = countdownToDate();
        }, 1000 * 60);
    }
}
exports["default"] = MainSection;


/***/ }),

/***/ "./src/home/page-section.ts":
/*!**********************************!*\
  !*** ./src/home/page-section.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class PageSection extends dothtml_1.DotComponent {
    builder(content) {
        return dothtml_1.dot.div(content).class("page-section");
    }
    style(css) {
        css(".page-section")
            .position("relative")
            .widthP(100)
            .overflow("hidden");
        // .border("5px solid red");
    }
}
exports["default"] = PageSection;


/***/ }),

/***/ "./src/home/rsvp-section.ts":
/*!**********************************!*\
  !*** ./src/home/rsvp-section.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const THREE = __importStar(__webpack_require__(/*! three */ "./node_modules/three/build/three.cjs"));
const simplex_1 = __importDefault(__webpack_require__(/*! ../scripts/simplex */ "./src/scripts/simplex.ts"));
let scene, camera, renderer;
let pillars = [];
let noise = (0, simplex_1.default)(50);
// 1. Initialization:
function initThreeScene(container) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 7;
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    dothtml_1.dot.css(renderer.domElement)
        .position("absolute")
        .top(0)
        .left(0)
        .zIndex(1);
    const light = new THREE.PointLight(0xffffff, 100, 500);
    light.position.set(5, 10, 10);
    scene.add(light);
    // 2. Creating Hexagonal Pillars:
    const radiusTop = 1;
    const bevel = 0.05;
    const radiusBottom = 1;
    const height = 10;
    const radialSegments = 6; // hexagon
    const hexGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, undefined, true);
    const surfaceGeometry = new THREE.CircleGeometry(radiusTop - bevel, radialSegments);
    const coneGeometry = new THREE.CylinderGeometry(radiusTop - bevel, radiusBottom, bevel, radialSegments, undefined, true);
    const mainMaterial = new THREE.MeshStandardMaterial({
        color: 0x707070,
        metalness: 0.7,
        roughness: 0.2,
        flatShading: true
    });
    const bevelMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0C080,
        metalness: 0.7,
        roughness: 0.2
    });
    let pillarRows = 10; // adjust for desired number of pillars
    let pillarCols = 8; // adjust for desired number of pillars
    for (let i = 0; i < pillarRows; i++) {
        for (let j = 0; j < pillarCols; j++) {
            let pillar = new THREE.Group();
            let mainPart = new THREE.Mesh(hexGeometry, mainMaterial);
            let topPart = new THREE.Mesh(coneGeometry, bevelMaterial);
            let surfacePart = new THREE.Mesh(surfaceGeometry, mainMaterial);
            pillar.add(mainPart);
            pillar.add(topPart);
            pillar.add(surfacePart);
            topPart.position.y = height / 2 + bevel / 2;
            surfacePart.position.y = height / 2 + bevel;
            surfacePart.rotation.x = -Math.PI / 2;
            surfacePart.rotation.z = -Math.PI / 2;
            // pillar.position.y = Math.random() * 0.5 - 0.25; // random offset
            pillar.position.x = (i - pillarRows / 2) * 1.7; // adjust for spacing
            pillar.position.z = (j - pillarCols / 2) * 1.8 + (i % 2 ? 1 : 0); // adjust for spacing
            pillar.rotation.y = Math.PI / 2;
            pillars.push(pillar);
            scene.add(pillar);
        }
    }
}
function onWindowResize(container) {
    // Update camera's aspect ratio
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    // Update renderer size
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}
let originalNow = Date.now() / 1000;
function animate() {
    requestAnimationFrame(animate);
    // Animate pillars here if necessary
    // Example: pillars[0].position.y += 0.01;
    let now = Date.now() / 1000;
    for (let i = 0; i < pillars.length; i++) {
        let p = pillars[i];
        let y = noise(p.position.x, (now - originalNow) / 1000, p.position.z);
        p.position.y = y;
    }
    renderer.render(scene, camera);
}
class RsvpSection extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {};
    }
    builder() {
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.h1("RSVP")
            .p("The wedding is booked for January 13 in Toronto. Invitations have been sent out already and are locked in.<br />To view event details, use the personal link in your invitation.")).class("overlay")).ref("container").class("section-container"));
    }
    style(css) {
        super.style(css);
        css(".section-container")
            .height(400)
            .widthP(100);
        css(".overlay")
            .position("absolute")
            .top(0)
            .left(0)
            .right(0)
            .bottom(0)
            .backgroundColor(0, 0, 0, 0.5)
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
            .justifyContent("center")
            .textAlign("center")
            .zIndex(2)
            .backdropFilter(f => f.blur(3));
        css(".overlay h1")
            .fontSizeEm(2.5)
            .color("white")
            .margin(0);
    }
    ready() {
        initThreeScene(this.$refs.container);
        // initThreeScene(document.body as HTMLDivElement);
        window.addEventListener('resize', () => {
            onWindowResize(this.$refs.container);
        });
        // Hack because mobile devices misbehave sometimes.
        let lastWidth = this.$refs.container.offsetWidth;
        setInterval(() => {
            let newWidth = this.$refs.container.offsetWidth;
            if (newWidth != lastWidth) {
                lastWidth = newWidth;
                onWindowResize(this.$refs.container);
            }
        }, 500); // every second
        animate();
    }
}
exports["default"] = RsvpSection;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzthQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRCxLQUFLO1FBQ0osY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBMkIsQ0FBQyxDQUFDO1FBQ3ZELG1EQUFtRDtRQUVuRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUN0QyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUEyQixDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQsSUFBSSxTQUFTLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUE0QixDQUFDLFdBQVcsQ0FBQztRQUNyRSxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksUUFBUSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBNEIsQ0FBQyxXQUFXLENBQUM7WUFDcEUsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUN4QixTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUEyQixDQUFDLENBQUM7YUFDdkQ7UUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBRXhCLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNEO0FBbkVELGlDQW1FQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL2RhdGUtd2lkZ2V0LnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL21haW4tc2VjdGlvbi50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9wYWdlLXNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zZWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVdpZGdldCBleHRlbmRzIERvdENvbXBvbmVudHtcblx0YnVpbGRlcigpOiBJRG90RWxlbWVudCB7XG5cblx0XHRyZXR1cm4gZG90LnRhYmxlKFxuXHRcdFx0ZG90LnRyKFxuXHRcdFx0XHRkb3Rcblx0XHRcdFx0XHQudGQoXCIzOjQ1IFBNXCIpLmNsYXNzKFwidGQxXCIpXG5cdFx0XHRcdFx0LnRkKFwiSmFuIDEzXCIpLmNsYXNzKFwidGQyXCIpXG5cdFx0XHRcdFx0LnRkKFwiMjAyNFwiKS5jbGFzcyhcInRkM1wiKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHRzdHlsZShjc3M6IElEb3RDc3Mpe1xuXHRcdGNzcyhcInRhYmxlXCIpXG5cdFx0XHQud2lkdGgoJ2F1dG8nKVxuXHRcdFx0Lm1hcmdpbkxlZnQoMClcblx0XHRcdC5tYXJnaW5SaWdodCgwKVxuXHRcdFx0LmJvcmRlckNvbGxhcHNlKCdjb2xsYXBzZScpXG5cdFx0XHQudGV4dEFsaWduKCdjZW50ZXInKTtcblxuXHRcdGNzcyhcInRkXCIpLnBhZGRpbmcoMTYpO1xuXHRcdFxuXHRcdGNzcyhcIi50ZDFcIilcblx0XHRcdC5mb250U2l6ZSgyNClcblx0XHRcdC5jb2xvcihcIiNERERcIilcblx0XHRcdC5ib3JkZXJSaWdodChcIjNweCBzb2xpZCAjRUIzXCIpXG5cdFx0Y3NzKFwiLnRkMlwiKVxuXHRcdFx0LmZvbnRTaXplKDQyKVxuXHRcdFx0LmNvbG9yKFwiI0VFRVwiKVxuXHRcdFx0LmJvcmRlclJpZ2h0KFwiM3B4IHNvbGlkICNFQjNcIilcblx0XHRjc3MoXCIudGQzXCIpXG5cdFx0XHQuZm9udFNpemUoMjQpXG5cdFx0XHQuY29sb3IoXCIjREREXCIpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBJRG90Q3NzLCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuL3BhZ2Utc2VjdGlvblwiO1xuaW1wb3J0IG1haW5JbWFnZSBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9tYWluLWltYWdlLmpwZ1wiO1xuaW1wb3J0IEVWRU5UX0RFVEFJTFMgZnJvbSBcIi4uL2V2ZW50LWRldGFpbHNcIjtcbmltcG9ydCBEYXRlV2lkZ2V0IGZyb20gXCIuL2RhdGUtd2lkZ2V0XCI7XG5cbmNvbnN0IENVUlNJVkVfRk9OVCA9IFwiU2NyaXB0IE1ULCBTZWdvZSBzY3JpcHQsIFJhZ2UsIEx1Y2lkYSBIYW5kd3JpdGluZywgY3Vyc2l2ZSwgU2F0aXNmeVwiO1xuXG5jb25zdCBXRURESU5HX0RBVEUgPSBFVkVOVF9ERVRBSUxTLmRhdGU7XG5cbmZ1bmN0aW9uIGNvdW50ZG93blRvRGF0ZSh0YXJnZXREYXRlID0gV0VERElOR19EQVRFKTogc3RyaW5nIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHRpbWVEaWZmZXJlbmNlID0gKCh0YXJnZXREYXRlIGFzIGFueSkgLSAobm93IGFzIGFueSkpIGFzIG51bWJlcjtcbiAgICBcbiAgICAvLyBDb252ZXJ0IGRpZmZlcmVuY2UgaW4gbWlsbGlzZWNvbmRzIHRvIGRheXNcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodGltZURpZmZlcmVuY2UgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihob3VycyAvICgyNCkpO1xuICAgIFxuICAgIHJldHVybiBkYXlzID4gMCA/IGAke2RheXN9IERBWVNgIDogKChkYXlzID09IDAgJiYgaG91cnMgPj0gMCkgPyBgJHtob3VycyAlIDI0fSBIT1VSU2AgOiBudWxsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNlY3Rpb24gZXh0ZW5kcyBQYWdlU2VjdGlvbntcblxuXHRwcm9wcyA9IHtcblx0XHRjb3VudGRvd246IGNvdW50ZG93blRvRGF0ZSgpXG5cdH1cblxuXHRidWlsZGVyKCl7XG5cblx0XHQvLyBFeHRyYWN0aW5nIGFuZCBmb3JtYXR0aW5nIHRoZSBkYXRlIGFuZCB0aW1lIGZyb20gV0VERElOR19EQVRFXG5cdFx0Y29uc3QgZGF0ZU9wdGlvbnMgPSB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfTtcblx0XHRjb25zdCB0aW1lT3B0aW9ucyA9IHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JywgdGltZVpvbmVOYW1lOiAnc2hvcnQnIH07XG5cdFx0XG5cblx0XHRyZXR1cm4gc3VwZXIuYnVpbGRlcihcblx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdGRvdC5kaXYoKS5jbGFzcyhcIndlZGRpbmctYmdcIilcblx0XHRcdFx0LmRpdihcblx0XHRcdFx0XHRkb3QuaDEoXCJKb3NoIGFuZCBPbGl2aWFcIikucmVmKFwibmFtZXNcIilcblx0XHRcdFx0XHQvLyAucChcIlNwZWNpYWwgRGF5XCIpLnJlZihcInNwZWNpYWxEYXlcIilcblx0XHRcdFx0XHQucChcIkpvaW4gdXMgaW4gY291bnRpbmcgZG93biB0byBvdXIgc3BlY2lhbCBtb21lbnQuXCIpLmNsYXNzKFwic3ViaGVhZGluZ1wiKVxuXHRcdFx0XHRcdC5icigpXG5cdFx0XHRcdFx0LmJyKClcblx0XHRcdFx0XHQuZGl2KFxuXHRcdFx0XHRcdFx0ZG90LnNwYW4oKCk9PnRoaXMucHJvcHMuY291bnRkb3duKS5yZWYoXCJjb3VudGRvd25cIilcblx0XHRcdFx0XHQpLmlkKFwiY291bnRkb3duXCIpXG5cdFx0XHRcdFx0LmJyKClcblx0XHRcdFx0XHQuYnIoKVxuXHRcdFx0XHRcdC5kaXYobmV3IERhdGVXaWRnZXQoKSlcblx0XHRcdFx0KS5jbGFzcyhcIm92ZXJsYXlcIilcblx0XHRcdCkuY2xhc3MoXCJzZWN0aW9uLWNvbnRhaW5lclwiKVxuXHRcdCk7XG5cdH1cblxuXHRzdHlsZShjc3M6IElEb3RDc3Mpe1xuXHRcdHN1cGVyLnN0eWxlKGNzcyk7XG5cdFx0Y3NzKFwiLnNlY3Rpb24tY29udGFpbmVyXCIpXG5cdFx0XHQvLyAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuXHRcdFx0LnBvc2l0aW9uKFwicmVsYXRpdmVcIilcblx0XHRcdC5oZWlnaHQoMTAwMClcblx0XHRcdC53aWR0aFAoMTAwKVxuXHRcdFx0Lm92ZXJmbG93KFwiaGlkZGVuXCIpXG5cdFx0XHQvLyAuekluZGV4KCk7XG5cblx0XHRjc3MoXCIud2VkZGluZy1iZ1wiKVxuXHRcdFx0LndpZHRoUCgxMDApXG5cdFx0XHQuaGVpZ2h0KDEwMDApXG5cdFx0XHQvLyAuaGVpZ2h0KFwiYXV0b1wiKVxuXHRcdFx0LnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcblx0XHRcdC50b3BQKDUwKVxuXHRcdFx0LmJhY2tncm91bmRJbWFnZShtYWluSW1hZ2UgYXMgYW55KVxuXHRcdFx0LmJhY2tncm91bmRQb3NpdGlvbihcIjUwJSA1MCVcIilcblx0XHRcdC5iYWNrZ3JvdW5kUmVwZWF0KFwibm8tcmVwZWF0XCIpXG5cdFx0XHQuYmFja2dyb3VuZFNpemUoXCJjb3ZlclwiKVxuXHRcdFx0LnRyYW5zZm9ybSh0ID0+IHQudHJhbnNsYXRlWVAoLTUwKSk7XG5cdFx0XG5cdFx0Y3NzKFwiLm92ZXJsYXlcIilcblx0XHRcdC5wb3NpdGlvbihcImFic29sdXRlXCIpXG5cdFx0XHQudG9wKDApXG5cdFx0XHQubGVmdCgwKVxuXHRcdFx0LnJpZ2h0KDApXG5cdFx0XHQuYm90dG9tKDApXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDAsMCwwLDAuNilcblx0XHRcdC5wYWRkaW5nKDIwKVxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXG5cdFx0XHQuZmxleERpcmVjdGlvbihcImNvbHVtblwiKVxuXHRcdFx0LmFsaWduSXRlbXMoXCJjZW50ZXJcIilcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcImNlbnRlclwiKVxuXHRcdFx0LnRleHRBbGlnbihcImNlbnRlclwiKVxuXHRcdFx0Ly8gLmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKVxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDJzIGVhc2UtaW4tb3V0XCIpXG5cdFx0XHQub3BhY2l0eSgwKTtcblxuXHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdGNzcyhcIi5vdmVybGF5XCIpLm9wYWNpdHkoMSk7XG5cdFx0fSwgMTAwMCk7XG5cblx0XHRjc3MoXCIuc3ViaGVhZGluZ1wiKVxuXHRcdFx0LmNvbG9yKFwid2hpdGVcIilcblx0XHRcdC5mb250V2VpZ2h0KFwiMzAwXCIpXG5cdFx0XHQuZm9udEZhbWlseShDVVJTSVZFX0ZPTlQpXG5cdFx0XHQuZm9udFNpemVFbSgxLjMpXG5cblx0XHRjc3MoXCIud2VkZGluZy1kYXRlXCIpXG5cdFx0XHQuY29sb3IoXCJ3aGl0ZVwiKVxuXHRcdFx0Lm1hcmdpblRvcCgxNSlcblx0XHRcdC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuXHRcdFx0LmZvbnRTaXplRW0oMilcblxuXHRcdGNzcyh0aGlzLiRyZWZzLmNvdW50ZG93bilcblx0XHRcdC5jb2xvcigxMDAsMTAwLDI1NSlcblx0XHRcdC5mb250RmFtaWx5KFwiY29uc29sYXNcIilcblx0XHRcdC5tYXJnaW5Ub3AoMTUpXG5cdFx0XHQubWFyZ2luQm90dG9tKDE1KVxuXHRcdFx0Lm1hcmdpbkxlZnQoMClcblx0XHRcdC5tYXJnaW5SaWdodCgwKVxuXHRcdFx0LmZvbnRTaXplRW0oNSk7XG5cblx0XHRjc3ModGhpcy4kcmVmcy5uYW1lcylcblx0XHRcdC5mb250U2l6ZUVtKDgpXG5cdFx0XHQuY29sb3IoXCIjRUIzXCIpXG5cdFx0XHQvLyAuYmFja2dyb3VuZChcImxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzIyMTEwMCwgIzAwMDAwMClcIilcblx0XHRcdC5wYWRkaW5nKDIwKVxuXHRcdFx0LmJvcmRlclJhZGl1cygzMClcblx0XHRcdC8vIC5iYWNrZHJvcEZpbHRlcihmID0+IGYuYmx1cigyKSlcblx0XHRcdC8vIC5iYWNrZ3JvdW5kKFwiIzAwMFwiKVxuXHRcdFx0LmJhY2tncm91bmRDbGlwKFwidGV4dFwiKVxuXHRcdFx0Lm9wYWNpdHkoMC42KVxuXHRcdFx0Lm1hcmdpbigwKVxuXHRcdFx0LmZvbnRGYW1pbHkoXCJmYXJhZGlsYVwiKVxuXHRcdFx0LnRleHRTaGFkb3coXCIycHggMnB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNSlcIilcblx0fVxuXG5cdHJlc2l6ZSgpe1xuXHRcdC8vIC8vIGxldCBjb250ZW50UGFuZWwgPSB0aGlzLiRyZWZzLmNvbnRhaW5lcjtcblx0XHQvLyBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNzY4KSB7XG5cdFx0Ly8gXHR0aGlzLnByb3BzLnNpemVNb2RlID0gU0laRV9NT0RFLk1PQklMRTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0dGhpcy5wcm9wcy5zaXplTW9kZSA9IFNJWkVfTU9ERS5ERVNLVE9QO1xuXHRcdC8vIH1cblxuXHRcdC8vIHRoaXMubWFpblNlY3Rpb24ucmVzaXplKCk7XG5cdH1cblxuXHRyZWFkeSgpe1xuXHRcdHNldEludGVydmFsKCgpPT57XG5cdFx0XHR0aGlzLnByb3BzLmNvdW50ZG93biA9IGNvdW50ZG93blRvRGF0ZSgpO1xuXHRcdH0sIDEwMDAqNjApXG5cdH1cbn0iLCJpbXBvcnQgeyBEb3RDb21wb25lbnQsIElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VTZWN0aW9uIGV4dGVuZHMgRG90Q29tcG9uZW50e1xuXG5cdGJ1aWxkZXIoY29udGVudCl7XG5cdFx0cmV0dXJuIGRvdC5kaXYoY29udGVudCkuY2xhc3MoXCJwYWdlLXNlY3Rpb25cIilcblx0fVxuXG5cdHN0eWxlKGNzczogSURvdENzcyl7XG5cdFx0Y3NzKFwiLnBhZ2Utc2VjdGlvblwiKVxuXHRcdFx0LnBvc2l0aW9uKFwicmVsYXRpdmVcIilcblx0XHRcdC53aWR0aFAoMTAwKVxuXHRcdFx0Lm92ZXJmbG93KFwiaGlkZGVuXCIpXG5cdFx0XHQvLyAuYm9yZGVyKFwiNXB4IHNvbGlkIHJlZFwiKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgSURvdENzcywgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcbmltcG9ydCBQYWdlU2VjdGlvbiBmcm9tIFwiLi9wYWdlLXNlY3Rpb25cIjtcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHNpbXBsZXggZnJvbSBcIi4uL3NjcmlwdHMvc2ltcGxleFwiO1xuXG5sZXQgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXI7XG5sZXQgcGlsbGFycyA9IFtdO1xubGV0IG5vaXNlID0gc2ltcGxleCg1MCk7XG5cbi8vIDEuIEluaXRpYWxpemF0aW9uOlxuZnVuY3Rpb24gaW5pdFRocmVlU2NlbmUoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIGNvbnRhaW5lci5vZmZzZXRXaWR0aCAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uLnogPSA3O1xuICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gNztcbiAgICBjYW1lcmEubG9va0F0KDAsIDAsIDApO1xuXG4gICAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcbiAgICByZW5kZXJlci5zZXRTaXplKGNvbnRhaW5lci5vZmZzZXRXaWR0aCwgY29udGFpbmVyLm9mZnNldEhlaWdodCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG5cdGRvdC5jc3MocmVuZGVyZXIuZG9tRWxlbWVudClcblx0XHQucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuXHRcdC50b3AoMClcblx0XHQubGVmdCgwKVxuXHRcdC56SW5kZXgoMSlcblxuICAgIGNvbnN0IGxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDEwMCwgNTAwKTtcbiAgICBsaWdodC5wb3NpdGlvbi5zZXQoNSwgMTAsIDEwKTtcbiAgICBzY2VuZS5hZGQobGlnaHQpO1xuXG4gICAgLy8gMi4gQ3JlYXRpbmcgSGV4YWdvbmFsIFBpbGxhcnM6XG4gICAgY29uc3QgcmFkaXVzVG9wID0gMTtcbiAgICBjb25zdCBiZXZlbCA9IDAuMDU7XG4gICAgY29uc3QgcmFkaXVzQm90dG9tID0gMTsgXG4gICAgY29uc3QgaGVpZ2h0ID0gMTA7IFxuICAgIGNvbnN0IHJhZGlhbFNlZ21lbnRzID0gNjsgLy8gaGV4YWdvblxuICAgIGNvbnN0IGhleEdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkocmFkaXVzVG9wLCByYWRpdXNCb3R0b20sIGhlaWdodCwgcmFkaWFsU2VnbWVudHMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgY29uc3Qgc3VyZmFjZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KHJhZGl1c1RvcCAtIGJldmVsLCByYWRpYWxTZWdtZW50cyk7XG4gICAgY29uc3QgY29uZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkocmFkaXVzVG9wIC0gYmV2ZWwsIHJhZGl1c0JvdHRvbSwgYmV2ZWwsIHJhZGlhbFNlZ21lbnRzLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgY29uc3QgbWFpbk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4NzA3MDcwLFxuICAgICAgICBtZXRhbG5lc3M6IDAuNyxcbiAgICAgICAgcm91Z2huZXNzOiAwLjIsXG5cdFx0ZmxhdFNoYWRpbmc6IHRydWVcbiAgICB9KTtcblxuICAgIGNvbnN0IGJldmVsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhFMEMwODAsXG4gICAgICAgIG1ldGFsbmVzczogMC43LFxuICAgICAgICByb3VnaG5lc3M6IDAuMlxuICAgIH0pO1xuXG4gICAgbGV0IHBpbGxhclJvd3MgPSAxMDsgLy8gYWRqdXN0IGZvciBkZXNpcmVkIG51bWJlciBvZiBwaWxsYXJzXG4gICAgbGV0IHBpbGxhckNvbHMgPSA4OyAvLyBhZGp1c3QgZm9yIGRlc2lyZWQgbnVtYmVyIG9mIHBpbGxhcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpbGxhclJvd3M7IGkrKykge1xuICAgIFx0Zm9yIChsZXQgaiA9IDA7IGogPCBwaWxsYXJDb2xzOyBqKyspIHtcblx0XHRcdGxldCBwaWxsYXIgPSBuZXcgVEhSRUUuR3JvdXAoKTtcblx0XHRcdGxldCBtYWluUGFydCA9IG5ldyBUSFJFRS5NZXNoKGhleEdlb21ldHJ5LCBtYWluTWF0ZXJpYWwpO1xuXHRcdFx0bGV0IHRvcFBhcnQgPSBuZXcgVEhSRUUuTWVzaChjb25lR2VvbWV0cnksIGJldmVsTWF0ZXJpYWwpO1xuXHRcdFx0bGV0IHN1cmZhY2VQYXJ0ID0gbmV3IFRIUkVFLk1lc2goc3VyZmFjZUdlb21ldHJ5LCBtYWluTWF0ZXJpYWwpO1xuXHRcdFx0cGlsbGFyLmFkZChtYWluUGFydCk7XG5cdFx0XHRwaWxsYXIuYWRkKHRvcFBhcnQpO1xuXHRcdFx0cGlsbGFyLmFkZChzdXJmYWNlUGFydCk7XG5cdFx0XHR0b3BQYXJ0LnBvc2l0aW9uLnkgPSBoZWlnaHQgLyAyICsgYmV2ZWwgLyAyO1xuXHRcdFx0c3VyZmFjZVBhcnQucG9zaXRpb24ueSA9IGhlaWdodCAvIDIgKyBiZXZlbDtcblx0XHRcdHN1cmZhY2VQYXJ0LnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG5cdFx0XHRzdXJmYWNlUGFydC5yb3RhdGlvbi56ID0gLU1hdGguUEkgLyAyO1xuXHRcdFx0Ly8gcGlsbGFyLnBvc2l0aW9uLnkgPSBNYXRoLnJhbmRvbSgpICogMC41IC0gMC4yNTsgLy8gcmFuZG9tIG9mZnNldFxuXHRcdFx0cGlsbGFyLnBvc2l0aW9uLnggPSAoaSAtIHBpbGxhclJvd3MgLyAyKSAqIDEuNzsgLy8gYWRqdXN0IGZvciBzcGFjaW5nXG5cdFx0XHRwaWxsYXIucG9zaXRpb24ueiA9IChqIC0gcGlsbGFyQ29scyAvIDIpICogMS44ICsgKGkgJSAyID8gMSA6IDApOyAvLyBhZGp1c3QgZm9yIHNwYWNpbmdcblx0XHRcdHBpbGxhci5yb3RhdGlvbi55ID0gTWF0aC5QSSAvIDI7XG5cdFx0XHRwaWxsYXJzLnB1c2gocGlsbGFyKTtcblx0XHRcdHNjZW5lLmFkZChwaWxsYXIpO1xuXHRcdH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICAvLyBVcGRhdGUgY2FtZXJhJ3MgYXNwZWN0IHJhdGlvXG4gICAgY2FtZXJhLmFzcGVjdCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aCAvIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAgIC8vIFVwZGF0ZSByZW5kZXJlciBzaXplXG4gICAgcmVuZGVyZXIuc2V0U2l6ZShjb250YWluZXIub2Zmc2V0V2lkdGgsIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xufVxuXG5sZXQgb3JpZ2luYWxOb3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgICAvLyBBbmltYXRlIHBpbGxhcnMgaGVyZSBpZiBuZWNlc3NhcnlcbiAgICAvLyBFeGFtcGxlOiBwaWxsYXJzWzBdLnBvc2l0aW9uLnkgKz0gMC4wMTtcblxuXHRsZXQgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDA7XG5cblx0Zm9yKGxldCBpID0gMDsgaSA8IHBpbGxhcnMubGVuZ3RoOyBpKyspe1xuXHRcdGxldCBwID0gcGlsbGFyc1tpXTtcblx0XHRsZXQgeSA9IG5vaXNlKHAucG9zaXRpb24ueCwgKG5vdyAtIG9yaWdpbmFsTm93KSAvIDEwMDAsIHAucG9zaXRpb24ueik7XG5cdFx0cC5wb3NpdGlvbi55ID0geTtcblx0fVxuXG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJzdnBTZWN0aW9uIGV4dGVuZHMgUGFnZVNlY3Rpb257XG5cblx0cHJvcHMgPSB7XG5cdFx0XG5cdH1cblxuXHRidWlsZGVyKCl7XG5cblx0XHRyZXR1cm4gc3VwZXIuYnVpbGRlcihcblx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdGRvdC5kaXYoXG5cdFx0XHRcdFx0ZG90LmgxKFwiUlNWUFwiKVxuXHRcdFx0XHRcdC5wKFwiVGhlIHdlZGRpbmcgaXMgYm9va2VkIGZvciBKYW51YXJ5IDEzIGluIFRvcm9udG8uIEludml0YXRpb25zIGhhdmUgYmVlbiBzZW50IG91dCBhbHJlYWR5IGFuZCBhcmUgbG9ja2VkIGluLjxiciAvPlRvIHZpZXcgZXZlbnQgZGV0YWlscywgdXNlIHRoZSBwZXJzb25hbCBsaW5rIGluIHlvdXIgaW52aXRhdGlvbi5cIilcblx0XHRcdFx0KS5jbGFzcyhcIm92ZXJsYXlcIilcblx0XHRcdCkucmVmKFwiY29udGFpbmVyXCIpLmNsYXNzKFwic2VjdGlvbi1jb250YWluZXJcIilcblx0XHQpO1xuXHR9XG5cblx0c3R5bGUoY3NzOiBJRG90Q3NzKXtcblx0XHRzdXBlci5zdHlsZShjc3MpO1xuXG5cdFx0Y3NzKFwiLnNlY3Rpb24tY29udGFpbmVyXCIpXG5cdFx0XHQuaGVpZ2h0KDQwMClcblx0XHRcdC53aWR0aFAoMTAwKTtcblx0XHRcblx0XHRjc3MoXCIub3ZlcmxheVwiKVxuXHRcdFx0LnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcblx0XHRcdC50b3AoMClcblx0XHRcdC5sZWZ0KDApXG5cdFx0XHQucmlnaHQoMClcblx0XHRcdC5ib3R0b20oMClcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMCwwLDAsMC41KVxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXG5cdFx0XHQuZmxleERpcmVjdGlvbihcImNvbHVtblwiKVxuXHRcdFx0LmFsaWduSXRlbXMoXCJjZW50ZXJcIilcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcImNlbnRlclwiKVxuXHRcdFx0LnRleHRBbGlnbihcImNlbnRlclwiKVxuXHRcdFx0LnpJbmRleCgyKVxuXHRcdFx0LmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKTtcblx0XHRcblx0XHRjc3MoXCIub3ZlcmxheSBoMVwiKVxuXHRcdFx0LmZvbnRTaXplRW0oMi41KVxuXHRcdFx0LmNvbG9yKFwid2hpdGVcIilcblx0XHRcdC5tYXJnaW4oMCk7XG5cblx0fVxuXG5cdHJlYWR5KCk6IHZvaWQge1xuXHRcdGluaXRUaHJlZVNjZW5lKHRoaXMuJHJlZnMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KTtcblx0XHQvLyBpbml0VGhyZWVTY2VuZShkb2N1bWVudC5ib2R5IGFzIEhUTUxEaXZFbGVtZW50KTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cdFx0XHRvbldpbmRvd1Jlc2l6ZSh0aGlzLiRyZWZzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0Ly8gSGFjayBiZWNhdXNlIG1vYmlsZSBkZXZpY2VzIG1pc2JlaGF2ZSBzb21ldGltZXMuXG5cdFx0bGV0IGxhc3RXaWR0aCA9ICh0aGlzLiRyZWZzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkub2Zmc2V0V2lkdGg7XG5cdFx0c2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0bGV0IG5ld1dpZHRoID0gKHRoaXMuJHJlZnMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5vZmZzZXRXaWR0aDtcblx0XHRcdGlmKG5ld1dpZHRoICE9IGxhc3RXaWR0aCl7XG5cdFx0XHRcdGxhc3RXaWR0aCA9IG5ld1dpZHRoO1xuXHRcdFx0XHRvbldpbmRvd1Jlc2l6ZSh0aGlzLiRyZWZzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSwgNTAwKTsgLy8gZXZlcnkgc2Vjb25kXG5cblx0XHRhbmltYXRlKCk7XG5cdH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=