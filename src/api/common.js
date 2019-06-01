// 安卓微信浏览器禁止字体放大缩小
/* eslint-disable no-undef */
(function () {
	if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
		handleFontSize();
	} else {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', handleFontSize);
			document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
		}
	}
	function handleFontSize () {
		WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
		WeixinJSBridge.on('menu:setfont', function () {
			WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
		});
	}
})();

(function (win) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var tid;

	function refreshRem () {
		var width = docEl.getBoundingClientRect().width;
		var rem = width / 25;
		docEl.style.fontSize = rem + 'px';
	}

	win.addEventListener('resize', function () {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	refreshRem();
})(window);

/**
 * @description  获取url指定参数值
 * @param  {String} name 参数名
 * @result {String} 参数值, null: 没有指定参数
 */
const getUrlParam = (name) => {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
};

/**
 * @description  判断字符串是否为空
 * @param {String} str 对象
 * @result {Boolean} true: 空; false: 不为空
 */
const checkIsNull = (str) => {
	return !str || str === '';
};

/**
 * @description  滚动条移动
 * @param x {Number} X轴
 * @param y {Number} Y轴
 */
const windowScrollTo = (x, y) => {
	setTimeout(() => {
		window.scrollTo(x, y);
	}, 0);
};

// 返回在vue模板中的调用接口
export default {
	getUrlParam: function (name) {
		return getUrlParam(name);
	},
	checkIsNull: function (str) {
		return checkIsNull(str);
	},
	windowScrollTo: function (x, y) {
		return windowScrollTo(x, y);
	}
};
