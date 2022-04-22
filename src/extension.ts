import * as vscode from "vscode";
import { compileWithDefaults, runSimulatorWithDefaults } from "./command";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.runSimulator",
    () => {
      compileWithDefaults() && runSimulatorWithDefaults();
    }
  );

  context.subscriptions.push(disposable);
}
export function deactivate() {}
