---
title: Installation
description: How to install ThairaAI on macOS, Windows, and Linux.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

## Download

Download the latest release from [GitHub Releases](https://github.com/joaothaira/ThairaAI/releases).

<Tabs>
  <TabItem label="macOS">
    Download the `.dmg` file, open it, and drag ThairaAI to your Applications folder.

    Or install via Homebrew:

    ```bash
    brew install thairaai
    ```
  </TabItem>
  <TabItem label="Windows">
    Download the `.exe` installer and run it. Windows may show a SmartScreen warning for unsigned apps — click **More info → Run anyway**.
  </TabItem>
  <TabItem label="Linux">
    Download the `.AppImage` or `.deb` package.

    ```bash
    # AppImage
    chmod +x ThairaAI-*.AppImage
    ./ThairaAI-*.AppImage

    # Debian/Ubuntu
    sudo dpkg -i ThairaAI-*.deb
    ```
  </TabItem>
</Tabs>

## Build from source

If you want to run the development version or contribute:

### Prerequisites

- [Bun](https://bun.sh) 1.0+
- Node.js 18+
- Git

### Steps

```bash
git clone https://github.com/joaothaira/ThairaAI.git
cd ThairaAI
cp .env.example .env   # add your Google OAuth credentials
bun install
bun run start
```

See [Development Setup](/contributing/development-setup/) for the full environment configuration.
