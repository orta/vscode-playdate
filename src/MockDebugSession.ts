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
    spawnSync("open", [args.output]);
    this.sendEvent(new TerminatedEvent());
  }
}
