/**
 * @fileoverview useCopyToClipboard - Hook for copying text to clipboard
 *
 * @description
 * Encapsulates clipboard copy logic with state management.
 * Designed to be testable: no side effects on render,
 * explicit states for loading/error/success.
 *
 * @example
 * ```tsx
 * const { copied, error, copy } = useCopyToClipboard();
 *
 * <button onClick={() => copy("text")}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </button>
 * {error && <span role="alert">{error.message}</span>}
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseCopyToClipboardOptions {
  /** Time in ms before resetting copied state to false */
  timeout?: number;
}

export interface UseCopyToClipboardResult {
  /** True if text was copied successfully */
  copied: boolean;
  /** Error if copy failed */
  error: Error | null;
  /** Function to copy text to clipboard */
  copy: (text: string) => Promise<void>;
  /** Reset state to initial */
  reset: () => void;
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardResult {
  const { timeout = 2000 } = options;

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Ref for timeout cleanup
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    // Clear previous timeout if exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);

      // Reset state after timeout
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      setCopied(false);
      setError(err instanceof Error ? err : new Error('Failed to copy to clipboard'));
    }
  }, [timeout]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCopied(false);
    setError(null);
  }, []);

  return { copied, error, copy, reset };
}
