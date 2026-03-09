/**
 * @fileoverview Uploader wrapper for DSR Uploader component
 *
 * @description
 * Wrapper that adapts DSR Uploader for file uploads.
 * Supports single and multiple file upload.
 *
 * @example
 * // Single file
 * <Uploader
 *   onUpload={(file) => console.log('File:', file)}
 *   accept={['image/png', 'image/jpeg']}
 * />
 *
 * @example
 * // Multiple files
 * <Uploader
 *   multiple
 *   onUpload={(files) => console.log('Files:', files)}
 *   accept={['application/pdf']}
 *   maxSize={10}
 * />
 *
 * @example
 * // Using presets
 * import { Uploader, UPLOADER_ACCEPT_PRESETS } from '@adsmurai/dsr-react';
 *
 * <Uploader
 *   accept={UPLOADER_ACCEPT_PRESETS.images}
 *   onUpload={handleUpload}
 * />
 */
import * as React from "react";
import { Uploader as DSRUploader } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/** Common image MIME types */
export const IMAGE_TYPES = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  WEBP: 'image/webp',
  SVG: 'image/svg+xml',
} as const;

/** Common file MIME types */
export const FILE_TYPES = {
  PDF: 'application/pdf',
  CSV: 'text/csv',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT: 'text/plain',
  JSON: 'application/json',
  ZIP: 'application/zip',
} as const;

/** Preset file type configurations for common use cases */
export const UPLOADER_ACCEPT_PRESETS = {
  /** Common image formats: PNG, JPEG, GIF, WebP */
  images: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'] as const,
  /** Document format: PDF */
  documents: ['application/pdf'] as const,
  /** Spreadsheet formats: CSV, XLS, XLSX */
  spreadsheets: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ] as const,
  /** Video formats: MP4, WebM */
  videos: ['video/mp4', 'video/webm'] as const,
  /** Audio formats: MP3, WAV, OGG */
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'] as const,
  /** Common mix: images + PDF + CSV */
  all: ['image/png', 'image/jpeg', 'application/pdf', 'text/csv'] as const,
} as const;

/** Allowed file types */
type FileType =
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "image/webp"
  | "application/pdf"
  | "text/csv"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "video/mp4"
  | "video/webm"
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | string;

interface UploaderBaseProps {
  /** Allowed file types (MIME types or use UPLOADER_ACCEPT_PRESETS) */
  accept?: readonly FileType[] | FileType[];
  /** Maximum size in MB */
  maxSize?: number;
  /** Whether disabled */
  disabled?: boolean;
  /** Helper text */
  helperText?: React.ReactNode;
  /** Custom validation (returns error message or null) */
  validate?: (file: File) => string | null | Promise<string | null>;
  /** Additional CSS classes */
  className?: string;
}

interface SingleUploaderProps extends UploaderBaseProps {
  /** Whether to allow multiple files */
  multiple?: false;
  /** Callback when a file is uploaded */
  onUpload: (file: File) => void | Promise<void>;
}

interface MultipleUploaderProps extends UploaderBaseProps {
  /** Whether to allow multiple files */
  multiple: true;
  /** Callback when files are uploaded */
  onUpload: (files: FileList) => void | Promise<void>;
}

export type UploaderProps = SingleUploaderProps | MultipleUploaderProps;

export const Uploader: React.FC<UploaderProps> = ({
  accept = ["image/png", "image/jpeg", "application/pdf"],
  maxSize = 5,
  disabled = false,
  helperText,
  validate,
  className,
  ...props
}) => {
  // Determine if it's multiple or single
  const isMultiple = props.multiple === true;

  const uploaderProps = isMultiple
    ? {
        multiple: true as const,
        onFileUpload: (props as MultipleUploaderProps).onUpload,
      }
    : {
        multiple: false as const,
        onFileUpload: (props as SingleUploaderProps).onUpload,
      };

  return (
    <div className={cn("w-full", className)}>
      <DSRUploader
        {...uploaderProps}
        fileTypesAllowed={[...accept] as string[]}
        maxFileSizeInMB={maxSize}
        isDisabled={disabled}
        helperText={helperText}
        onValidateFile={validate}
      />
    </div>
  );
};
Uploader.displayName = "Uploader";
