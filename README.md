# How to setup on Windows

*\* Unfortunately I do not know what may be required to install on Mac*

1. Make sure most recent version of Node.js is installed and you follow the install prompts to install additional tools which will include visual studio build tools and python etc.
    - Link to download: https://nodejs.org/en/download/
    - Recommend downloading the LTS version
    - For me currently the downloaded installer version is: `node-v18.12.1-x64.msi`
    - During install make sure you select `Automatically install the necessary tools...`: ![](https://user-images.githubusercontent.com/64155612/206804517-06fa458f-df72-4d83-82a2-fdd65c130173.png)
    - After install of Node.js is complete, a PowerShell window will open and ask you to `Press and key to continue...` in order to install the necessary VS Tools to compile native modules. You MUST complete this. ![](https://user-images.githubusercontent.com/64155612/206805251-4a8eed8e-6fec-4aa0-b845-413cf428e445.png)
    - You should see PowerShell start the install and show something like the following: ![](https://user-images.githubusercontent.com/64155612/206805448-73aade13-b2e3-42ab-a698-c963391c3349.png)
    - It should take a couple minutes to finish at which point you will see a message confirming success and telling you to `Type ENTER to exit:`. You are now ready to continue with the next step. ![](https://user-images.githubusercontent.com/64155612/206805740-9cb4f119-d5bb-44e3-b0ac-fe2aa573cd18.png)
2. Because of some old dependencies, even when you install the latest version of Visual Studio Build Tools via Nodejs (Step 1 above) you still need to manually install the legacy 2017 MSVC build tools by doing the following:
    - Download `Build Tools for Visual Studio 2022` installer (or whatever the current version shows today) from https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022 ![](https://user-images.githubusercontent.com/64155612/206849940-2f4458fd-343e-4ecc-ba28-4e09379e7825.png)
    - Launch the downloaded VS Build Tools installer `vs_BuildTools.exe`
    - Select `Desktop development with C++` checkbox ![](https://user-images.githubusercontent.com/64155612/206849963-5cc152c5-6ad2-49bb-a3c9-4d0363eed4ed.png)
    - On the right, expand `Desktop development with C++`, in the Optional section leave everything that is already checked as is and then make sure `MSVC v141 - VS 2017 C++...` (towards the bottom) is checked ![](https://user-images.githubusercontent.com/64155612/206851802-b28fded5-1754-4ae9-8838-621c2d56a47c.png)
    - Now click `Install` and wait for the install to complete.
3. You should now Reboot your computer to ensure all the new tools are available.
4. Download the GTK 2 bundle (MUST be GTK2 and NOT GTK3) for [Win32](https://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) or [Win64](https://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip). Unzip the contents to `C:\GTK`. (see [here](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows#2-installing-gtk-2) for more info)
    - NOTE: I have included the win64 version of GTK2 in this repo in the `resources` folder: `gtk+-bundle_2.22.1-20101229_win64.zip`
    - After download and extraction, it should look like this: ![GTK2 folder structure](https://user-images.githubusercontent.com/64155612/206803337-127c98b1-47e2-4c26-9f64-fdbe3168b1ea.jpg)
5. Clone this repository using: `https://github.com/GitMurf/help.git`
6. Now follow the code block below (PowerShell) to install the project and run it for the first time (which will give you the error as described here: https://github.com/GitMurf/help/issues/1 which leads to my post here about the goals to fix: https://github.com/GitMurf/help/issues/2)

**IMPORTANT**: You MUST follow steps 1 - 3 above before running the code below.

```powershell
cd "CLONED-REPO-LOCAL-DIRECTORY\electron-pdf-node-canvas-help"
$env:npm_config_msvs_version = "2017"
npm install
npm run rebuild
```

After running `npm run rebuild` you should see an error similar to the following `Canvas.obj : error LNK2019: unresolved external symbol ... ArrayBuffer::GetBackingStore(void) ... Rebuild Failed` (also see screenshot). If you see a different error about `GTK / Cairo` OR about `error C2429: language feature 'terse static assert' requires compiler flag '/std:c++17'` then you likely did not follow the steps above correctly.) ![](https://user-images.githubusercontent.com/64155612/206852679-113768db-03b2-43c6-82bc-c7c4248ac4c0.png)

**Now you are as far as I have gotten and have the same error I am trying to troubleshoot and solve by converting node-canvas to use N-API instead of NAN.**