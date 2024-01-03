"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_index_ts-33bc321d"],{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
// import "./styles/fonts.css";
const Precious_ttf_1 = __importDefault(__webpack_require__(/*! ./assets/fonts/Precious.ttf */ "./src/assets/fonts/Precious.ttf"));
const preciousFontFace = new FontFace("precious", `url(${Precious_ttf_1.default})`);
preciousFontFace.load().then(f => {
    document.fonts.add(f);
});
const faradila_ttf_1 = __importDefault(__webpack_require__(/*! ./assets/fonts/faradila.ttf */ "./src/assets/fonts/faradila.ttf"));
const faradilaFontFace = new FontFace("faradila", `url(${faradila_ttf_1.default})`);
faradilaFontFace.load().then(f => {
    document.fonts.add(f);
});
// orbitronFont.load().then((loadedFont) => {
// 	document.fonts.add(loadedFont);
// });
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const app_1 = __importDefault(__webpack_require__(/*! ./home/app */ "./src/home/app.ts"));
const stary_bg_1 = __importDefault(__webpack_require__(/*! ./components/stary-bg */ "./src/components/stary-bg.ts"));
// import Splash from "./components/splash";
(0, dothtml_1.dot)("body")
    .h(new stary_bg_1.default())
    .h(new app_1.default());
dothtml_1.dot.css("body")
    .margin(0)
    .padding(0)
    .paddingTop(50)
    .paddingBottom(50)
    .backgroundColor(0)
    .fontFamily("Arial, sans-serif")
    .color("white");


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaW5kZXhfdHMtMzNiYzMyMWQuMWNkYTE2ZDUwMzc1MTY0MjYwZjkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwRUFBNkI7QUFFN0IsK0JBQStCO0FBQy9CLGtJQUFtRDtBQUNuRCxNQUFNLGdCQUFnQixHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLHNCQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUU7SUFDL0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxrSUFBbUQ7QUFDbkQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxzQkFBUSxHQUFHLENBQUMsQ0FBQztBQUN0RSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFFO0lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsNkNBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyxNQUFNO0FBRU4sOEZBQThCO0FBQzlCLDBGQUE2QjtBQUM3QixxSEFBNEM7QUFDNUMsNENBQTRDO0FBRzVDLGlCQUFHLEVBQUMsTUFBTSxDQUFDO0tBQ1QsQ0FBQyxDQUFDLElBQUksa0JBQU8sRUFBRSxDQUFDO0tBQ2hCLENBQUMsQ0FBQyxJQUFJLGFBQUcsRUFBRSxDQUFDLENBQUM7QUFFZixhQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ1YsVUFBVSxDQUFDLEVBQUUsQ0FBQztLQUNkLGFBQWEsQ0FBQyxFQUFFLENBQUM7S0FDakIsZUFBZSxDQUFDLENBQUMsQ0FBQztLQUNsQixVQUFVLENBQUMsbUJBQW1CLENBQUM7S0FDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGVzL3N0eWxlcy5jc3NcIjtcblxuLy8gaW1wb3J0IFwiLi9zdHlsZXMvZm9udHMuY3NzXCI7XG5pbXBvcnQgcHJlY2lvdXMgZnJvbSBcIi4vYXNzZXRzL2ZvbnRzL1ByZWNpb3VzLnR0ZlwiO1xuY29uc3QgcHJlY2lvdXNGb250RmFjZSA9IG5ldyBGb250RmFjZShcInByZWNpb3VzXCIsIGB1cmwoJHtwcmVjaW91c30pYCk7XG5wcmVjaW91c0ZvbnRGYWNlLmxvYWQoKS50aGVuKGY9Pntcblx0ZG9jdW1lbnQuZm9udHMuYWRkKGYpO1xufSk7XG5cbmltcG9ydCBmYXJhZGlsYSBmcm9tIFwiLi9hc3NldHMvZm9udHMvZmFyYWRpbGEudHRmXCI7XG5jb25zdCBmYXJhZGlsYUZvbnRGYWNlID0gbmV3IEZvbnRGYWNlKFwiZmFyYWRpbGFcIiwgYHVybCgke2ZhcmFkaWxhfSlgKTtcbmZhcmFkaWxhRm9udEZhY2UubG9hZCgpLnRoZW4oZj0+e1xuXHRkb2N1bWVudC5mb250cy5hZGQoZik7XG59KTtcblxuLy8gb3JiaXRyb25Gb250LmxvYWQoKS50aGVuKChsb2FkZWRGb250KSA9PiB7XG4vLyBcdGRvY3VtZW50LmZvbnRzLmFkZChsb2FkZWRGb250KTtcbi8vIH0pO1xuXG5pbXBvcnQgeyBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9ob21lL2FwcFwiO1xuaW1wb3J0IFN0YXJ5QmcgZnJvbSBcIi4vY29tcG9uZW50cy9zdGFyeS1iZ1wiO1xuLy8gaW1wb3J0IFNwbGFzaCBmcm9tIFwiLi9jb21wb25lbnRzL3NwbGFzaFwiO1xuXG5cbmRvdChcImJvZHlcIilcblx0LmgobmV3IFN0YXJ5QmcoKSlcblx0LmgobmV3IEFwcCgpKTtcblxuZG90LmNzcyhcImJvZHlcIilcblx0Lm1hcmdpbigwKVxuXHQucGFkZGluZygwKVxuXHQucGFkZGluZ1RvcCg1MClcblx0LnBhZGRpbmdCb3R0b20oNTApXG5cdC5iYWNrZ3JvdW5kQ29sb3IoMClcblx0LmZvbnRGYW1pbHkoXCJBcmlhbCwgc2Fucy1zZXJpZlwiKVxuXHQuY29sb3IoXCJ3aGl0ZVwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=