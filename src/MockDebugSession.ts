import { LoggingDebugSession, TerminatedEvent } from "vscode-debugadapter";
import { spawnSync } from "child_process";
import { DebugProtocol } from "vscode-debugprotocol";
import { join } from "path";

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
  source: string;
  output: string;
}

export class MockDebugSession extends LoggingDebugSession {
  protected async launchRequest(response: DebugProtocol.LaunchResponse, args: LaunchRequestArguments) {
    // Open the Sim, and then close this debugger
    spawnSync("open", [join(args.output, "main.pdx")]);
    this.sendEvent(new TerminatedEvent());
  }
}
