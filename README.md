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
      await api.setTabIcon(activeLeaf.id, "star", "my-plugin");
      await api.setTabColor(activeLeaf.id, "#ff0000", "my-plugin");
    }

    // Register custom menu items
    this.registerEvent(
      api.onTabMenu((menu, leaf) => {
        menu.addItem((item) => {
          item
            .setTitle("My custom action")
            .setSection("my-plugin")
            .onClick(() => {
              console.log("Custom action for tab:", leaf.id);
            });
        });
      })
    );
  }
}
```

## Icon rendering (v1.3.0)

Paint sidebar tab and group icons with arbitrary DOM (emoji, images, unregistered SVG). These are workspace events, not `VerticalTabsAPI` methods. If Vertical Tabs is not loaded, nothing fires.

```typescript
this.registerEvent(
  this.app.workspace.on("vertical-tabs:render-tab-icon", (leaf, iconEl, tabEl) => {
    const file = leaf.view.file;
    if (!file) return;
    iconEl.empty();
    iconEl.createSpan({ text: "⭐" });
  })
);
this.app.workspace.trigger("vertical-tabs:request-icon-refresh");
```

Use `vertical-tabs:render-group-icon` the same way for groups (`group`, `iconEl`, `groupEl`). Trigger `vertical-tabs:request-icon-refresh` after you register listeners and whenever your icon data changes.

See [Icon Rendering](https://vertical-tabs-docs.oxdc.dev/API/icons) for precedence, lifecycle, and async notes.
