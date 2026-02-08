/**
 * Vertical Tabs Public API
 *
 * Type definitions for interacting with the Vertical Tabs plugin from other Obsidian plugins.
 *
 * @packageDocumentation
 */

import { WorkspaceLeaf, WorkspaceParent, Menu } from "obsidian";

/**
 * Event reference for menu callbacks
 */
export interface MenuEventRef {
  unload: () => void;
}

/**
 * Unique identifier for tabs and groups
 */
export type Identifier = string;

/**
 * API version following semantic versioning
 */
export declare const API_VERSION = "1.0.0";

/**
 * Metadata for a tab including custom icon, color, and title
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
}

/**
 * Metadata for a group including custom icon, color, and title
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
   * @returns MenuEventRef that can be used to unregister the callback
   */
  onTabMenu(callback: (menu: Menu, leaf: WorkspaceLeaf) => void): MenuEventRef;

  /**
   * Register a callback to add custom menu items to group context menus
   * 
   * @param callback - Function called when a group menu is being built.
   *                   Receives the Menu instance and the WorkspaceParent.
   * @returns MenuEventRef that can be used to unregister the callback
   */
  onGroupMenu(callback: (menu: Menu, group: WorkspaceParent) => void): MenuEventRef;
}

/**
 * Type augmentation for the Vertical Tabs plugin
 *
 * Use this to get proper typing when accessing the plugin:
 * ```typescript
 * import { VerticalTabsPlugin } from "obsidian-vertical-tabs-api";
 *
 * const vtPlugin = app.plugins.getPlugin("vertical-tabs") as VerticalTabsPlugin;
 * if (vtPlugin?.api) {
 *   await vtPlugin.api.setTabIcon(leaf.id, "check");
 * }
 * ```
 */
export interface VerticalTabsPlugin {
  api: VerticalTabsAPI;
}
