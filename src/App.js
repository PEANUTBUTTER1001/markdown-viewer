const MarkdownService = require('./services/MarkdownService');
const ScrollManager = require('./ui/ScrollManager');
const SplitterManager = require('./ui/SplitterManager');
const LayoutManager = require('./ui/LayoutManager');

class App {
  constructor() {
    // Services
    this.markdownService = new MarkdownService();
    this.fileService = null; // Lazy loaded later

    // DOM Elements
    this.inputArea = document.getElementById('markdown-input');
    this.outputArea = document.getElementById('markdown-output');
    this.container = document.getElementById('main-container');
    this.editorPane = document.getElementById('editor-pane');
    this.previewPane = document.getElementById('preview-pane');
    this.splitter = document.getElementById('splitter');
    this.btnToggle = document.getElementById('btn-toggle-layout');
    this.btnSave = document.getElementById('btn-save');

    // UI Managers
    this.scrollManager = new ScrollManager(this.inputArea, this.previewPane);
    this.splitterManager = new SplitterManager(this.container, this.splitter, this.editorPane, this.previewPane);
    this.layoutManager = new LayoutManager(this.container, this.editorPane, this.previewPane, this.btnToggle);
  }

  init() {
    this.scrollManager.init();
    this.splitterManager.init();
    this.layoutManager.init();
    this.bindEvents();
    
    // Initial render
    this.updatePreview();
  }

  updatePreview() {
    const html = this.markdownService.render(this.inputArea.value);
    this.outputArea.innerHTML = html;
  }

  bindEvents() {
    // Markdown Preview Updates
    this.inputArea.addEventListener('input', () => this.updatePreview());
    this.inputArea.addEventListener('paste', () => {
      setTimeout(() => this.updatePreview(), 0);
    });

    // File Save Event
    this.btnSave.addEventListener('click', async () => {
      try {
        if (!this.fileService) {
          const FileService = require('./services/FileService');
          this.fileService = new FileService();
        }
        
        const saved = await this.fileService.saveFile(this.inputArea.value);
        if (saved) {
          alert('성공적으로 저장되었습니다.');
        }
      } catch (err) {
        if (err.message === "EmptyContent") {
          alert("저장할 내용이 없습니다.");
        } else {
          console.error("저장 실패:", err);
          alert('저장에 실패했습니다.');
        }
      }
    });
  }
}

module.exports = App;
