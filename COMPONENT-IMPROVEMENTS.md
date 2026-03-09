# Component Improvements Tracking

This document tracks the progress of component improvements to maximize DSR usage.

**Started:** 2026-02-04
**Completed:** 2026-02-04
**Target:** 6 components improved

---

## Progress

| Component | Status | Description |
|-----------|--------|-------------|
| TreeView | **Done** | Added controlled expansion props (expandedItems, onExpandedItemsChange) |
| Uploader | **Done** | Exported IMAGE_TYPES, FILE_TYPES constants and presets |
| DatePicker | **Done** | Migrated from HTML fallback to real DSR component |
| DateRangePicker | **Done** | Migrated from HTML fallback to real DSR component |
| RichTextEditor | **Done** | Added placeholder prop |
| FileBox | **Done** | Added onDownload, onPreview callbacks |

---

## Summary of Changes

### TreeView (`src/components/ui/tree-view.tsx`)

**New Props:**
- `expandedItems?: string[]` - Controlled expansion
- `onExpandedItemsChange?: (event, itemIds) => void` - Expansion callback

**Note:** Selection props (multiSelect, checkboxSelection, etc.) are not supported by the underlying DSR TreeView.
For custom checkboxes or badges, use `leadingContent` on individual items.

---

### Uploader (`src/components/ui/uploader.tsx`)

**New Exports:**
- `IMAGE_TYPES` - File MIME type constants for images
- `FILE_TYPES` - File MIME type constants for documents
- `UPLOADER_ACCEPT_PRESETS` - Convenience presets:
  - `images`: PNG, JPEG, GIF, WebP
  - `documents`: PDF
  - `spreadsheets`: CSV, XLS, XLSX
  - `videos`: MP4, WebM
  - `audio`: MP3, WAV, OGG
  - `all`: Common mix

---

### DatePicker (`src/components/ui/date-picker.tsx`)

**Migration:** HTML `<input type="date">` → DSR DatePicker

**New Props:**
- `dateType?: 'date' | 'time' | 'dateTime' | 'yearMonth'`
- `size?: 'small' | 'medium' | 'large'`
- `helper?: string`
- `hasError?: boolean`
- `isClearable?: boolean`
- `openOnInputClick?: boolean`
- `areFutureDatesDisabled?: boolean`
- `arePastDatesDisabled?: boolean`
- `is24Hours?: boolean`
- `timeSteps?: { hours?: number; minutes?: number }`
- `format?: string`
- `locale?: Locale`

**New Exports:**
- `DATE_PICKER_TYPES`
- `DATE_PICKER_SIZES`
- `DATE_FORMATS`

---

### DateRangePicker (`src/components/ui/date-range-picker.tsx`)

**Migration:** HTML `<input type="date">` × 2 → DSR DateRangePicker

**New API (backwards compatible with legacy props):**
- `value?: [Date | null, Date | null]` - Combined value
- `onChange?: (range) => void` - Combined handler
- `orientation?: 'horizontal' | 'vertical'`
- `isMultiInput?: boolean`
- `calendarsNumber?: 1 | 2`
- `showShortcuts?: boolean`
- `shortcuts?: DateRangeShortcut[]`
- `size?: 'small' | 'medium' | 'large'`
- `disablePast?: boolean`
- `disableFuture?: boolean`
- `format?: string`
- `locale?: Locale`

**New Exports:**
- `DATE_RANGE_SHORTCUTS`
- `DATE_RANGE_ORIENTATIONS`
- `DATE_RANGE_SIZES`

---

### RichTextEditor (`src/components/ui/rich-text-editor.tsx`)

**New Props:**
- `placeholder?: string`

---

### FileBox (`src/components/ui/file-box.tsx`)

**New Props:**
- `onDownload?: () => void`
- `onPreview?: () => void`

---

### DataTable (`src/components/ui/data-table.tsx`)

**New Props:**
- `enableQuickFilter?: boolean` - Show quick filter search in top bar
- `quickFilterPlaceholder?: string` - Placeholder for quick filter input
- `onQuickFilterChange?: (text: string) => void` - Quick filter change callback

**Note:** DataTable was already comprehensive. Props like `autoHeight`, `getRowId`,
`onRowClick`, `getRowClassName` were attempted but are not exposed by DSR TableV2.

---

## Breaking Changes

None. All changes are backwards compatible.

---

## Changelog

### 2026-02-04

- **TreeView**: Added controlled expansion props (expandedItems, onExpandedItemsChange)
- **Uploader**: Defined file type constants (IMAGE_TYPES, FILE_TYPES) and added UPLOADER_ACCEPT_PRESETS
- **DatePicker**: Full migration to DSR component with dateType, time options, size variants
- **DateRangePicker**: Full migration to DSR with shortcuts, orientation, backwards-compatible API
- **RichTextEditor**: Added placeholder support
- **FileBox**: Added onDownload and onPreview callbacks
- **DataTable**: Added enableQuickFilter, quickFilterPlaceholder, onQuickFilterChange props
