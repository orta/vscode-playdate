# VS Code Playdate

Adds a custom command to compile your code and run it in the Playdate Simulator.

<img src="./screenshots/desktop.jpeg">

## Getting Set Up

Since this plugin will need to access both `pdc` (the Playdate compiler) and the
actual simulator which is bundled in the SDK the plugin needs to be able to
determine where that is installed.

Either configure your environment variable `PLAYDATE_SDK_PATH` or add it in the
settings. While in the settings it's also a good idea to add the Lua workspace
libraries:

```json
{
  "Lua.workspace.library": [
    "/Users/ortatherox/Developer/PlaydateSDK/CoreLibs"
  ],
  "playdate.sdkPath": "/Users/ortatherox/Developer/PlaydateSDK"
}
```

To compile and run your code in the simulator hit or `Cmd + Shift + P` on Mac or
`Ctrl + Shift + P` on Windows and search for "Run in Playdate simulator".

That's it, you get auto-completion and the ability to hit a command to trigger
loading it into the sim.

### Notes

The playdate version of Lua has a few extras:

- The `import` function
- `+=` and `-=` 

To make VS Code not mark these as invalid syntax you can add the following to your `settings.json`:

```json
"Lua.runtime.nonstandardSymbol": [
  "+=",
  "-=",
  "*=",
  "/="
],
```
