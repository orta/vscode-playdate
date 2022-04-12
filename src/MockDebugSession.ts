import { LoggingDebugSession, TerminatedEvent } from "vscode-debugadapter";
import { DebugProtocol } from "vscode-debugprotocol";
import * as playdate from "./playdate";

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
  source: string;
  output: string;
  sdkPath: string;
}

export class MockDebugSession extends LoggingDebugSession {
  protected async launchRequest(
    response: DebugProtocol.LaunchResponse,
    args: LaunchRequestArguments
  ) {
    var sdkPath = args.sdkPath;
    if (process.env.PLAYDATE_SDK_PATH) {
      sdkPath = process.env.PLAYDATE_SDK_PATH;
    }

    playdate.compile(sdkPath, args.source, args.output);
    playdate.runSimulator(sdkPath, args.output);

    this.sendEvent(new TerminatedEvent());
  }
}
