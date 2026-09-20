/**
 * Vertical Tabs Public API
 *
 * Type definitions for interacting with the Vertical Tabs plugin from other Obsidian plugins.
 *
 * @packageDocumentation
 */

import { App, WorkspaceLeaf, WorkspaceParent, Menu, EventRef } from "obsidian";

/**
 * Event reference for menu callbacks
 *
 * Call `unload()` to unregister the callback
 */
export interface MenuEventRef {
  /** Unregister the menu callback */
  unload: () => void;
}

/**
 * Unique identifier for tabs and groups
 */
export type Identifier = string;

/**
 * API version following semantic versioning
 */
export declare const API_VERSION = "1.4.0";

/**
 * Metadata for a tab including custom icon, color, title, and ephemeral status
 */
export interface APITabMetadata {
  /** Unique identifier for the tab */
  id: Identifier;
  /** Custom icon (Lucide icon name) */
  icon?: string;
  /** Custom color (CSS color string) */
  color?: string;
  /** Custom title override */
  title?: string;
  /** Whether the tab is ephemeral (available in version 1.1.0 and later) */
  isEphemeral?: boolean;
}

/**
 * View type for a group (available since API v1.2.0)
 */
export enum GroupViewType {
  /** Default stacked/tab view */
  Default = "vt-default-view",
  /** Continuous scroll view showing all tab contents */
  ContinuousView = "vt-continuous-view",
  /** Side-by-side column view */
  ColumnView = "vt-column-view",
  /** Fullscreen grid overview of all tabs */
  MissionControlView = "vt-mission-control-view",
}

/**
 * Persisted data for a linked folder (available since API v1.2.0)
 */
export interface LinkedFolderData {
  /** Vault-relative path of the linked folder */
  path: string;
  /** Whether the folder was opened recursively */
  recursive: boolean;
  /** Number of files already opened (pagination offset) */
  offset: number;
}

/**
 * Metadata for a group including custom icon, color, title, view type, and visibility state
 */
export interface APIGroupMetadata {
  /** Unique identifier for the group */
  id: Identifier;
  /** Custom icon (Lucide icon name) */
  icon?: string;
  /** Custom color (CSS color string) */
  color?: string;
  /** Custom title override */
  title?: string;
  /**
   * Current view type for this group
   * @since 1.2.0
   */
  viewType?: GroupViewType;
  /**
   * Linked folder data if this group is linked to a vault folder
   * @since 1.2.0
   */
  linkedFolder?: LinkedFolderData;
  /**
   * Whether the group is hidden
   * @since 1.2.0
   */
  isHidden?: boolean;
  /**
   * Whether the group is collapsed
   * @since 1.2.0
   */
  isCollapsed?: boolean;
}

/**
 * Event data emitted when metadata changes
 */
export interface MetadataChangeEvent {
  /** Type of entity that changed */
  type: "tab" | "group";
  /** ID of the entity that changed */
  id: Identifier;
  /** Updated metadata */
  metadata: APITabMetadata | APIGroupMetadata;
  /** Source plugin that triggered the change (optional) */
  source?: string;
}

/**
 * Event data emitted when tabs/groups are opened or closed
 */
export interface RefreshEvent {
  /** IDs of newly opened tabs */
  newTabs: Identifier[];
  /** IDs of newly created groups */
  newGroups: Identifier[];
  /** IDs of closed tabs */
  closedTabs: Identifier[];
  /** IDs of closed groups */
  closedGroups: Identifier[];
}

/**
 * Main public API for Vertical Tabs plugin
 *
 * Access this API from other plugins via:
 * ```typescript
 * const vtPlugin = app.plugins.getPlugin("vertical-tabs");
 * if (vtPlugin?.api) {
 *   await vtPlugin.api.setTabIcon(leaf.id, "check", "my-plugin");
 * }
 * ```
 *
 * Important: Always provide a source parameter to prevent infinite loops
 * when listening to metadata change events.
 */
export declare class VerticalTabsAPI {
  constructor(plugin: any);

  // ===== Tab Customization =====

  /**
   * Set custom icon for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param icon - Lucide icon name (e.g., "check", "file-text")
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the icon is set
   */
  setTabIcon(leafId: Identifier, icon: string, source?: string): Promise<void>;

  /**
   * Set custom color for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param color - CSS color string (e.g., "#ff0000", "red", "rgb(255,0,0)")
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the color is set
   */
  setTabColor(leafId: Identifier, color: string, source?: string): Promise<void>;

  /**
   * Set custom title for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param title - Custom title text
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the title is set
   */
  setTabTitle(leafId: Identifier, title: string, source?: string): Promise<void>;

  /**
   * Set ephemeral status for a tab
   *
   * Ephemeral tabs are automatically closed when they become inactive and another tab is opened,
   * similar to preview tabs in VSCode. This is useful for temporary views or quick previews.
   *
   * @param leafId - ID of the WorkspaceLeaf
   * @param isEphemeral - Whether the tab should be ephemeral
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the ephemeral status is set
   * @since 1.1.0
   */
  setTabEphemeral(leafId: Identifier, isEphemeral: boolean, source?: string): Promise<void>;

  /**
   * Get current metadata for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @returns Promise that resolves to tab metadata or undefined if not found
   */
  getTabMetadata(leafId: Identifier): Promise<APITabMetadata | undefined>;

  /**
   * Clear all custom metadata for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when metadata is cleared
   */
  clearTabMetadata(leafId: Identifier, source?: string): Promise<void>;

  // ===== Group Customization =====

  /**
   * Set custom icon for a group
   * @param groupId - ID of the WorkspaceParent
   * @param icon - Lucide icon name (e.g., "folder", "star")
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the icon is set
   */
  setGroupIcon(groupId: Identifier, icon: string, source?: string): Promise<void>;

  /**
   * Set custom color for a group
   * @param groupId - ID of the WorkspaceParent
   * @param color - CSS color string (e.g., "#00ff00", "green", "rgb(0,255,0)")
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the color is set
   */
  setGroupColor(groupId: Identifier, color: string, source?: string): Promise<void>;

  /**
   * Set custom title for a group
   * @param groupId - ID of the WorkspaceParent
   * @param title - Custom title text
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the title is set
   */
  setGroupTitle(groupId: Identifier, title: string, source?: string): Promise<void>;

  /**
   * Get current metadata for a group
   * @param groupId - ID of the WorkspaceParent
   * @returns Promise that resolves to group metadata or undefined if not found
   */
  getGroupMetadata(groupId: Identifier): Promise<APIGroupMetadata | undefined>;

  /**
   * Clear all custom metadata for a group
   * @param groupId - ID of the WorkspaceParent
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when metadata is cleared
   */
  clearGroupMetadata(groupId: Identifier, source?: string): Promise<void>;

  /**
   * Set the view type for a group
   *
   * The view type controls how tabs are displayed within the group:
   * - `Default` — standard stacked/tab view
   * - `ContinuousView` — all tab contents scrolled continuously
   * - `ColumnView` — tabs displayed side-by-side
   * - `MissionControlView` — fullscreen thumbnail grid of all tabs
   *
   * The view type is persisted and restored on Obsidian restart.
   *
   * @param groupId - ID of the WorkspaceParent
   * @param viewType - Target view type (use `GroupViewType` enum)
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the view type is applied and saved
   * @since 1.2.0
   */
  setGroupViewType(groupId: Identifier, viewType: GroupViewType, source?: string): Promise<void>;

  /**
   * Set the hidden state of a group
   *
   * Hidden groups are not visible in the workspace but remain open. They can be
   * shown again by calling `setGroupHidden(id, false)`.
   *
   * @param groupId - ID of the WorkspaceParent
   * @param isHidden - `true` to hide the group, `false` to show it
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the hidden state is saved
   * @since 1.2.0
   */
  setGroupHidden(groupId: Identifier, isHidden: boolean, source?: string): Promise<void>;

  /**
   * Set the collapsed state of a group
   *
   * Collapsed groups show only their header in the Vertical Tabs sidebar,
   * hiding the tab list. The tabs remain open.
   *
   * @param groupId - ID of the WorkspaceParent
   * @param isCollapsed - `true` to collapse the group, `false` to expand it
   * @param source - Optional source identifier to prevent infinite loops
   * @returns Promise that resolves when the collapsed state is saved
   * @since 1.2.0
   */
  setGroupCollapsed(groupId: Identifier, isCollapsed: boolean, source?: string): Promise<void>;

  // ===== Utilities =====

  /**
   * Get API version
   * @returns API version string (semantic versioning)
   */
  getVersion(): string;

  /**
   * Get WorkspaceLeaf by ID
   * @param leafId - ID of the WorkspaceLeaf
   * @returns WorkspaceLeaf or undefined if not found
   */
  getLeafById(leafId: Identifier): WorkspaceLeaf | undefined;

  /**
   * Get WorkspaceParent by ID (utility not provided by Obsidian)
   * @param groupId - ID of the WorkspaceParent
   * @returns WorkspaceParent or undefined if not found
   */
  getGroupById(groupId: Identifier): WorkspaceParent | undefined;

  /**
   * Get currently active WorkspaceLeaf
   * @returns Currently active WorkspaceLeaf or null
   */
  getActiveLeaf(): WorkspaceLeaf | null;

  /**
   * Get currently active WorkspaceParent (group containing active leaf)
   * @returns Currently active WorkspaceParent or null
   */
  getActiveGroup(): WorkspaceParent | null;

  /**
   * Get all open tab IDs
   * @returns Array of tab IDs
   */
  getAllLeafIds(): Identifier[];

  /**
   * Get all group IDs
   * @returns Array of group IDs
   */
  getAllGroupIds(): Identifier[];

  // ===== Menu Customization =====

  /**
   * Remove all menu items in a section
   *
   * @param menu - Menu instance to modify
   * @param section - Section name to remove
   */
  removeMenuSection(menu: Menu, section: string): void;

  /**
   * Move a section to a new position in the menu
   *
   * @param menu - Menu instance to modify
   * @param section - Section name to move
   * @param after - Section name to place after. If undefined, places at the front.
   *                If the target section is not found, does nothing.
   */
  placeSectionAfter(menu: Menu, section: string, after?: string): void;

  /**
   * Register a callback to add custom menu items to tab context menus
   *
   * @param callback - Function called when a tab menu is being built.
   *                   Receives the Menu instance and the WorkspaceLeaf.
   * @returns MenuEventRef with unload() method to unregister the callback
   *
   * @example
   * ```typescript
   * const ref = api.onTabMenu((menu, leaf) => {
   *   menu.addItem((item) => {
   *     item.setTitle("Custom Action").onClick(() => { ... });
   *   });
   * });
   * // Later: ref.unload() to stop receiving events
   * ```
   */
  onTabMenu(callback: (menu: Menu, leaf: WorkspaceLeaf) => void): MenuEventRef;

  /**
   * Register a callback to add custom menu items to the multi-select tab context menu
   *
   * Fired when multiple tabs are selected and the user opens a context menu on a selected tab.
   * `onTabMenu` is not called for that menu.
   *
   * @param callback - Function called when a multi-select tab menu is being built.
   *                   Receives the Menu instance and the selected WorkspaceLeaf objects.
   * @returns MenuEventRef with unload() method to unregister the callback
   * @since 1.4.0
   *
   * @example
   * ```typescript
   * const ref = api.onTabsMenu((menu, leaves) => {
   *   menu.addItem((item) => {
   *     item.setTitle("Custom Action").onClick(() => { ... });
   *   });
   * });
   * // Later: ref.unload() to stop receiving events
   * ```
   */
  onTabsMenu(callback: (menu: Menu, leaves: WorkspaceLeaf[]) => void): MenuEventRef;

  /**
   * Register a callback to add custom menu items to group context menus
   *
   * @param callback - Function called when a group menu is being built.
   *                   Receives the Menu instance and the WorkspaceParent.
   * @returns MenuEventRef with unload() method to unregister the callback
   *
   * @example
   * ```typescript
   * const ref = api.onGroupMenu((menu, group) => {
   *   menu.addItem((item) => {
   *     item.setTitle("Custom Action").onClick(() => { ... });
   *   });
   * });
   * // Later: ref.unload() to stop receiving events
   * ```
   */
  onGroupMenu(callback: (menu: Menu, group: WorkspaceParent) => void): MenuEventRef;

  /**
   * Check if a menu was created by Vertical Tabs
   *
   * @param menu - Menu instance to check
   * @returns `true` if the menu was created by Vertical Tabs, `false` otherwise
   * @since 1.0.1
   */
  isVTMenu(menu: Menu): boolean;
}

/**
 * Type augmentation for the Vertical Tabs plugin
 *
 * Use this to get proper typing when accessing the plugin:
 * ```typescript
 * const vtPlugin = app.plugins.getPlugin("vertical-tabs") as VerticalTabsPlugin;
 * if (vtPlugin?.api) {
 *   await vtPlugin.api.setTabIcon(leaf.id, "check");
 * }
 * ```
 */
export interface VerticalTabsPlugin {
  api: VerticalTabsAPI;
}

/**
 * Run a one-off callback with the Vertical Tabs API when it is available.
 *
 * Exposed as `window.withVT` while the plugin is loaded (console, user scripts).
 * In plugin projects, import from `obsidian-vertical-tabs-api`.
 *
 * @param fn - Callback receiving the API
 * @param app - Optional Obsidian app instance (omit in the console; uses `window.app`)
 * @returns The callback return value, or `undefined` if the API is unavailable (callback not called)
 *
 * @example
 * ```typescript
 * withVT((api) => {
 *   console.log(api.getVersion());
 * });
 * ```
 */
export declare function withVT<T>(fn: (api: VerticalTabsAPI) => T, app?: App): T | undefined;

declare global {
  interface Window {
    /**
     * Global one-off Vertical Tabs API access (console, user scripts).
     * Present while the plugin is loaded; removed on unload.
     */
    withVT?: typeof withVT;
  }
}

/**
 * Workspace event augmentation for Vertical Tabs plugin
 *
 * Subscribe to these events to react to plugin lifecycle and metadata changes:
 * ```typescript
 * // Plugin loaded and API is available
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:load", () => {
 *     console.log("Vertical Tabs API is ready");
 *   })
 * );
 *
 * // Plugin is about to unload
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:unload", () => {
 *     console.log("Vertical Tabs is unloading");
 *   })
 * );
 *
 * // Tab or group metadata changed
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:metadata-changed", (event) => {
 *     console.log(`${event.type} ${event.id} changed by ${event.source}`);
 *   })
 * );
 *
 * // Tabs or groups opened/closed
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:refresh", (event) => {
 *     console.log(`New tabs: ${event.newTabs.length}, Closed: ${event.closedTabs.length}`);
 *   })
 * );
 *
 * // Paint a sidebar tab icon (available since 1.3.0)
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:render-tab-icon", (leaf, iconEl, tabEl) => {
 *     iconEl.empty();
 *     iconEl.createSpan({ text: "⭐" });
 *   })
 * );
 * this.app.workspace.trigger("vertical-tabs:request-icon-refresh");
 *
 * // Add items to a tab context menu (available since 1.4.0)
 * this.registerEvent(
 *   this.app.workspace.on("vertical-tabs:on-tab-menu", (menu, leaf) => {
 *     menu.addItem((item) => {
 *       item.setTitle("Custom Action").setSection("my-plugin");
 *     });
 *   })
 * );
 * ```
 */
declare module "obsidian" {
  interface Menu {
    /**
     * Set when `isVTMenu` is `true`. Identifies the specific Vertical Tabs menu that was opened.
     *
     * Possible values:
     * - `"vt-tab-menu"` — tab context menu
     * - `"vt-multi-select-menu"` — multi-select tab context menu
     * - `"vt-group-menu"` — group context menu
     * - `"vt-sort-menu"` — sort menu in the navigation header
     * - `"vt-tab-switcher-menu"` — tab switcher menu
     * - `"vt-status-bar-menu"` — zen mode status bar menu
     * - `"vt-nav-history-menu"` — navigation history menu (back/forward)
     *
     * @since 1.0.1
     */
    VTMenuAttribute?: string;
  }

  interface MenuItem {
    /**
     * Set on built-in Vertical Tabs menu items. Identifies the specific action.
     * Absent on separators, plugin-added items, and items copied from Obsidian's pane menu.
     *
     * Tab menu (`vt-tab-menu`):
     * `"bookmark"`, `"bookmark-and-close"`, `"default-view"`, `"continuous-view"`,
     * `"column-view"`, `"mission-control-view"`, `"close"`, `"close-others"`,
     * `"close-tabs-to-top"`, `"close-tabs-to-bottom"`, `"close-all"`, `"pin"`,
     * `"rename"`, `"set-color"`, `"set-icon"`, `"move-to-new-window"`, `"split-right"`,
     * `"split-down"`, `"open-in-new-window"`, `"move-tab"`, `"copy-as-internal-link"`,
     * `"copy-as-embed"`, `"insert-as-internal-link"`, `"insert-as-embed"`, `"back"`,
     * `"forward"`, `"browse-history"`, `"bookmark-history"`, `"open-history-in-new-group"`,
     * `"clear-history"`, `"inactive"`, `"load-history"`, `"zoom"`, `"zoom-in"`,
     * `"zoom-out"`, `"reset-zoom"`, `"more-options"`, `"toggle-reader-mode"`,
     * `"save-to-vault"`, `"new-group"`, `"new-group-with-name"`
     *
     * Multi-select menu (`vt-multi-select-menu`):
     * `"close"`, `"pin-all"`, `"unpin-all"`, `"set-color"`, `"set-icon"`,
     * `"move-to-new-window"`, `"move-tabs"`, `"copy-as-internal-links"`,
     * `"copy-as-embeds"`, `"bookmark"`, `"new-group"`, `"new-group-with-name"`
     *
     * Group menu (`vt-group-menu`):
     * `"hide"`, `"rename"`, `"set-color"`, `"set-icon"`, `"default-view"`,
     * `"continuous-view"`, `"column-view"`, `"mission-control-view"`, `"bookmark-all"`,
     * `"bookmark-and-close-all"`, `"close-all"`, `"copy-as-internal-links"`,
     * `"copy-as-list"`, `"copy-as-embeds"`, `"insert-as-internal-links"`,
     * `"insert-as-list"`, `"insert-as-embeds"`
     *
     * @since 1.4.0
     */
    VTMenuAction?: string;
  }

  interface App {
    /**
     * Get the Vertical Tabs plugin instance
     *
     * @returns The plugin instance if installed and enabled, `null` otherwise
     */
    plugins: {
      getPlugin: (id: "vertical-tabs") => VerticalTabsPlugin | null;
    };
  }
}

declare module "obsidian" {
  interface Workspace {
    /** Fired when Vertical Tabs plugin loads and API becomes available */
    on(name: "vertical-tabs:load", callback: () => void): EventRef;
    /** Fired when Vertical Tabs plugin unloads */
    on(name: "vertical-tabs:unload", callback: () => void): EventRef;
    /** Fired when tab or group metadata changes */
    on(name: "vertical-tabs:metadata-changed", callback: (event: MetadataChangeEvent) => void): EventRef;
    /** Fired when tabs or groups are opened or closed (only if changes detected) */
    on(name: "vertical-tabs:refresh", callback: (event: RefreshEvent) => void): EventRef;
    /**
     * Fired after Vertical Tabs paints a sidebar tab icon.
     * Not fired when a user-set Vertical Tabs icon, the Alt+hover grip, or a webview favicon is showing.
     *
     * @param leaf - The WorkspaceLeaf associated with the tab
     * @param iconEl - The icon element of the tab row (in Vertical Tabs sidebar)
     * @param tabEl - The tab row itself (in Vertical Tabs sidebar)
     *
     * @since 1.3.0
     */
    on(
      name: "vertical-tabs:render-tab-icon",
      callback: (leaf: WorkspaceLeaf, iconEl: HTMLElement, tabEl: HTMLElement) => void
    ): EventRef;
    /**
     * Fired after Vertical Tabs paints a sidebar group icon.
     * Not fired when a user-set Vertical Tabs group icon is showing.
     *
     * @param group - The WorkspaceParent associated with the group
     * @param iconEl - The icon element of the group row (in Vertical Tabs sidebar)
     * @param groupEl - The group row itself (in Vertical Tabs sidebar)
     *
     * @since 1.3.0
     */
    on(
      name: "vertical-tabs:render-group-icon",
      callback: (group: WorkspaceParent, iconEl: HTMLElement, groupEl: HTMLElement) => void
    ): EventRef;
    /**
     * Ask Vertical Tabs to re-paint every visible sidebar icon slot.
     * Trigger this after registering listeners (if Vertical Tabs is already running)
     * or when your icon data changes. No-op if Vertical Tabs is not loaded.
     * @since 1.3.0
     */
    on(name: "vertical-tabs:request-icon-refresh", callback: () => void): EventRef;
    /**
     * Fired after Vertical Tabs builds a single-tab context menu.
     * Equivalent to `api.onTabMenu`. Do not register both for the same handler.
     *
     * @param menu - The Menu instance being built
     * @param leaf - The WorkspaceLeaf the menu is for
     *
     * @since 1.4.0
     */
    on(
      name: "vertical-tabs:on-tab-menu",
      callback: (menu: Menu, leaf: WorkspaceLeaf) => void
    ): EventRef;
    /**
     * Fired after Vertical Tabs builds the multi-select tab context menu.
     * Equivalent to `api.onTabsMenu`. Do not register both for the same handler.
     * Not fired for a single-tab menu.
     *
     * @param menu - The Menu instance being built
     * @param leaves - The selected WorkspaceLeaf objects
     *
     * @since 1.4.0
     */
    on(
      name: "vertical-tabs:on-tabs-menu",
      callback: (menu: Menu, leaves: WorkspaceLeaf[]) => void
    ): EventRef;
    /**
     * Fired after Vertical Tabs builds a group context menu.
     * Equivalent to `api.onGroupMenu`. Do not register both for the same handler.
     *
     * @param menu - The Menu instance being built
     * @param group - The WorkspaceParent the menu is for
     *
     * @since 1.4.0
     */
    on(
      name: "vertical-tabs:on-group-menu",
      callback: (menu: Menu, group: WorkspaceParent) => void
    ): EventRef;
  }
}
