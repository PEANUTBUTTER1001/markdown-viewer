class LayoutManager {
  constructor(container, editorPane, previewPane, btnToggle) {
    this.container = container;
    this.editorPane = editorPane;
    this.previewPane = previewPane;
    this.btnToggle = btnToggle;
  }

  init() {
    this.btnToggle.addEventListener('click', () => this.toggleLayout());
  }

  toggleLayout() {
    this.container.classList.toggle('column');
    if (this.container.classList.contains('column')) {
      this.container.style.flexDirection = 'column';
    } else {
      this.container.style.flexDirection = 'row';
    }
    // 50:50으로 리셋 (flex 속성 초기화)
    this.editorPane.style.flex = '1';
    this.previewPane.style.flex = '1';
  }
}

module.exports = LayoutManager;
