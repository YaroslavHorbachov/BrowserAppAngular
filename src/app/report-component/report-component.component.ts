import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSort} from '@angular/material';

import {PrivateManagerService} from '../private-manager.service';
import {OptionsPdfComponent} from '../options-pdf/options-pdf.component';

@Component({
  selector: 'app-report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})
export class ReportComponentComponent  {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: ElementRef;
  mainList: Array<Object>;
  userList: Array<Object>;
  headers: Array<string> = ['lead', 'comments'];

  constructor(
    public dialogRef: MatDialogRef<ReportComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pmanager: PrivateManagerService,
    private optionsPDF: MatDialog
  ) {
    this.mainList = this.data.mainList;
    this.userList = this.data.userList;
  }

  giveDetails(id) {
    return this._pmanager.giveDetails(id, this.userList);
  }

  public generatePdf() {
    this.optionsPDF.open(OptionsPdfComponent, {
      minWidth: 700,
      minHeight: 500,
      data: { main: this.mainList, list: this.userList }
    });
  }
  public closeDialog() {
    this.dialogRef.close();
  }

}
