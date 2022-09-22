# Setting up a Development Environment

This readme describes how to setup a developer and debug environment for those working on web browser based visualization tools and Freedom Studio. This environment supports source code debugging in both the browser and Freedom Studio, while maintaining the network connection between FS and the browser.

We will use Visual Studio Code to setup the browser development environment.

The Freedom Studio development environment is as it always was and is described in the FS repo. A Freedom Studio development environment is not strictly required if you are not developing or debugging Freedom Studio code. In this case, just an installed Freedom Studio can be used.

The environment described here is on a Linux host system. At the end of this document we'll cover how to modify this environment so that VSCode can be run on different host (Windows, Linux, or MacOS) while developing and debugging browser web-apps running on the original Linux host.

This same environment can also be setup on Windows and MacOS with minor adjustments in the setup.

## Setting Up the Visual Studio Code Environment

- Install Visual Studio Code
- Install the [JavaScript Debugger extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug-nightly) into VSCode
- Clone the vcdrom repo (`> git clone git@github.com:sifive/vcdrom.git
`) The default branch is named `websocket-kjm`, make sure that is what you have in your clone.
- Open the repo folder in Visual Studio Code (`File -> Open Folder`)
- Open a Terminal in Visual Studio Code (`View -> Terminal`)

## Sequence of Operations

This is the general sequence of operations to start a debug session.  Each step is describe in more detail later.

### First steps
- Start Freedom Studio
- Start Chrome in _remote debug mode_
- Connect Visual Studio Code to Chrome

If managed carefully, you should only need to do these once when firing up your development environment session.  Of course you can always terminate everything and start fresh, but you generally should not have to restart FS, Chrome, or VSCode whilst in your debug/modify/build loop.  You should be able to make code modifications, rebuild the web app, install it, and reload the visualization without redoing these steps.

### Build/Install/Debug Loop

1. Build and Install the Web App
1. Open a visualization from FS
1. Debug
1. Modify Code
1. Goto Step 1


## More Detail

### Starting Freedom Studio

Start Freedom Studio either under an Eclipse debug session, or an installed instance. Starting Freedom Studio will also start the http-server-relay that handles communication between FS and the web apps.

This guide assumes you have an FS workspace already setup with any projects you need to work on your development tasks. (For instance, simulation experiments that you want to open in the Pipeline Viewer).

### Start Chrome in Remote Debug Mode

In order to attach Visual Studio Code to Chrome, Chrome needs to be started in remote debug mode.

First ensure that no Chrome instances are running. This will ensure that FS does not use a running instance that is not running in debug mode.

Open a terminal and start chrome using this command:

`google-chrome --remote-debugging-port=9222`

The port number is not important or reserved, but this guide uses this port number consistently. The committed launch configuration uses this port number.

This will start Chrome, hopefully with a single blank tab (though you may need to sign into a profile to get thing going).  I suggest always leaving a blank tab open, and closing any other tabs.  This will minimize debugger clutter and keep the debug instance of Chrome running even if you close all visualizers.

When Chrome starts you should see a message very much like this printed on the terminal:

`DevTools listening on ws://127.0.0.1:9222/devtools/browser/cd0a8986-4980-45d3-a489-a0e59f3d05fe`

This indicates that Chrome is ready to debugger attachment.  If, instead, you see a message indicating that Chrome is opening a new tab in an existing process, then you may have another Chrome process running already someplace on the system.  Try `killall google-chrome`.  If that kills any process, you can restart Chrome in debug mode again.  If you continue to see the "exiting process" message, you will likely need to reboot Linux, then try again.

### Connect Visual Studio Code to Chrome

- Open the Debug Panel in Visual Studio Code. It is the icon with the bug and play arrow.
- At the top of the Debug Panel, select the `Local Chrome Attach` launch configuration.
- Hit `F5` to start the debugger and attach to the running Chrome instance.

Diagnose and fix any connection issues before moving on...

### Build and Install the Web App
To build the web apps you need to have `node` version 16 or newer installed.  Google that.

The web apps need to be built in debug mode.  This is done in the terminal using these commands:

`> npm i`
`>./build.sh -d`

Run those commands to ensure that everything is building successfully.  You only need to run `npm i` once.  This installs all the dependencies.

You will not run `build.sh` regularly, but instead use `install_to_dev.sh` which runs `build.sh` within and installs the web app into the running instance of Freedom Studio.

The `install_to_dev.sh` script depends on having a couple environment variables in order to know where to install the web apps.  When you run the script these are checked and the script will exit if they are not defined.

- FS_ROOTDIR should point to the dev-root folder (anyone doing FS development will have this defined already)
- FS_WS should point to the workspace folder of the running FS instance.

These are critical to getting a successful debug session running.

With all that out of the way, you can should be able to run the script.  But it is recommended that you close any visualizations before building (primarily so you know that all visualizations are running your latest code).

Run the script from the terminal:

`> ./install_to_dev.sh`

### Open a visualization from FS

So it important that Visual Studio Code be attached to Chrome before opening the visualization web app because the web app loading process is how the JavaScript debugger knows what web app files are loaded.  If the web app is loaded before attaching the debugger, the debugger cannot map loaded scripts to local files, making debugging a lot less friendly.

With the debug panel open in VSCode, load the visualization from Freedom Studio (for instance, double click an experiment VCD file to open the Pipeline Viewer).  During the loading process you will see activity in the Debug Panel things get loaded.

After the web app loads, looks for the "Loaded Script" sub-panel in the Debug Panel.  This lists all of the loaded scripts.  You should see a folder entry like `~/git/vcdrom` (though it may be different on your system depending on where you cloned the vcdrom repo to).  Everything of interest is within this folder, and primarily within the `lib` folder inside.

If you don't see this "mapped" folder, then we got some setup issues to debug.  It is critical to get this right otherwise the debugger will not properly map loaded scripts to local files in your development environment, and you will not be able to set breakpoints.

### Debug!

You are on your own here.  You can set breakpoints, look at variables, etc...

If you make any code modifications, you will need to invoke the build/install/debug loop to run the new code.

## Helpful Links

- https://stackoverflow.com/questions/65200278/vscode-settings-how-to-get-a-hostname-when-using-remote-ssh
