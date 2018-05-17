import {Component, Inject, OnInit} from '@angular/core';
import {PrivateManagerService} from '../services/private-manager.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {OptionsModel} from './options.model';
import {TableData} from './tabledata.model';
import {JsonPDF} from './jsonPDF.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-options-pdf',
  templateUrl: './options-pdf.component.html',
  styleUrls: ['./options-pdf.component.css']
})
export class OptionsPdfComponent implements OnInit {
  options: OptionsModel = new OptionsModel();
  dataTable: TableData;

  constructor(
    public dialogRef: MatDialogRef<OptionsPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pmanager: PrivateManagerService,
  ) {}

  ngOnInit() {
    this.dataTable = new TableData(this.data.main, this.data.list);

    console.log('Worked ', this.dataTable);
  }


  generatePDF() {
    const json: JsonPDF = new JsonPDF('pdf', this.options, this.dataTable);
    this._pmanager.getGeneratedPDF(json).subscribe(
      (data: any) => {
        console.log('Success');
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL);
      });
  }

  submitForm() {
    const json: JsonPDF = new JsonPDF('form', this.options, this.dataTable);
    this._pmanager.getGeneratedPDF(json).subscribe(console.log);
  }

  onClose() {
    this.dialogRef.close();
  }

}


