'use strict';

class TableTemplate {
  static fillIn(id, dict, columnName) {
    const table = document.getElementById(id);
    if (!table) return;

    const headers = table.rows[0].cells;
    let columnIndex =-1;
    for (let i =0; i < headers.length; i++) {
      const headerContent = headers[i].innerHTML;
      const processor = new TemplateProcessor(headerContent);
      headers[i].innerHTML = processor.fillIn(dict);

      if (headers[i].innerHTML === columnName) {
        columnIndex = i ;
      }
    }

   for (let rowIndex = 1; rowIndex < table.rows.length;rowIndex++) {
    const cells = table.rows[rowIndex].cells;
      for (let cellIndex = 0; cellIndex < cells.length;cellIndex++){
        if (columnIndex === -1 || columnIndex === cellIndex){
          const cellContent = cells[cellIndex].innerHTML;
          const cellProcessor = new TemplateProcessor(cellContent);
          cells[cellIndex].innerHTML = cellProcessor.fillIn(dict);
        }
      }
   } 
    
    if (table.style.visibility === "hidden") {
      table.style.visibility = "visible";
    }
  }
}