"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_a"],{

/***/ "./src/assets/fonts/Precious.ttf":
/*!***************************************!*\
  !*** ./src/assets/fonts/Precious.ttf ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/Precious.ttf");

/***/ }),

/***/ "./src/assets/fonts/faradila.ttf":
/*!***************************************!*\
  !*** ./src/assets/fonts/faradila.ttf ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/faradila.ttf");

/***/ }),

/***/ "./src/components/stary-bg.ts":
/*!************************************!*\
  !*** ./src/components/stary-bg.ts ***!
  \************************************/
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
const PIXI = __importStar(__webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.js"));
const simplex_1 = __importDefault(__webpack_require__(/*! ../scripts/simplex */ "./src/scripts/simplex.ts"));
let rNoise = (0, simplex_1.default)(50);
let gNoise = (0, simplex_1.default)(50);
let bNoise = (0, simplex_1.default)(50);
let now = Date.now() / 1000;
function mapLinear(value, a1, a2, b1, b2) {
    return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
}
function generateStarColor() {
    // Random value between 0xC0 and 0xFF
    const randomValue = Math.floor(Math.random() * (0xFF - 0xC0 + 1)) + 0xC0;
    // Randomly decide which channel gets the random value
    const randomChannel = Math.floor(Math.random() * 3);
    let r, g, b;
    switch (randomChannel) {
        case 0: // Red gets the random value
            r = randomValue;
            g = 0xFF;
            b = 0xFF;
            break;
        case 1: // Green gets the random value
            r = 0xFF;
            g = randomValue;
            b = 0xFF;
            break;
        case 2: // Blue gets the random value
            r = 0xFF;
            g = 0xFF;
            b = randomValue;
            break;
    }
    // Combine r, g, and b into a single integer
    return (r << 16) + (g << 8) + b;
}
/**
 * Draw a star shape with an arbitrary number of points.
 * @ignore
 */
class Star extends PIXI.Polygon {
    /**
     * @param x - Center X position of the star
     * @param y - Center Y position of the star
     * @param points - The number of points of the star, must be > 1
     * @param radius - The outer radius of the star
     * @param innerRadius - The inner radius between points, default half `radius`
     * @param rotation - The rotation of the star in radians, where 0 is vertical
     */
    constructor(x, y, points, radius, innerRadius, rotation = 0) {
        innerRadius = innerRadius || radius / 2;
        const startAngle = (-1 * Math.PI / 2) + rotation;
        const len = points * 2;
        const delta = Math.PI * 2 / len;
        const polygon = [];
        for (let i = 0; i < len; i++) {
            const r = i % 2 ? innerRadius : radius;
            const angle = (i * delta) + startAngle;
            polygon.push(x + (r * Math.cos(angle)), y + (r * Math.sin(angle)));
        }
        super(polygon);
    }
}
/**
 * Draw a star shape with an arbitrary number of points.
 *
 * _Note: Only available with **@pixi/graphics-extras**._
 * @method PIXI.Graphics#drawStar
 * @param this
 * @param x - Center X position of the star
 * @param y - Center Y position of the star
 * @param points - The number of points of the star, must be > 1
 * @param radius - The outer radius of the star
 * @param innerRadius - The inner radius between points, default half `radius`
 * @param rotation - The rotation of the star in radians, where 0 is vertical
 * @returns - This Graphics object. Good for chaining method calls
 */
function drawStar(this2, x, y, points, radius, innerRadius, rotation = 0) {
    return this2.drawPolygon(new Star(x, y, points, radius, innerRadius, rotation));
}
function addStars(renderer, starContainer, milkyWayContainer, stars) {
    // Remove existing stars.
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        starContainer.removeChild(star);
    }
    milkyWayContainer.removeChildren();
    // Add milky way.
    // Create a graphics object and draw a circle
    let bgStarGfx = new PIXI.Graphics();
    bgStarGfx.beginFill(0xFFFFFF); // White color for the star
    bgStarGfx.drawCircle(0, 0, 3); // Draw a circle of radius 5 at position (5, 5)
    bgStarGfx.endFill();
    // Generate a texture from the graphics object
    const starTexture = renderer.generateTexture(bgStarGfx);
    let nBgStars = Math.min(10000, 10000 * (window.innerWidth * window.innerHeight / 3489280));
    for (let i = 0; i < nBgStars; i++) {
        let star = new PIXI.Sprite(starTexture);
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        star.alpha = Math.random() * 0.8; // for some variation in brightness
        star.scale.set(0.334 + Math.random() * 0.666); // random scaling for size variation
        star.tint = generateStarColor();
        milkyWayContainer.addChild(star);
    }
    stars.length = 0;
    // Number of stars
    let numStars = Math.min(100, Math.floor(100 * (window.innerWidth * window.innerHeight / 3489280)));
    // Create stars
    for (let i = 0; i < numStars; i++) {
        let star = new PIXI.Graphics();
        star.beginFill(generateStarColor());
        // star.drawCircle(0, 0, 1);  // (x, y, radius)
        let inner = 2 + Math.random() * 2;
        let outer = inner + 2 + Math.random() * 2;
        drawStar(star, 0, 0, Math.floor(4 + Math.random() * 3), outer, inner, Math.random() * 2 * Math.PI);
        star.endFill();
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        // Velocity for random motion
        star.vx = (Math.random() - 0.5) * 2 * speedFactor; // Random value between -1 and 1
        star.vy = (Math.random() - 0.5) * 2 * speedFactor;
        starContainer.addChild(star);
        stars.push(star);
    }
}
class ShootingStar {
    constructor(stage) {
        this.rSpeed = (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
        this.stage = stage;
        this.direction = Math.random() * Math.PI * 2;
        let w = window.innerWidth;
        let h = window.innerHeight;
        let d = Math.sqrt(w * w + h * h);
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(generateStarColor());
        drawStar(this.sprite, 0, 0, 5, 8, 4, Math.random() * 2 * Math.PI);
        this.sprite.endFill();
        this.speed = Math.random() * 12 + 20;
        this.sprite.x = w / 2 - Math.sin(this.direction) * d / 2;
        this.sprite.y = h / 2 - Math.cos(this.direction) * d / 2;
        stage.addChild(this.sprite); // Assuming you've already defined starContainer
    }
    update(dt) {
        this.sprite.x += Math.cos(this.direction) * this.speed * dt;
        this.sprite.y += Math.sin(this.direction) * this.speed * dt;
        this.sprite.rotation += this.rSpeed * dt;
        let w = window.innerWidth / 2;
        let h = window.innerHeight / 2;
        let cx = this.sprite.x - w;
        let cy = this.sprite.y - h;
        let cd2 = cx * cx + cy * cy;
        if (cd2 > (h * h + w * w)) {
            this.remove();
            return false; // Indicate that the star has been removed
        }
        return true; // Star still in canvas
    }
    remove() {
        this.stage.removeChild(this.sprite);
    }
}
const speedFactor = 0.1;
class StaryBg extends dothtml_1.DotComponent {
    builder() {
        return dothtml_1.dot.div().class("star-bg-canvas-container").ref("canvasContainer");
    }
    style(css) {
        css(this.$refs.canvasContainer)
            .position("fixed")
            .left(0)
            .right(0)
            .top(0)
            .bottom(0)
            .zIndex(1);
    }
    ready() {
        // Create the Pixi Application
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
        });
        this.$refs.canvasContainer.appendChild(app.view);
        const milkyWayContainer = new PIXI.ParticleContainer();
        const lineContainer = new PIXI.Container();
        const starContainer = new PIXI.Container();
        // Star data
        let stars = [];
        let shootingStars = [];
        app.stage.addChild(milkyWayContainer);
        app.stage.addChild(lineContainer);
        app.stage.addChild(starContainer);
        addStars(app.renderer, starContainer, milkyWayContainer, stars);
        // Game loop
        app.ticker.add((delta) => {
            // console.log(delta);
            lineContainer.removeChildren();
            // Update star positions
            for (let star of stars) {
                star.x += star.vx;
                star.y += star.vy;
                // Keep stars inside the screen bounds
                if (star.x < 0 || star.x > app.screen.width)
                    star.vx = -star.vx;
                if (star.y < 0 || star.y > app.screen.height)
                    star.vy = -star.vy;
            }
            // Check distances between stars and draw lines
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 300) { // 150 can be adjusted as needed
                        const line = new PIXI.Graphics();
                        const alpha = mapLinear(distance, 50, 150, 1, 0); // 50 and 150 are min and max distances to consider
                        const thickness = mapLinear(distance, 50, 150, 3, 1);
                        line.lineStyle(thickness, 0xAA99FF, alpha);
                        line.moveTo(stars[i].x, stars[i].y);
                        line.lineTo(stars[j].x, stars[j].y);
                        lineContainer.addChild(line);
                    }
                }
            }
            // Shooting stars.
            shootingStars = shootingStars.filter(star => star.update(delta));
            let probability = (10 / 30) * (delta / 60);
            // console.log(probability);
            if (Math.random() < probability) {
                shootingStars.push(new ShootingStar(starContainer));
            }
        });
        window.addEventListener("resize", () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            if (this.resizeDebounce) {
                clearTimeout(this.resizeDebounce);
            }
            this.resizeDebounce = setTimeout(() => {
                addStars(app.renderer, starContainer, milkyWayContainer, stars);
                this.resizeDebounce = null;
            }, 100);
        });
    }
}
exports["default"] = StaryBg;


/***/ }),

/***/ "./src/event-details.ts":
/*!******************************!*\
  !*** ./src/event-details.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const EVENT_DETAILS = Object.freeze({
    date: new Date("2024-01-13T15:45:00.000-05:00")
});
exports["default"] = EVENT_DETAILS;


/***/ }),

/***/ "./src/assets/images/main-image.jpg":
/*!******************************************!*\
  !*** ./src/assets/images/main-image.jpg ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "57f4fc6c3521f1a63991350b8aa76813.jpg");

/***/ }),

/***/ "./src/assets/images/small-pic.jpg":
/*!*****************************************!*\
  !*** ./src/assets/images/small-pic.jpg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "6007f3fb8905ad283520c8fda5c7b679.jpg");

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfYS42MTk5NTE4NTI5ZTM3MWUxMzZiZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsOEZBQTRDO0FBQzVDLHFHQUFnQztBQUNoQyw2R0FBeUM7QUFFekMsSUFBSSxNQUFNLEdBQUcscUJBQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxxQkFBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLHFCQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUU1QixTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNwQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUyxpQkFBaUI7SUFDdEIscUNBQXFDO0lBQ3JDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV6RSxzREFBc0Q7SUFDdEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLFFB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LElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsZ0RBQWdEO0lBQ2xGLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRTtRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxD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LElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTNELElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztnQkFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQW5HRCw2QkFtR0M7Ozs7Ozs7Ozs7Ozs7QUM3VEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgscUJBQWUsYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNKN0IsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5QyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvUHJlY2lvdXMudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvZmFyYWRpbGEudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9jb21wb25lbnRzL3N0YXJ5LWJnLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ldmVudC1kZXRhaWxzLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL21haW4taW1hZ2UuanBnIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL3NtYWxsLXBpYy5qcGciXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1ByZWNpb3VzLnR0ZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9mYXJhZGlsYS50dGZcIjsiLCJpbXBvcnQgeyBEb3RDb21wb25lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgc2ltcGxleCBmcm9tIFwiLi4vc2NyaXB0cy9zaW1wbGV4XCI7XG5cbmxldCByTm9pc2UgPSBzaW1wbGV4KDUwKTtcbmxldCBnTm9pc2UgPSBzaW1wbGV4KDUwKTtcbmxldCBiTm9pc2UgPSBzaW1wbGV4KDUwKTtcbmxldCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcblxuZnVuY3Rpb24gbWFwTGluZWFyKHZhbHVlLCBhMSwgYTIsIGIxLCBiMikge1xuICAgIHJldHVybiBiMSArICh2YWx1ZSAtIGExKSAqIChiMiAtIGIxKSAvIChhMiAtIGExKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVTdGFyQ29sb3IoKSB7XG4gICAgLy8gUmFuZG9tIHZhbHVlIGJldHdlZW4gMHhDMCBhbmQgMHhGRlxuICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDB4RkYgLSAweEMwICsgMSkpICsgMHhDMDtcblxuICAgIC8vIFJhbmRvbWx5IGRlY2lkZSB3aGljaCBjaGFubmVsIGdldHMgdGhlIHJhbmRvbSB2YWx1ZVxuICAgIGNvbnN0IHJhbmRvbUNoYW5uZWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcblxuICAgIGxldCByLCBnLCBiO1xuICAgIHN3aXRjaCAocmFuZG9tQ2hhbm5lbCkge1xuICAgICAgICBjYXNlIDA6IC8vIFJlZCBnZXRzIHRoZSByYW5kb20gdmFsdWVcbiAgICAgICAgICAgIHIgPSByYW5kb21WYWx1ZTtcbiAgICAgICAgICAgIGcgPSAweEZGO1xuICAgICAgICAgICAgYiA9IDB4RkY7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOiAvLyBHcmVlbiBnZXRzIHRoZSByYW5kb20gdmFsdWVcbiAgICAgICAgICAgIHIgPSAweEZGO1xuICAgICAgICAgICAgZyA9IHJhbmRvbVZhbHVlO1xuICAgICAgICAgICAgYiA9IDB4RkY7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOiAvLyBCbHVlIGdldHMgdGhlIHJhbmRvbSB2YWx1ZVxuICAgICAgICAgICAgciA9IDB4RkY7XG4gICAgICAgICAgICBnID0gMHhGRjtcbiAgICAgICAgICAgIGIgPSByYW5kb21WYWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIENvbWJpbmUgciwgZywgYW5kIGIgaW50byBhIHNpbmdsZSBpbnRlZ2VyXG4gICAgcmV0dXJuIChyIDw8IDE2KSArIChnIDw8IDgpICsgYjtcbn1cblxuLyoqXG4gKiBEcmF3IGEgc3RhciBzaGFwZSB3aXRoIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgcG9pbnRzLlxuICogQGlnbm9yZVxuICovXG5jbGFzcyBTdGFyIGV4dGVuZHMgUElYSS5Qb2x5Z29uXG57XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHggLSBDZW50ZXIgWCBwb3NpdGlvbiBvZiB0aGUgc3RhclxuICAgICAqIEBwYXJhbSB5IC0gQ2VudGVyIFkgcG9zaXRpb24gb2YgdGhlIHN0YXJcbiAgICAgKiBAcGFyYW0gcG9pbnRzIC0gVGhlIG51bWJlciBvZiBwb2ludHMgb2YgdGhlIHN0YXIsIG11c3QgYmUgPiAxXG4gICAgICogQHBhcmFtIHJhZGl1cyAtIFRoZSBvdXRlciByYWRpdXMgb2YgdGhlIHN0YXJcbiAgICAgKiBAcGFyYW0gaW5uZXJSYWRpdXMgLSBUaGUgaW5uZXIgcmFkaXVzIGJldHdlZW4gcG9pbnRzLCBkZWZhdWx0IGhhbGYgYHJhZGl1c2BcbiAgICAgKiBAcGFyYW0gcm90YXRpb24gLSBUaGUgcm90YXRpb24gb2YgdGhlIHN0YXIgaW4gcmFkaWFucywgd2hlcmUgMCBpcyB2ZXJ0aWNhbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBwb2ludHM6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGlubmVyUmFkaXVzPzogbnVtYmVyLCByb3RhdGlvbiA9IDApXG4gICAge1xuICAgICAgICBpbm5lclJhZGl1cyA9IGlubmVyUmFkaXVzIHx8IHJhZGl1cyAvIDI7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRBbmdsZSA9ICgtMSAqIE1hdGguUEkgLyAyKSArIHJvdGF0aW9uO1xuICAgICAgICBjb25zdCBsZW4gPSBwb2ludHMgKiAyO1xuICAgICAgICBjb25zdCBkZWx0YSA9IE1hdGguUEkqMiAvIGxlbjtcbiAgICAgICAgY29uc3QgcG9seWdvbiA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBpICUgMiA/IGlubmVyUmFkaXVzIDogcmFkaXVzO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAqIGRlbHRhKSArIHN0YXJ0QW5nbGU7XG5cbiAgICAgICAgICAgIHBvbHlnb24ucHVzaChcbiAgICAgICAgICAgICAgICB4ICsgKHIgKiBNYXRoLmNvcyhhbmdsZSkpLFxuICAgICAgICAgICAgICAgIHkgKyAociAqIE1hdGguc2luKGFuZ2xlKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihwb2x5Z29uKTtcbiAgICB9XG59XG5cbi8qKlxuICogRHJhdyBhIHN0YXIgc2hhcGUgd2l0aCBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIHBvaW50cy5cbiAqXG4gKiBfTm90ZTogT25seSBhdmFpbGFibGUgd2l0aCAqKkBwaXhpL2dyYXBoaWNzLWV4dHJhcyoqLl9cbiAqIEBtZXRob2QgUElYSS5HcmFwaGljcyNkcmF3U3RhclxuICogQHBhcmFtIHRoaXNcbiAqIEBwYXJhbSB4IC0gQ2VudGVyIFggcG9zaXRpb24gb2YgdGhlIHN0YXJcbiAqIEBwYXJhbSB5IC0gQ2VudGVyIFkgcG9zaXRpb24gb2YgdGhlIHN0YXJcbiAqIEBwYXJhbSBwb2ludHMgLSBUaGUgbnVtYmVyIG9mIHBvaW50cyBvZiB0aGUgc3RhciwgbXVzdCBiZSA+IDFcbiAqIEBwYXJhbSByYWRpdXMgLSBUaGUgb3V0ZXIgcmFkaXVzIG9mIHRoZSBzdGFyXG4gKiBAcGFyYW0gaW5uZXJSYWRpdXMgLSBUaGUgaW5uZXIgcmFkaXVzIGJldHdlZW4gcG9pbnRzLCBkZWZhdWx0IGhhbGYgYHJhZGl1c2BcbiAqIEBwYXJhbSByb3RhdGlvbiAtIFRoZSByb3RhdGlvbiBvZiB0aGUgc3RhciBpbiByYWRpYW5zLCB3aGVyZSAwIGlzIHZlcnRpY2FsXG4gKiBAcmV0dXJucyAtIFRoaXMgR3JhcGhpY3Mgb2JqZWN0LiBHb29kIGZvciBjaGFpbmluZyBtZXRob2QgY2FsbHNcbiAqL1xuZnVuY3Rpb24gZHJhd1N0YXIodGhpczI6IFBJWEkuR3JhcGhpY3MsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBwb2ludHM6IG51bWJlcixcbiAgICByYWRpdXM6IG51bWJlcixcbiAgICBpbm5lclJhZGl1czogbnVtYmVyLFxuICAgIHJvdGF0aW9uID0gMCk6IFBJWEkuR3JhcGhpY3NcbntcbiAgICByZXR1cm4gdGhpczIuZHJhd1BvbHlnb24obmV3IFN0YXIoeCwgeSwgcG9pbnRzLCByYWRpdXMsIGlubmVyUmFkaXVzLCByb3RhdGlvbikgYXMgUElYSS5Qb2x5Z29uKTtcbn1cblxuZnVuY3Rpb24gYWRkU3RhcnMocmVuZGVyZXIsIHN0YXJDb250YWluZXI6IFBJWEkuQ29udGFpbmVyLCBtaWxreVdheUNvbnRhaW5lcjogUElYSS5QYXJ0aWNsZUNvbnRhaW5lciwgc3RhcnM6IEFycmF5PFBJWEkuR3JhcGhpY3M+KXtcblxuXHQvLyBSZW1vdmUgZXhpc3Rpbmcgc3RhcnMuXG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdGFycy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBzdGFyID0gc3RhcnNbaV07XG5cdFx0c3RhckNvbnRhaW5lci5yZW1vdmVDaGlsZChzdGFyKTtcblx0fVxuXG5cdG1pbGt5V2F5Q29udGFpbmVyLnJlbW92ZUNoaWxkcmVuKCk7XG5cblx0Ly8gQWRkIG1pbGt5IHdheS5cblxuXHQvLyBDcmVhdGUgYSBncmFwaGljcyBvYmplY3QgYW5kIGRyYXcgYSBjaXJjbGVcblx0bGV0IGJnU3RhckdmeCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cdGJnU3RhckdmeC5iZWdpbkZpbGwoMHhGRkZGRkYpOyAgLy8gV2hpdGUgY29sb3IgZm9yIHRoZSBzdGFyXG5cdGJnU3RhckdmeC5kcmF3Q2lyY2xlKDAsMCwzKTsgIC8vIERyYXcgYSBjaXJjbGUgb2YgcmFkaXVzIDUgYXQgcG9zaXRpb24gKDUsIDUpXG5cdGJnU3RhckdmeC5lbmRGaWxsKCk7XG5cblx0Ly8gR2VuZXJhdGUgYSB0ZXh0dXJlIGZyb20gdGhlIGdyYXBoaWNzIG9iamVjdFxuXHRjb25zdCBzdGFyVGV4dHVyZSA9IHJlbmRlcmVyLmdlbmVyYXRlVGV4dHVyZShiZ1N0YXJHZngpO1xuXG5cdGxldCBuQmdTdGFycyA9IE1hdGgubWluKDEwMDAwLCAxMDAwMCAqICh3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDM0ODkyODApKTtcblx0Zm9yKGxldCBpID0gMDsgaSA8IG5CZ1N0YXJzOyBpKyspIHtcblx0XHRsZXQgc3RhciA9IG5ldyBQSVhJLlNwcml0ZShzdGFyVGV4dHVyZSk7XG5cdFx0c3Rhci54ID0gTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHN0YXIueSA9IE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0c3Rhci5hbHBoYSA9IE1hdGgucmFuZG9tKCkgKiAwLjg7ICAvLyBmb3Igc29tZSB2YXJpYXRpb24gaW4gYnJpZ2h0bmVzc1xuXHRcdHN0YXIuc2NhbGUuc2V0KDAuMzM0ICsgTWF0aC5yYW5kb20oKSAqIDAuNjY2KTsgIC8vIHJhbmRvbSBzY2FsaW5nIGZvciBzaXplIHZhcmlhdGlvblxuXHRcdHN0YXIudGludCA9IGdlbmVyYXRlU3RhckNvbG9yKCk7XG5cblx0XHRtaWxreVdheUNvbnRhaW5lci5hZGRDaGlsZChzdGFyKTtcblx0fVxuXG5cdHN0YXJzLmxlbmd0aCA9IDA7XG5cblx0Ly8gTnVtYmVyIG9mIHN0YXJzXG5cdGxldCBudW1TdGFycyA9IE1hdGgubWluKDEwMCwgTWF0aC5mbG9vcigxMDAgKiAod2luZG93LmlubmVyV2lkdGggKiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAzNDg5MjgwKSkpO1xuXG5cdC8vIENyZWF0ZSBzdGFyc1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG51bVN0YXJzOyBpKyspIHtcblx0XHRsZXQgc3RhciA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cdFx0c3Rhci5iZWdpbkZpbGwoZ2VuZXJhdGVTdGFyQ29sb3IoKSk7XG5cdFx0Ly8gc3Rhci5kcmF3Q2lyY2xlKDAsIDAsIDEpOyAgLy8gKHgsIHksIHJhZGl1cylcblx0XHRsZXQgaW5uZXIgPSAyICsgTWF0aC5yYW5kb20oKSAqIDI7XG5cdFx0bGV0IG91dGVyID0gaW5uZXIgKyAyICsgTWF0aC5yYW5kb20oKSAqIDI7XG5cdFx0ZHJhd1N0YXIoc3RhciwwLDAsXG5cdFx0XHRNYXRoLmZsb29yKDQgKyBNYXRoLnJhbmRvbSgpICogMyksXG5cdFx0XHRvdXRlcixcblx0XHRcdGlubmVyLFxuXHRcdFx0TWF0aC5yYW5kb20oKSoyKk1hdGguUEkpO1xuXHRcdHN0YXIuZW5kRmlsbCgpO1xuXHRcdHN0YXIueCA9IE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRzdGFyLnkgPSBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdFxuXHRcdC8vIFZlbG9jaXR5IGZvciByYW5kb20gbW90aW9uXG5cdFx0KHN0YXIgYXMgYW55KS52eCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBzcGVlZEZhY3RvcjsgIC8vIFJhbmRvbSB2YWx1ZSBiZXR3ZWVuIC0xIGFuZCAxXG5cdFx0KHN0YXIgYXMgYW55KS52eSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBzcGVlZEZhY3RvcjtcblxuXHRcdHN0YXJDb250YWluZXIuYWRkQ2hpbGQoc3Rhcik7XG5cdFx0c3RhcnMucHVzaChzdGFyKTtcblx0fVxufVxuXG5jbGFzcyBTaG9vdGluZ1N0YXIge1xuXHRzcHJpdGU6IFBJWEkuR3JhcGhpY3M7XG5cdHNwZWVkOiBudW1iZXI7XG5cdGRpcmVjdGlvbjogbnVtYmVyO1xuXHRzdGFnZTogYW55O1xuXHRyU3BlZWQgPSAoMC4zICsgTWF0aC5yYW5kb20oKSAqIDAuNSkgKiAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSk7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGFnZTogUElYSS5Db250YWluZXIpIHtcblx0XHR0aGlzLnN0YWdlID0gc3RhZ2U7XG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG5cblx0XHRsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdGxldCBkID0gTWF0aC5zcXJ0KHcqdytoKmgpO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgICAgdGhpcy5zcHJpdGUuYmVnaW5GaWxsKGdlbmVyYXRlU3RhckNvbG9yKCkpO1xuXHRcdGRyYXdTdGFyKHRoaXMuc3ByaXRlLCAwLCAwLCA1LCA4LCA0LCBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLnNwcml0ZS5lbmRGaWxsKCk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBNYXRoLnJhbmRvbSgpICogMTIgKyAyMDtcbiAgICAgICAgdGhpcy5zcHJpdGUueCA9IHcgLyAyIC0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogZCAvIDI7XG4gICAgICAgIHRoaXMuc3ByaXRlLnkgPSBoIC8gMiAtIE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIGQgLyAyO1xuICAgICAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLnNwcml0ZSk7ICAvLyBBc3N1bWluZyB5b3UndmUgYWxyZWFkeSBkZWZpbmVkIHN0YXJDb250YWluZXJcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5zcHJpdGUueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XG4gICAgICAgIHRoaXMuc3ByaXRlLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xuXHRcdHRoaXMuc3ByaXRlLnJvdGF0aW9uICs9IHRoaXMuclNwZWVkICogZHQ7XG5cdFx0bGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5cdFx0bGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuXHRcdGxldCBjeCA9IHRoaXMuc3ByaXRlLnggLSB3O1xuXHRcdGxldCBjeSA9IHRoaXMuc3ByaXRlLnkgLSBoO1xuXHRcdGxldCBjZDIgPSBjeCpjeCtjeSpjeTtcbiAgICAgICAgaWYgKGNkMiA+IChoKmgrdyp3KSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgIC8vIEluZGljYXRlIHRoYXQgdGhlIHN0YXIgaGFzIGJlZW4gcmVtb3ZlZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlOyAgLy8gU3RhciBzdGlsbCBpbiBjYW52YXNcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5zcHJpdGUpO1xuICAgIH1cbn1cblxuY29uc3Qgc3BlZWRGYWN0b3IgPSAwLjE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ5QmcgZXh0ZW5kcyBEb3RDb21wb25lbnR7XG5cdHJlc2l6ZURlYm91bmNlOiBudW1iZXI7XG5cblx0YnVpbGRlcigpe1xuXHRcdHJldHVybiBkb3QuZGl2KCkuY2xhc3MoXCJzdGFyLWJnLWNhbnZhcy1jb250YWluZXJcIikucmVmKFwiY2FudmFzQ29udGFpbmVyXCIpXG5cdH1cblxuXHRzdHlsZShjc3Mpe1xuXHRcdGNzcyh0aGlzLiRyZWZzLmNhbnZhc0NvbnRhaW5lcilcblx0XHRcdC5wb3NpdGlvbihcImZpeGVkXCIpXG5cdFx0XHQubGVmdCgwKVxuXHRcdFx0LnJpZ2h0KDApXG5cdFx0XHQudG9wKDApXG5cdFx0XHQuYm90dG9tKDApXG5cdFx0XHQuekluZGV4KDEpO1xuXHR9XG5cblx0cmVhZHkoKXtcblx0XHQvLyBDcmVhdGUgdGhlIFBpeGkgQXBwbGljYXRpb25cblx0XHRjb25zdCBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbih7XG5cdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogMHgwMDAwMDAsXG5cdFx0fSk7XG5cdFx0dGhpcy4kcmVmcy5jYW52YXNDb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwLnZpZXcgYXMgYW55KTtcblxuXHRcdGNvbnN0IG1pbGt5V2F5Q29udGFpbmVyID0gbmV3IFBJWEkuUGFydGljbGVDb250YWluZXIoKTtcblx0XHRjb25zdCBsaW5lQ29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG5cdFx0Y29uc3Qgc3RhckNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuXG5cdFx0Ly8gU3RhciBkYXRhXG5cdFx0bGV0IHN0YXJzID0gW107XG5cdFxuXHRcdGxldCBzaG9vdGluZ1N0YXJzID0gW107XG5cblx0XHRhcHAuc3RhZ2UuYWRkQ2hpbGQobWlsa3lXYXlDb250YWluZXIpO1xuXHRcdGFwcC5zdGFnZS5hZGRDaGlsZChsaW5lQ29udGFpbmVyKTtcblx0XHRhcHAuc3RhZ2UuYWRkQ2hpbGQoc3RhckNvbnRhaW5lcik7XG5cblx0XHRhZGRTdGFycyhhcHAucmVuZGVyZXIsIHN0YXJDb250YWluZXIsIG1pbGt5V2F5Q29udGFpbmVyLCBzdGFycyk7XG5cblx0XHQvLyBHYW1lIGxvb3Bcblx0XHRhcHAudGlja2VyLmFkZCgoZGVsdGEpID0+IHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGRlbHRhKTtcblxuXHRcdFx0bGluZUNvbnRhaW5lci5yZW1vdmVDaGlsZHJlbigpO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3RhciBwb3NpdGlvbnNcblx0XHRcdGZvciAobGV0IHN0YXIgb2Ygc3RhcnMpIHtcblx0XHRcdFx0c3Rhci54ICs9IHN0YXIudng7XG5cdFx0XHRcdHN0YXIueSArPSBzdGFyLnZ5O1xuXG5cdFx0XHRcdC8vIEtlZXAgc3RhcnMgaW5zaWRlIHRoZSBzY3JlZW4gYm91bmRzXG5cdFx0XHRcdGlmIChzdGFyLnggPCAwIHx8IHN0YXIueCA+IGFwcC5zY3JlZW4ud2lkdGgpIHN0YXIudnggPSAtc3Rhci52eDtcblx0XHRcdFx0aWYgKHN0YXIueSA8IDAgfHwgc3Rhci55ID4gYXBwLnNjcmVlbi5oZWlnaHQpIHN0YXIudnkgPSAtc3Rhci52eTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgZGlzdGFuY2VzIGJldHdlZW4gc3RhcnMgYW5kIGRyYXcgbGluZXNcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc3RhcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRjb25zdCBkeCA9IHN0YXJzW2ldLnggLSBzdGFyc1tqXS54O1xuXHRcdFx0XHRcdGNvbnN0IGR5ID0gc3RhcnNbaV0ueSAtIHN0YXJzW2pdLnk7XG5cdFx0XHRcdFx0Y29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0aWYgKGRpc3RhbmNlIDwgMzAwKSB7IC8vIDE1MCBjYW4gYmUgYWRqdXN0ZWQgYXMgbmVlZGVkXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblx0XHRcdFx0XHRcdGNvbnN0IGFscGhhID0gbWFwTGluZWFyKGRpc3RhbmNlLCA1MCwgMTUwLCAxLCAwKTsgIC8vIDUwIGFuZCAxNTAgYXJlIG1pbiBhbmQgbWF4IGRpc3RhbmNlcyB0byBjb25zaWRlclxuXHRcdFx0XHRcdFx0Y29uc3QgdGhpY2tuZXNzID0gbWFwTGluZWFyKGRpc3RhbmNlLCA1MCwgMTUwLCAzLCAxKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bGluZS5saW5lU3R5bGUodGhpY2tuZXNzLCAweEFBOTlGRiwgYWxwaGEpO1xuXHRcdFx0XHRcdFx0bGluZS5tb3ZlVG8oc3RhcnNbaV0ueCwgc3RhcnNbaV0ueSk7XG5cdFx0XHRcdFx0XHRsaW5lLmxpbmVUbyhzdGFyc1tqXS54LCBzdGFyc1tqXS55KTtcblx0XHRcdFx0XHRcdGxpbmVDb250YWluZXIuYWRkQ2hpbGQobGluZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNob290aW5nIHN0YXJzLlxuXHRcdFx0c2hvb3RpbmdTdGFycyA9IHNob290aW5nU3RhcnMuZmlsdGVyKHN0YXIgPT4gc3Rhci51cGRhdGUoZGVsdGEpKTtcblxuXHRcdFx0bGV0IHByb2JhYmlsaXR5ID0gKDEwLzMwKSAqIChkZWx0YS82MCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhwcm9iYWJpbGl0eSk7XG5cdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA8IHByb2JhYmlsaXR5KSB7XG5cdFx0XHRcdHNob290aW5nU3RhcnMucHVzaChuZXcgU2hvb3RpbmdTdGFyKHN0YXJDb250YWluZXIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpPT57XG5cdFx0XHRhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHRcdFx0XG5cdFx0XHRpZih0aGlzLnJlc2l6ZURlYm91bmNlKXtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNpemVEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0YWRkU3RhcnMoYXBwLnJlbmRlcmVyLCBzdGFyQ29udGFpbmVyLCBtaWxreVdheUNvbnRhaW5lciwgc3RhcnMpO1xuXHRcdFx0XHR0aGlzLnJlc2l6ZURlYm91bmNlID0gbnVsbDtcblx0XHRcdH0sIDEwMCk7XG5cdFx0fSk7XG5cdH1cbn0iLCJjb25zdCBFVkVOVF9ERVRBSUxTID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGRhdGU6IG5ldyBEYXRlKFwiMjAyNC0wMS0xM1QxNTo0NTowMC4wMDAtMDU6MDBcIilcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBFVkVOVF9ERVRBSUxTOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI1N2Y0ZmM2YzM1MjFmMWE2Mzk5MTM1MGI4YWE3NjgxMy5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNjAwN2YzZmI4OTA1YWQyODM1MjBjOGZkYTVjN2I2NzkuanBnXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9