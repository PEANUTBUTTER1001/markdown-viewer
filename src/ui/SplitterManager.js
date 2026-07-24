class SplitterManager {
  constructor(container, splitter, editorPane, previewPane) {
    this.container = container;
    this.splitter = splitter;
    this.editorPane = editorPane;
    this.previewPane = previewPane;
    
    this.isDragging = false;
    this.isColumn = false;
    
    // Create tooltip for percentage
    this.tooltip = document.createElement('div');
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.padding = '4px 8px';
    this.tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.tooltip.style.color = 'white';
    this.tooltip.style.borderRadius = '4px';
    this.tooltip.style.fontSize = '12px';
    this.tooltip.style.pointerEvents = 'none';
    this.tooltip.style.display = 'none';
    this.tooltip.style.zIndex = '1000';
    document.body.appendChild(this.tooltip);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUpOrBlur = this.onMouseUpOrBlur.bind(this);
  }

  init() {
    this.splitter.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUpOrBlur);
    window.addEventListener('blur', this.onMouseUpOrBlur);
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.splitter.classList.add('active');
    this.isColumn = this.container.classList.contains('column');
    document.body.style.userSelect = 'none';
    
    this.tooltip.style.display = 'block';
  }

  onMouseMove(e) {
    if (!this.isDragging) return;
    
    const rect = this.container.getBoundingClientRect();
    let percentage = 50;

    if (this.isColumn) {
      let newHeight = e.clientY - rect.top;
      if (newHeight < 50) newHeight = 50;
      if (newHeight > rect.height - 50) newHeight = rect.height - 50;
      
      percentage = (newHeight / rect.height) * 100;
      
      // Use flex property to override flex: 1
      this.editorPane.style.flex = `0 0 ${percentage}%`;
      this.previewPane.style.flex = `0 0 ${100 - percentage}%`;
    } else {
      let newWidth = e.clientX - rect.left;
      if (newWidth < 50) newWidth = 50;
      if (newWidth > rect.width - 50) newWidth = rect.width - 50;
      
      percentage = (newWidth / rect.width) * 100;
      
      this.editorPane.style.flex = `0 0 ${percentage}%`;
      this.previewPane.style.flex = `0 0 ${100 - percentage}%`;
    }

    // Update tooltip
    const p1 = Math.round(percentage);
    const p2 = 100 - p1;
    this.tooltip.textContent = `에디터: ${p1}% / 프리뷰: ${p2}%`;
    this.tooltip.style.left = e.clientX + 15 + 'px';
    this.tooltip.style.top = e.clientY + 15 + 'px';
  }

  onMouseUpOrBlur() {
    if (this.isDragging) {
      this.isDragging = false;
      this.splitter.classList.remove('active');
      document.body.style.userSelect = '';
      this.tooltip.style.display = 'none';
    }
  }
}

module.exports = SplitterManager;
