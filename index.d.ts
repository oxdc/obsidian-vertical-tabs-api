/**
 * Vertical Tabs Public API
 *
 * Type definitions for interacting with the Vertical Tabs plugin from other Obsidian plugins.
 *
 * @packageDocumentation
 */

import { WorkspaceLeaf, WorkspaceParent } from "obsidian";

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
}

/**
 * Main public API for Vertical Tabs plugin
 *
 * Access this API from other plugins via:
 * ```typescript
 * const vtPlugin = app.plugins.getPlugin("vertical-tabs");
 * if (vtPlugin?.api) {
 *   await vtPlugin.api.setTabIcon(leaf.id, "check");
 * }
 * ```
 */
export declare class VerticalTabsAPI {
  constructor(plugin: any);

  // ===== Tab Customization =====

  /**
   * Set custom icon for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param icon - Lucide icon name (e.g., "check", "file-text")
   * @returns Promise that resolves when the icon is set
   */
  setTabIcon(leafId: Identifier, icon: string): Promise<void>;

  /**
   * Set custom color for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param color - CSS color string (e.g., "#ff0000", "red", "rgb(255,0,0)")
   * @returns Promise that resolves when the color is set
   */
  setTabColor(leafId: Identifier, color: string): Promise<void>;

  /**
   * Set custom title for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @param title - Custom title text
   * @returns Promise that resolves when the title is set
   */
  setTabTitle(leafId: Identifier, title: string): Promise<void>;

  /**
   * Get current metadata for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @returns Promise that resolves to tab metadata or undefined if not found
   */
  getTabMetadata(leafId: Identifier): Promise<APITabMetadata | undefined>;

  /**
   * Clear all custom metadata for a tab
   * @param leafId - ID of the WorkspaceLeaf
   * @returns Promise that resolves when metadata is cleared
   */
  clearTabMetadata(leafId: Identifier): Promise<void>;

  // ===== Group Customization =====

  /**
   * Set custom icon for a group
   * @param groupId - ID of the WorkspaceParent
   * @param icon - Lucide icon name (e.g., "folder", "star")
   * @returns Promise that resolves when the icon is set
   */
  setGroupIcon(groupId: Identifier, icon: string): Promise<void>;

  /**
   * Set custom color for a group
   * @param groupId - ID of the WorkspaceParent
   * @param color - CSS color string (e.g., "#00ff00", "green", "rgb(0,255,0)")
   * @returns Promise that resolves when the color is set
   */
  setGroupColor(groupId: Identifier, color: string): Promise<void>;

  /**
   * Set custom title for a group
   * @param groupId - ID of the WorkspaceParent
   * @param title - Custom title text
   * @returns Promise that resolves when the title is set
   */
  setGroupTitle(groupId: Identifier, title: string): Promise<void>;

  /**
   * Get current metadata for a group
   * @param groupId - ID of the WorkspaceParent
   * @returns Promise that resolves to group metadata or undefined if not found
   */
  getGroupMetadata(groupId: Identifier): Promise<APIGroupMetadata | undefined>;

  /**
   * Clear all custom metadata for a group
   * @param groupId - ID of the WorkspaceParent
   * @returns Promise that resolves when metadata is cleared
   */
  clearGroupMetadata(groupId: Identifier): Promise<void>;

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
