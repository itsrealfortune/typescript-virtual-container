# Task: Desktop — missing features

**Priority:** P1
**Estimated effort:** 2 weeks
**Dependencies:** None

## Context

The simulated XFCE desktop (1574 lines) is functional but lacks important features for a complete user experience.

## Subtasks

### 1. Multiple workspaces
- [ ] Add workspace switching support (4 by default like XFCE)
- [ ] Panel indicator showing the active workspace
- [ ] Keyboard shortcuts: Ctrl+Alt+F1-F4
- [ ] Move a window to another workspace
- [ ] Workspace Pager in the panel

### 2. Desktop icons
- [ ] Display "Home" and "Trash" icons on the desktop
- [ ] Support drag-and-drop desktop ↔ Thunar
- [ ] Desktop context menu (New Folder, Open Terminal, Paste)
- [ ] Snap to grid

### 3. Login screen / user switching
- [ ] Graphical login screen (lightdm-like)
- [ ] User selection with avatar
- [ ] Session logout
- [ ] Switch user from the panel
- [ ] Isolated `/home/user` sessions with separate VFS

### 4. Notification system
- [ ] Notification area in the panel
- [ ] Toast notifications (file operations complete, errors)
- [ ] Notification history
- [ ] Integration with Honeypot events for security alerts

### 5. Enhanced system tray
- [ ] Clock with date tooltip and calendar
- [ ] Network manager indicator
- [ ] Volume indicator (simulated)
- [ ] Battery indicator (if relevant)
- [ ] Systray icons for running apps

### 6. Application search
- [ ] Search bar in the Applications menu
- [ ] Search via Super/Windows key
- [ ] Results with categories and descriptions

### 7. File search (CTRL+F)
- [ ] Search bar in Thunar
- [ ] Real-time search with debounce
- [ ] Filters (name, type, date, size)

### 8. System clipboard
- [ ] Shared clipboard between apps (Thunar ↔ Mousepad)
- [ ] Copy/paste between terminals
- [ ] Clipboard manager with history

### 9. Advanced window manager
- [ ] Window snapping (drag to edge → half-screen, drag to corner → quarter)
- [ ] Shortcuts: Super+Left/Right for tiling
- [ ] Alt+Tab switcher with thumbnails
- [ ] Window always on top
- [ ] Window grouping by application

### 10. Customization
- [ ] Change wallpaper (desktop context menu)
- [ ] Themes (dark/light mode)
- [ ] Font size
- [ ] Panel configuration (position, size, auto-hide)

### 11. Keyboard shortcuts panel
- [ ] Keyboard shortcuts dialog (Super+S)
- [ ] Configurable shortcuts
- [ ] Exhaustive shortcut list with descriptions

## Acceptance Criteria

- Each feature is functional in the browser
- Existing tests (if any) continue to pass
- Web bundle size increases by no more than 15% (current budget ~35KB minified)
- localStorage persistence works for new features
- Panel remains responsive with 20+ open windows

## Notes

- Desktop is browser-only (`document`/`window` required)
- Use headless tests (Playwright) or conditional skip in CI
- `src/modules/desktopManager.ts` contains all the logic
- `src/commands/startxfce4.ts`, `src/commands/xfceDesktop.ts`, `src/commands/mousepad.ts`
- `src/modules/webTermRenderer.ts` for web terminals
- `demo/app.js` is the web entry point
