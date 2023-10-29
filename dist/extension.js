/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
//
const CopyListData = "easyCopy.data";
// 获取编辑对象
const getEditor = () => vscode.window.activeTextEditor;
// 同步数据变量
let dataCache = [];
// 保存数据
const saveData = (context, tag, value) => {
    dataCache.push({ tag, value });
    context.globalState.update(CopyListData, [...dataCache, { tag, value }]);
};
function activate(context) {
    context.globalState.setKeysForSync([CopyListData]);
    // 初始化数据
    dataCache = context.globalState.get(CopyListData) || [];
    const editor = getEditor();
    let copyCommands = vscode.commands.registerCommand("easyCopy.copy", () => {
        // 覆写剪切板复制，todo 增加数据缓存
        const selection = editor?.selection;
        const text = editor?.document.getText(selection);
        if (text) {
            vscode.env.clipboard.writeText(text);
            saveData(context, String(Number(new Date())), text);
            vscode.window.showInformationMessage(`复制了${text}`);
        }
    });
    let getListCommands = vscode.commands.registerCommand("easyCopy.getData", () => {
        // 覆写剪切板复制，todo 增加数据缓存
        const data = dataCache;
        if (data) {
            vscode.window.showInformationMessage(`复制列表:\n${JSON.stringify(data)}`);
        }
    });
    context.subscriptions.push(copyCommands);
    context.subscriptions.push(getListCommands);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map