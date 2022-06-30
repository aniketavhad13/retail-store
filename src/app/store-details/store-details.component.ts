import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store, StoreColumns } from '../model/store';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent {

  displayedColumns: string[] = StoreColumns.map((col) => col.key);
  columnsSchema: any = StoreColumns;
  dataSource = new MatTableDataSource<Store>();
  valid: any = {};

  constructor() { }

  editRow(row: Store) {
    row.isEdit = false;
  }

  /**
   * To remove individual row
   * @param id - store Id
   */
  removeRow(id: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (u: Store) => u.store_id !== id
    );
  }

  /**
   * This method is use to indentify input is valid or not
   * @param e - element
   * @param id - store Id
   * @param key - element key
   */
  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  /**
   * This method is use to enable / disable submit button
   * @param id - Store id
   * @returns true / false
   */
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCsvData(e) {
    this.dataSource = new MatTableDataSource(e.rowData);
  }

}
