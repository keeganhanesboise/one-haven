import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { CommonNode, Next } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import DOMPurify from 'dompurify';

export const useRichTextRenderer = (doc: Document, classes: Record<string, string>) => {
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.PARAGRAPH) {
          const paragraphClass = classes['p'] || ''
          return `<p class="${paragraphClass}">${next(node.content)}</p>`
        }
        return '';
      },

      [BLOCKS.HEADING_1]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_1) {
          const headingClass = classes['h1'] || ''
          return `<h1 class="${headingClass}">${next(node.content)}</h1>`
        }
        return '';
      },
      [BLOCKS.HEADING_2]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_2) {
          const headingClass = classes['h2'] || ''
          return `<h2 class="${headingClass}">${next(node.content)}</h2>`
        }
        return '';
      },
      [BLOCKS.HEADING_3]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_3) {
          const headingClass = classes['h3'] || ''
          return `<h3 class="${headingClass}">${next(node.content)}</h3>`
        }
        return '';
      },
      [BLOCKS.HEADING_4]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_4) {
          const headingClass = classes['h4'] || ''
          return `<h4 class="${headingClass}">${next(node.content)}</h4>`
        }
        return '';
      },
      [BLOCKS.HEADING_5]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_5) {
          const headingClass = classes['h5'] || ''
          return `<h5 class="${headingClass}">${next(node.content)}</h5>`
        }
        return '';
      },
      [BLOCKS.HEADING_6]: (node: CommonNode, next: Next) => {
        if (node.nodeType === BLOCKS.HEADING_6) {
          const headingClass = classes['h6'] || ''
          return `<h6 class="${headingClass}">${next(node.content)}</h6>`
        }
        return '';
      },

      [INLINES.HYPERLINK]: (node: CommonNode, next: Next) => {
        if (node.nodeType === INLINES.HYPERLINK) {
          const linkClass = classes['a'] || ''
          const url = node.data.uri
          return `<a href="${url}" class="${linkClass}" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`
        }
        return '';
      },
    }
  };

  // Convert the content to HTML using the defined options
  let htmlContent = documentToHtmlString(doc, renderOptions);

  // Sanitize the raw HTML content using DOMPurify
  htmlContent = DOMPurify.sanitize(htmlContent);

  return htmlContent;
}