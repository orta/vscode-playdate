import * as vscode from "vscode";
import * as playdate from "./playdate";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.runSimulator', () => {
        playdate.compile() && playdate.runSimulator();
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
