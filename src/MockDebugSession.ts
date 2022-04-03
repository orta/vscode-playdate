import { LoggingDebugSession, TerminatedEvent } from "vscode-debugadapter";
import { spawnSync } from "child_process";
import { DebugProtocol } from "vscode-debugprotocol";

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
  source: string;
  output: string;
}

export class MockDebugSession extends LoggingDebugSession {
  protected async launchRequest(response: DebugProtocol.LaunchResponse, args: LaunchRequestArguments) {
    // Open the Sim, and then close this debugger
    var cmd: string;
    var spawnArgs: string[];

    switch (process.platform) {
      case "win32":
        cmd = "cmd";
        spawnArgs = ["/c", "start", `${args.output}/main.pdz`];
        break;
      case "darwin":
        cmd = "open";
        spawnArgs = [args.output];
        break;
      default:
        console.log("os not supported");
        return;
    }

    spawnSync(cmd, spawnArgs);
    this.sendEvent(new TerminatedEvent());
  }
}
