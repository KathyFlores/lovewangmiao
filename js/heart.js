(function (window, document) {
	var hearts = [];
	window.requestAnimationFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				setTimeout(callback, 1000 / 60);
			}
	})();
	init();
	function init() {
		css(".click-heart{width: 24px;height: 24px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.click-heart:after,.click-heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.click-heart:after{top: -12px;}.click-heart:before{left: -12px;}");
		attachEvent();
		gameloop();
	}
	function gameloop() {
		for (var i = 0; i < hearts.length; i++) {
			if (hearts[i].alpha < 0) {
				document.body.removeChild(hearts[i].el);
				hearts.splice(i, 1);
				continue;
			}
			hearts[i].y--;
			hearts[i].scale += 0.004;
			hearts[i].alpha -= 0.013;
			hearts[i].el.style.cssText =
				"left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ")rotate(45deg); background: " + hearts[i].color;
		}
		requestAnimationFrame(gameloop);
	}
	function attachEvent() {
		document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
			createHeartClick(event);
		});
		document.getElementsByTagName('body')[0].addEventListener('touchstart', function (event) {
			createHeartTouch(event);
		});
	}
	function createHeartClick(event) {
		var d = document.createElement("div");
		d.className = "click-heart";
		hearts.push({
			el: d,
			x: event.clientX - 5,
			y: event.clientY - 5,
			scale: 1,
			alpha: 1,
			color: randomColor()
		});
		document.body.appendChild(d);
	}
	function createHeartTouch(event) {
		var d = document.createElement("div");
		d.className = "click-heart";
		hearts.push({
			el: d,
			x: event.touches[0].clientX - 5,
			y: event.touches[0].clientY - 5,
			scale: 1,
			alpha: 1,
			color: randomColor()
		});
		document.body.appendChild(d);
	}
	function css(css) {
		var style = document.createElement("style");
		style.type = "text/css";
		try {
			style.appendChild(document.createTextNode(css));
		} catch (ex) {
			style.styleSheet.cssText = css;
		}
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	function randomColor() {
		return "#F14E95";
		//return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
	}
})(window, document);