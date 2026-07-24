const { ipcRenderer } = require('electron');
const fs = require('fs');

class FileService {
  async saveFile(content) {
    if (!content.trim()) {
      throw new Error("EmptyContent");
    }
    
    const filePath = await ipcRenderer.invoke('dialog:saveFile');
    if (filePath) {
      fs.writeFileSync(filePath, content, 'utf-8');
      return true;
    }
    return false; // User canceled the dialog
  }
}

module.exports = FileService;
