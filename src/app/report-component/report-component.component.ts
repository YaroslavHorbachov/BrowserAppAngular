import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort} from '@angular/material';
import {DialogEditComponent} from '../management/management.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.css']
})
export class ReportComponentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  mainList: Array<Object>;
  userList: Array<Object>;
  options: Object;
  items = [...this.mainList];
  public items: Array<string> = ['The', 'possibilities', 'are', 'endless!'];

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dragulaService: DragulaService
  ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));

    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));

    });
    /*dragulaService.setOptions('bag-one', {

    });*/
    dragulaService.drag.subscribe((value) => {
      // console.log(value);

      // this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {

      // console.log(value);
      // this.onDrop(value.slice(1));
    });
    /* dragulaService.over.subscribe((value) => {
       console.log(`over: ${value[0]}`);
       this.onOver(value.slice(1));
     });
     dragulaService.out.subscribe((value) => {
       console.log(`out: ${value[0]}`);
       this.onOut(value.slice(1));
     });*/
    this.mainList = this.data.mainList;
    this.userList = this.data.userList;
  }

  ngOnInit() {
    console.log(this.items);
    this.options = {
      removeOnSpill: true,
      direction: 'vertical'
    };
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    // console.log('DROP =>= = > = >', target, source)

  }

  private onRemoveModel(args) {
    const [el, source] = args;

    // console.log('REMOVE =>= = > = >', el, source)
  }

  private onDrag(args) {
    const [e, el] = args;

    // do something
    // console.log(e, el);
  }

  private onDrop(args) {

    const [e, el] = args;
    // console.log(e, el);
    // do something
  }

  private onOver(args) {

    const [e, el, container] = args;
    // console.log(e, el, container);
    // do something
  }

  private onOut(args) {

    const [e, el, container] = args;
    // console.log(e, el, container);
    // do something
  }

  generatePdf() {
    const columns = ['', 'Anatolyew', 'Dima'];
    const rows = [
      ['date', 'employee', 'message'],
      [1, 'Shaw', 'Tanzania'],
      [2, 'Nelson', 'Kazakhstan'],
      [3, 'Garcia', 'Madagascar']
    ];

    const doc = new jsPDF('p', 'pt');
    const res = doc.autoTableHtmlToJson();
    console.log(res);
    doc.autoTable(columns, rows);
    doc.autoTable(columns, rows, {
      startY: doc.autoTableEndPosY()
    });

    // doc.save('table.pdf');

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
