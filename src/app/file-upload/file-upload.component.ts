import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() csvData: any = new EventEmitter();
  fileName = '';

  constructor() { }

  onChange(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    const isCSVFile = !!target.files[0].name.match(/(.csv)/);
    if (isCSVFile) {
      this.fileName = evt.target.files[0].name;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {
          type: 'binary',
          cellDates: true,
          cellNF: false,
          cellText: false
        });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        const rowData = this.replaceKeys(data);
        this.csvData.emit({ rowData });
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  replaceKeys = (data) => {
    var newObj = {};
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      Object.keys(data[i]).forEach(k => newObj[_.snakeCase(k)] = data[i][k]);
      newArr.push({ ...newObj });
    }
    return newArr;
  }


}
