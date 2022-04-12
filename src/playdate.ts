import { spawnSync, SpawnSyncReturns } from "child_process";

export function compile(
  sdkPath: string,
  source: string,
  output: string
): SpawnSyncReturns<string> | null {
  const pdc = `${sdkPath}/bin/pdc`;

  switch (process.platform) {
    case "win32":
      return spawnSync("cmd", ["/c", pdc, source, output]);
    case "darwin":
      return spawnSync(pdc, [source, output]);
  }

  return null;
}

export function runSimulator(
  sdkPath: string,
  output: string
): SpawnSyncReturns<string> | null {
  switch (process.platform) {
    case "win32":
      var simulator = `${sdkPath}\bin\PlaydateSimulator`;
      return spawnSync("cmd", ["/c", simulator, output]);
    case "darwin":
      var simulator = `${sdkPath}/bin/Playdate Simulator.app`;
      return spawnSync("open", [simulator, output]);
  }

  return null;
}
