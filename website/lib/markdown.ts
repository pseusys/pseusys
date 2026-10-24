/**
 * Converts YAML text fields (written in Markdown) to safe HTML.
 * Mirrors the logic in curriculum_vitae/scripts/unyaml.py but targets HTML.
 *
 * Markdown is the single source of truth in information/*.yml.
 * This module handles the HTML side; unyaml.py handles the LaTeX side.
 *
 * Supported syntax:
 *   **bold**    → <strong>bold</strong>
 *   [text](url) → <a href="url">text</a>
 *   + item      → <ul><li>item</li>…</ul>
 *   - line      → line<br/>
 *   —           → — (passed through as unicode)
 *   –           → – (passed through as unicode)
 */

const LINK_CLASS = 'text-blue-600 hover:underline';

/** Escape HTML special characters in plain text. */
function htmlEscape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Apply inline formatting (bold, links) to a plain-text line.
 * The input must already be HTML-escaped before calling this.
 */
function inlineFormat(text: string): string {
  // Markdown **bold**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Markdown [text](url) — href may contain &amp; from htmlEscape, which is correct in HTML
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    `<a href="$2" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer">$1</a>`,
  );
  return text;
}

export function mdToHtml(text: string): string {
  const lines = text.split('\n');
  const parts: string[] = [];
  const listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      const lis = listItems.map(i => `<li>${i}</li>`).join('');
      parts.push(`<ul class="list-disc list-inside space-y-1 mt-1">${lis}</ul>`);
      listItems.length = 0;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const listMatch = line.match(/^\+ (.+)/);
    if (listMatch) {
      listItems.push(inlineFormat(htmlEscape(listMatch[1])));
      continue;
    } else {
      flushList();
    }

    const breakMatch = line.match(/^- (.+)/);
    if (breakMatch) {
      parts.push(inlineFormat(htmlEscape(breakMatch[1])) + '<br/>');
    } else {
      parts.push(inlineFormat(htmlEscape(line)));
    }
  }

  flushList();
  return parts.join(' ');
}
