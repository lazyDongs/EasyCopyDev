import * as vscode from "vscode";

//
const CopyListData = "easyCopy.data";
// 获取编辑对象
const getEditor = () => vscode.window.activeTextEditor;

// 同步数据变量
let dataCache: { tag: string; value: string }[] = [];
// 保存数据
const saveData = (
  context: vscode.ExtensionContext,
  tag: string,
  value: string
) => {
  dataCache.push({ tag, value });
  context.globalState.update(CopyListData, [...dataCache, { tag, value }]);
};

export function activate(context: vscode.ExtensionContext) {
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
  let getListCommands = vscode.commands.registerCommand(
    "easyCopy.getData",
    () => {
      // 覆写剪切板复制，todo 增加数据缓存
      const data = dataCache;
      if (data) {
        vscode.window.showInformationMessage(
          `复制列表:\n${JSON.stringify(data)}`
        );
      }
    }
  );
  context.subscriptions.push(copyCommands);
  context.subscriptions.push(getListCommands);
}

// This method is called when your extension is deactivated
export function deactivate() {}
