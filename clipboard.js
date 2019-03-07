class Clipboard {
	constructor() {
		this.textArea = '';
	}
	/**
	 * 默认复制成功函数
	 */
	success() {
		alert('复制成功！')
	}
	/**
	 * 默认复制失败函数
	 */
	fail() {
		alert('您的浏览器不支持自动复制！请手动复制！')
	}
	/**
	 * 创建文本元素
	 */
	createTextArea() {
		this.textArea = document.createElement('textArea');
		this.textArea.value = this.text;
		document.body.appendChild(this.textArea);
	}
	/**
	 * 选择内容
	 */
	selectText() {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			// ios
			let range,
				selection;
			range = document.createRange();
			range.selectNodeContents(this.textArea);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			this.textArea.setSelectionRange(0, 999999);
		} else {
			// 其它
			this.textArea.select();
		}
	}
	/**
	 * 复制到剪贴板
	 */
	copyToClipboard() {
		if (document.execCommand("Copy")) {
			this.success()
		} else {
			this.fail()
		}
		document.body.removeChild(this.textArea);
	}
	/**
	 * @param {String} text 需要复制的内容
	 * @param {function} success 复制成功回调函数
	 * @param {function} fail  复制失败回调函数
	 */
	copy(text = '', success = this.success, fail = this.fail) {
		this.text = text;
		this.success = success;
		this.fail = fail;
		this.createTextArea();
		this.selectText();
		this.copyToClipboard();
	}
}
export default Clipboard

//使用方法
// var val = document.getElementById('textAreas').innerText;  //获取需复制的内容
// var clipboard = new Clipboard();
// clipboard.copy(val);  //调用函数执行复制


// let textArea = '';
// /**
//  * 默认复制成功函数
//  */
//  fnSuccess() {
// 	alert('复制成功！')
// }
// /**
//  * 默认复制失败函数
//  */
// function fnFail() {
// 	alert('您的浏览器不支持自动复制！请手动复制！')
// }
// /**
//  * 创建文本元素
//  * @param {String} text 需要复制的内容
//  */
// function createTextArea(text) {
// 	textArea = document.createElement('textArea');
// 	textArea.value = text;
// 	document.body.appendChild(textArea);
// }
// /**
//  * 选择内容
//  */
// function selectText() {
// 	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
// 		// ios
// 		let range,
// 			selection;
// 		range = document.createRange();
// 		range.selectNodeContents(textArea);
// 		selection = window.getSelection();
// 		selection.removeAllRanges();
// 		selection.addRange(range);
// 		textArea.setSelectionRange(0, 999999);
// 	} else {
// 		// 其它
// 		textArea.select();
// 	}
// }
// /**
//  * 复制到剪贴板
//  */
// function copyToClipboard(success, fail) {
// 	if (document.execCommand("Copy")) {
// 		success()
// 	} else {
// 		fail()
// 	}
// 	document.body.removeChild(textArea);
// }

// function copy(text = '', success = fnSuccess, fail = fnFail) {
// 	createTextArea(text);
// 	selectText();
// 	copyToClipboard(success, fail);
// }

// export default { copy }

//使用函数
// var val = document.getElementById('textAreas').innerText;  //获取需复制的内容
// clipboard.copy(val);  //调用函数执行复制
