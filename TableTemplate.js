"use strict";
// contributer for this code  are Mekala Priyanka and Anusha Bethini
(function () {
  
    class TableTemplate {
      static fillIn(tableId, dictionary, columnName) {
        const table = document.getElementById(tableId);
  
        if (!table) {
          console.error("Table not found.");
          return;
        }
  
        const headerRow = table.rows[0];
        const isPartNumberTable = columnName === 'Part Number' && tableId === 'table1';
  
        for (let i = 0; i < headerRow.cells.length; i++) {
          const columnHeader = headerRow.cells[i].textContent.trim();
          headerRow.cells[i].textContent = this.fillCellTemplate(columnHeader, dictionary, columnHeader, isPartNumberTable);
        }
  
        const columnIndex = columnName ? Array.from(headerRow.cells).findIndex(cell => cell.textContent.trim() === columnName) : -1;
  
        for (let i = 1; i < table.rows.length; i++) {
          const row = table.rows[i];
  
          if (columnIndex !== -1) {
            const cell = row.cells[columnIndex];
            cell.textContent = this.fillCellTemplate(cell.textContent, dictionary, columnName, false);
          } else {
            for (let j = 0; j < row.cells.length; j++) {
              const cell = row.cells[j];
              const currentColumnName = headerRow.cells[j].textContent.trim();
              cell.textContent = this.fillCellTemplate(cell.textContent, dictionary, currentColumnName, isPartNumberTable);
            }
          }
        }
  
        table.style.visibility = "visible";
      }
  
      static fillCellTemplate(cellContent, dictionary, columnName, isPartNumberTable) {
        const regex = /{{(.*?)}}/g;
  
        return cellContent.replace(regex, (match, property) => {
          if (isPartNumberTable && columnName === 'Part Number' && property.startsWith('n')) {
            return `{{${property}}}`;
          } else {
            return dictionary.hasOwnProperty(property) ? dictionary[property] : `{{${property}}}`;
          }
        });
      }
    }
  
    window.TableTemplate = TableTemplate;
  })();
  