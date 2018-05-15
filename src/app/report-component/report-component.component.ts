import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort} from '@angular/material';
import {DialogEditComponent} from '../management/management.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {PrivateManagerService} from '../private-manager.service';

@Component({
  selector: 'app-report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})
export class ReportComponentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: ElementRef;
  mainList: Array<Object>;
  userList: Array<Object>;
  options: Object;
  headers: Array<string> = ['lead', 'comments'];
  public items: Array<string> = ['The', 'possibilities', 'are', 'endless!'];

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pmanager: PrivateManagerService
  ) {
    this.mainList = this.data.mainList;
    this.userList = this.data.userList;
  }

  ngOnInit() {
    this.options = {
      removeOnSpill: true,
      direction: 'vertical'
    };
  }

  giveDetails(id) {
    return this._pmanager.giveDetails(id, this.userList)
  }

 public  generatePdf() {
    const headerComments = ['data', 'employee', 'message'];
    const doc = new jsPDF('p', 'pt');
    const res = doc.autoTableHtmlToJson(this.table.nativeElement);
    const nameRows = res.rows.map(gr => {
      return gr.filter(el => el.innerText);
    });
    nameRows.forEach(pair => {
      if (pair.length > 1) {
        const table = doc.autoTableHtmlToJson(pair[1].children[0]);
        doc.autoTable([pair[0]], [], {
          startY: doc.autoTableEndPosY() + 0
        });
        table.data.unshift(table.columns);
        doc.autoTable(headerComments, table.data, {
          startY: doc.autoTableEndPosY() + 0
        });
      } else {
        doc.autoTable([pair[0]], [], {
          startY: doc.autoTableEndPosY() + 0
        });

      }
    });
    doc.save('table.pdf');
  }

  public closeDialog() {
    this.dialogRef.close();
  }

}
