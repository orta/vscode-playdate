import * as vscode from "vscode";
import * as playdate from "./playdate";

export function compileWithDefaults(): boolean {
  const sdk = sdkPath();
  if (!sdk) {
    return false;
  }

  const ws = workspaceRoot();
  if (!ws) {
    return false;
  }

  var source = getConfigByProperty("source");
  if (!source) {
    source = "Source";
  }

  var output = getConfigByProperty("output");
  if (!output) {
    output = "Output.pdx";
  }

  let result = playdate.compile(sdk, `${ws}/${source}`, `${ws}/${output}`);
  if (result?.status !== 0 || !result) {
    showMessage("Failed to compile project.");
    return false;
  }

  return true;
}

export function runSimulatorWithDefaults(): boolean {
  const sdk = sdkPath();
  if (!sdk) {
    return false;
  }

  const ws = workspaceRoot();
  if (!ws) {
    return false;
  }

  var output = getConfigByProperty("output");
  if (!output) {
    output = "Output.pdx";
  }

  let result = playdate.runSimulator(sdk, `${ws}/${output}`);
  if (result?.status !== 0 || !result) {
    showMessage("Failed to start simulator.");
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

  const sdkPath = getConfigByProperty("sdkPath");
  if (sdkPath) {
    return sdkPath;
  }

  showMessage("Failed to get sdk path.");

  return null;
}

function getConfigByProperty(configKey: string): string | undefined {
  const settings = vscode.workspace.getConfiguration();
  return settings.get<string>(`playdate.${configKey}`);
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
