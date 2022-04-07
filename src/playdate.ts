import { spawnSync } from "child_process";
import * as vscode from "vscode";

export function compile(): boolean {
    const ws = workspaceRoot();
    const sdk = sdkPath();
    const pdc = `${sdk}/bin/pdc`;

    if (!(ws && sdk)) {
        return false;
    }

    switch (process.platform) {
    case "win32":
        spawnSync("cmd", ["/c", pdc, `${ws}/source`, `${ws}/output.pdx`]);
        break;
    case "darwin":
        spawnSync(pdc, [`${ws}/source`, `${ws}/output.pdx`]);
        break;
    default:
		showMessage(`${process.platform} is not supported.`);
    }

    return true;
}

export function runSimulator(): boolean {
    const ws = workspaceRoot();
    const sdk = sdkPath();

    if (!(ws && sdk)) {
        return false;
    }

    switch (process.platform) {
    case "win32":
        var simulator = `${sdk}\bin\PlaydateSimulator`;
        spawnSync("cmd", ["/c", simulator, `${ws}/Output.pdx`]);
        break;
    case "darwin":
        var simulator = `${sdk}/bin/Playdate Simulator.app`;
        spawnSync("open", [simulator, `${ws}/Output.pdx`]);
        break;
    default:
		showMessage(`Platform '${process.platform}' is not supported.`);
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
    const sdkPath = settings.get<string>('playdate.sdkPath');
    if (sdkPath) {
        return sdkPath;
    }

    showMessage("Failed to get sdk path.");

    return null;
}

function workspaceRoot(): string | null {
    const folders = vscode.workspace.workspaceFolders;

    if (folders?.length !== 1) {
		showMessage('Failed to get workspace root, ensure exactly one workspace is open.');
        return null;
    }

    return folders[0].uri.fsPath;
}
