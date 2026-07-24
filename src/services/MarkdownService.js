class MarkdownService {
  constructor() {
    // marked and DOMPurify are loaded via script tags in popup.html
    // so they are globally available.
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  render(rawMarkdown) {
    const rawHtml = marked.parse(rawMarkdown);
    return DOMPurify.sanitize(rawHtml);
  }
}

module.exports = MarkdownService;
