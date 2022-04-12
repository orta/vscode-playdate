import * as vscode from "vscode";
import * as playdate from "./playdate";

export function compileWithDefaults(): boolean {
  const ws = workspaceRoot();
  const sdk = sdkPath();

  if (!(ws && sdk)) {
    return false;
  }

  let result = playdate.compile(sdk, `${ws}/source`, `${ws}/output.pdx`);
  if (result?.status !== 0 || !result) {
    showMessage("failed to compile project");
    return false;
  }

  return true;
}

export function runSimulatorWithDefaults(): boolean {
  const ws = workspaceRoot();
  const sdk = sdkPath();

  if (!(ws && sdk)) {
    return false;
  }

  let result = playdate.runSimulator(sdk, `${ws}/output.pdx`);
  if (result?.status !== 0 || !result) {
    showMessage("failed to compile project");
    return false;
  }

  return true;
}

function showMessage(message: string) {
  vscode.window.showInformationMessage(`vscode-playdate: ${message}`);
}

function sdkPath(): string | null {
  if (process.env.PLAYDATE_SDK_PATH) {
    return process.env.PLAYDATE_SDK_PATH;
  }

  const settings = vscode.workspace.getConfiguration();
  const sdkPath = settings.get<string>("playdate.sdkPath");
  if (sdkPath) {
    return sdkPath;
  }

  showMessage("Failed to get sdk path.");

  return null;
}

function workspaceRoot(): string | null {
  const folders = vscode.workspace.workspaceFolders;

  if (folders?.length !== 1) {
    showMessage(
      "Failed to get workspace root, ensure exactly one workspace is open."
    );
    return null;
  }

  return folders[0].uri.fsPath;
}
