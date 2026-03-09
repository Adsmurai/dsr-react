/**
 * @fileoverview RichTextEditor wrapper for DSR
 *
 * @description
 * Rich text editor with formatting (bold, italic, lists, etc).
 *
 * @when_to_use
 * - Description fields with formatting
 * - Content editors
 * - Formatted comments
 *
 * @example
 * ```tsx
 * <RichTextEditor
 *   value={content}
 *   onChange={setContent}
 *   placeholder="Start typing..."
 * />
 * ```
 */
import * as React from 'react';
import { RichTextEditor as DSRRichTextEditor } from '@adsmurai/design-system-react';

export interface RichTextEditorProps {
  /** Current HTML content */
  value?: string;
  /** Callback when content changes */
  onChange: (content: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
}

/**
 * RichTextEditor component - DSR wrapper
 */
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder,
}) => {
  // Build props
  const dsrProps: any = {
    content: value,
    onEditContent: onChange,
  };

  if (placeholder) {
    dsrProps.placeholder = placeholder;
  }

  return <DSRRichTextEditor {...dsrProps} />;
};

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
