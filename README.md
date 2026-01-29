# Vertical Tabs API

Public API for customizing tabs and groups in the Vertical Tabs plugin for Obsidian.

## Installation

```bash
npm install obsidian-vertical-tabs-api
```

## Quick Start

```typescript
import { App, Plugin } from "obsidian";
import { VerticalTabsAPI } from "obsidian-vertical-tabs-api";

export default class MyPlugin extends Plugin {
  async onload() {
    // Access the Vertical Tabs API
    const vtPlugin = this.app.plugins.getPlugin("vertical-tabs");
    if (!vtPlugin?.api) {
      console.warn("Vertical Tabs plugin not found or API not available");
      return;
    }

    const api: VerticalTabsAPI = vtPlugin.api;
    
    // Check API version
    console.log("Vertical Tabs API version:", api.getVersion());
    
    // Customize tabs and groups
    const activeLeaf = api.getActiveLeaf();
    if (activeLeaf) {
      await api.setTabIcon(activeLeaf.id, "star");
      await api.setTabColor(activeLeaf.id, "#ff0000");
    }
  }
}
```
