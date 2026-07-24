class ScrollManager {
  constructor(inputArea, previewPane) {
    this.inputArea = inputArea;
    this.previewPane = previewPane;
    
    this.isSyncingLeft = false;
    this.isSyncingRight = false;
  }

  init() {
    this.inputArea.addEventListener('scroll', () => {
      if (!this.isSyncingLeft) {
        this.isSyncingRight = true;
        const percentage = this.inputArea.scrollTop / (this.inputArea.scrollHeight - this.inputArea.clientHeight) || 0;
        this.previewPane.scrollTop = percentage * (this.previewPane.scrollHeight - this.previewPane.clientHeight);
      }
      this.isSyncingLeft = false;
    });

    this.previewPane.addEventListener('scroll', () => {
      if (!this.isSyncingRight) {
        this.isSyncingLeft = true;
        const percentage = this.previewPane.scrollTop / (this.previewPane.scrollHeight - this.previewPane.clientHeight) || 0;
        this.inputArea.scrollTop = percentage * (this.inputArea.scrollHeight - this.inputArea.clientHeight);
      }
      this.isSyncingRight = false;
    });
  }
}

module.exports = ScrollManager;
