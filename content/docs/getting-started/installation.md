---
title: Installation
weight: 1
description: Install the Schemo desktop app from GitHub Releases.
---

Download the package for your platform from [Schemo Releases](https://github.com/schemo-app/schemo/releases/latest). This documentation covers Schemo **0.5.0**.

## macOS

Open the universal `.dmg` and drag **Schemo** into **Applications**. The app supports Apple silicon and Intel Macs running macOS 12 or later.

## Windows

Run the x64 installer on Windows 10 or later. Schemo uses Microsoft Edge WebView2. If WebView2 is missing, the installer can install the runtime.

## Linux

Install the amd64 `.deb` on a compatible Debian-based system. Schemo uses GTK 3 and WebKitGTK 4.1.

```sh
sudo apt install ./schemo-linux-amd64.deb
```

## First launch

Open Schemo and use the **Personal** workspace. You can send requests and save collections without an account. Follow the [quick start]({{< relref "quick-start" >}}) to send your first request.

For installation errors or help with updates, see [Troubleshooting]({{< relref "/support" >}}).
