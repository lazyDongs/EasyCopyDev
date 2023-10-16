import * as vscode from "vscode";

const getEditor = () => vscode.window.activeTextEditor;
export function activate(context: vscode.ExtensionContext) {
  const editor = getEditor();
  let disposable = vscode.commands.registerCommand("easyCopy.copy", () => {
    // 覆写剪切板复制，todo 增加数据缓存
    const selection = editor?.selection;
    const text = editor?.document.getText(selection);
    if (text) {
      vscode.env.clipboard.writeText(text);
      vscode.window.showInformationMessage(`复制了${text}`);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
