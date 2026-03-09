/**
 * @fileoverview FileBox wrapper for DSR FileBox component
 *
 * @description
 * Wrapper that adapts DSR FileBox to display files with actions.
 * Useful for displaying uploaded files with preview, download, and delete options.
 *
 * @example
 * // Basic file
 * <FileBox
 *   name="document.pdf"
 *   type="application/pdf"
 *   onDelete={() => handleDelete()}
 * />
 *
 * @example
 * // With download URL
 * <FileBox
 *   name="image.png"
 *   type="image/png"
 *   url="https://example.com/image.png"
 *   onDelete={() => handleDelete()}
 *   onDownload={() => handleDownload()}
 * />
 *
 * @example
 * // With preview
 * <FileBox
 *   name="photo.jpg"
 *   type="image/jpeg"
 *   url={photoUrl}
 *   onPreview={() => openPreviewModal()}
 *   onDelete={() => handleDelete()}
 * />
 *
 * @example
 * // Loading state
 * <FileBox
 *   name="uploading.pdf"
 *   type="application/pdf"
 *   loading
 * />
 */
import * as React from "react";
import { FileBox as DSRFileBox } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

export interface FileBoxProps {
  /** File name */
  name: string;
  /** File MIME type */
  type: string;
  /** File URL (for download or preview) */
  url?: string;
  /** If loading */
  loading?: boolean;
  /** If there is an error */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Callback for delete action */
  onDelete?: () => void;
  /** Callback for download action */
  onDownload?: () => void;
  /** Callback for preview action */
  onPreview?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const FileBox: React.FC<FileBoxProps> = ({
  name,
  type,
  url,
  loading = false,
  error = false,
  errorMessage,
  helperText,
  onDelete,
  onDownload,
  onPreview,
  className,
}) => {
  // Build DSR props
  const dsrProps: any = {
    file: { name, type, url },
    isLoading: loading,
    hasError: error,
  };

  if (errorMessage) dsrProps.errorMessage = errorMessage;
  if (helperText) dsrProps.helperText = helperText;
  if (onDelete) dsrProps.deleteEvent = onDelete;
  if (onDownload) dsrProps.downloadEvent = onDownload;
  if (onPreview) dsrProps.previewEvent = onPreview;

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <DSRFileBox {...dsrProps} />
    </div>
  );
};
FileBox.displayName = "FileBox";
