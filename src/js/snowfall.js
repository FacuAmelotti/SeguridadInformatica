Date.now || (Date.now = function () {
    return (new Date).getTime();
});

(function () {
    "use strict";

    var vendors = ["webkit", "moz"];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vendor = vendors[i];
        window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
    }

    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now(),
                nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
})();

var snowFall = (function () {
    function Snowfall() {
        var defaults = {
            flakeCount: 35,
            flakeColor: "#ffffff",
            flakeIndex: 999999,
            flakePosition: "absolute",
            minSize: 1,
            maxSize: 2,
            minSpeed: 1,
            maxSpeed: 5,
            round: false,
            shadow: false,
            collection: false,
            image: false,
            collectionHeight: 40
        };

        var flakes = [],
            target = {},
            width = 0,
            height = 0,
            minX = 0,
            animationFrame = 0;

        function extend(obj, props) {
            for (var key in props) {
                if (obj.hasOwnProperty(key)) obj[key] = props[key];
            }
        }

        function applyTransform(element, value) {
            element.style.webkitTransform = value;
            element.style.MozTransform = value;
            element.style.msTransform = value;
            element.style.OTransform = value;
            element.style.transform = value;
        }

        function random(min, max) {
            return Math.round(min + Math.random() * (max - min));
        }

        function applyStyles(element, styles) {
            for (var key in styles) {
                element.style[key] = styles[key] + (key === "width" || key === "height" ? "px" : "");
            }
        }

        function Flake(parent, size, speed) {
            this.x = random(minX, width - minX);
            this.y = random(0, height);
            this.size = size;
            this.speed = speed;
            this.step = 0;
            this.stepSize = random(1, 10) / 100;

            var element = null;
            if (defaults.image) {
                element = new Image();
                element.src = defaults.image;
            } else {
                element = document.createElement("div");
                applyStyles(element, { background: defaults.flakeColor });
            }

            element.className = "snowfall-flakes";
            applyStyles(element, {
                width: this.size,
                height: this.size,
                position: defaults.flakePosition,
                top: 0,
                left: 0,
                "will-change": "transform",
                fontSize: 0,
                zIndex: defaults.flakeIndex
            });

            if (defaults.round) {
                applyStyles(element, {
                    borderRadius: Math.round(defaults.maxSize) + "px"
                });
            }

            if (defaults.shadow) {
                applyStyles(element, {
                    boxShadow: "1px 1px 1px #555"
                });
            }

            if (parent.tagName === document.body.tagName) {
                document.body.appendChild(element);
            } else {
                parent.appendChild(element);
            }

            this.element = element;

            this.update = function () {
                this.y += this.speed;
                if (this.y > height - (this.size + 6)) {
                    this.reset();
                }
                applyTransform(this.element, "translateY(" + this.y + "px) translateX(" + this.x + "px)");
                this.step += this.stepSize;
                this.x += Math.cos(this.step);

                if (this.x + this.size > width - minX || this.x < minX) {
                    this.reset();
                }
            };

            this.reset = function () {
                this.y = 0;
                this.x = random(minX, width - minX);
                this.stepSize = random(1, 10) / 100;
                this.size = random(100 * defaults.minSize, 100 * defaults.maxSize) / 100;
                this.element.style.width = this.size + "px";
                this.element.style.height = this.size + "px";
                this.speed = random(defaults.minSpeed, defaults.maxSpeed);
            };
        }

        function animate() {
            for (var i = 0; i < flakes.length; i++) {
                flakes[i].update();
            }
            animationFrame = requestAnimationFrame(animate);
        }

        return {
            snow: function (element, options) {
                extend(defaults, options);
                target = element;
                height = target.offsetHeight;
                width = target.offsetWidth;
                target.snow = this;

                if (target.tagName.toLowerCase() === "body") {
                    minX = 25;
                }

                window.addEventListener("resize", function () {
                    height = target.clientHeight;
                    width = target.offsetWidth;
                }, true);

                for (var i = 0; i < defaults.flakeCount; i++) {
                    flakes.push(new Flake(target, random(100 * defaults.minSize, 100 * defaults.maxSize) / 100, random(defaults.minSpeed, defaults.maxSpeed)));
                }

                animate();
            },

            clear: function () {
                var elements = target.getElementsByClassName ? target.getElementsByClassName("snowfall-flakes") : target.querySelectorAll(".snowfall-flakes");
                for (var i = elements.length; i--;) {
                    if (elements[i].parentNode === target) {
                        target.removeChild(elements[i]);
                    }
                }
                cancelAnimationFrame(animationFrame);
            }
        };
    }

    return {
        snow: function (element, options) {
            if (typeof options === "string") {
                if (element.length > 0) {
                    for (var i = 0; i < element.length; i++) {
                        if (element[i].snow) {
                            element[i].snow.clear();
                        }
                    }
                } else {
                    element.snow.clear();
                }
            } else {
                if (element.length > 0) {
                    for (var i = 0; i < element.length; i++) {
                        (new Snowfall()).snow(element[i], options);
                    }
                } else {
                    (new Snowfall()).snow(element, options);
                }
            }
        }
    };
})();
