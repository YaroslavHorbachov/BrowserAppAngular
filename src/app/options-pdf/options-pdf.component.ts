import {Component, Inject, OnInit} from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-options-pdf',
  templateUrl: './options-pdf.component.html',
  styleUrls: ['./options-pdf.component.css']
})
export class OptionsPdfComponent implements OnInit {
  options: Object;

  constructor(
    public dialogRef: MatDialogRef<OptionsPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pmanager: PrivateManagerService,
  ) {

  }

  ngOnInit() {
    const table = this.data.table;
    const fn = this.data.fn;
    const doc = new JSPDF('p', 'pt');
    const Table = doc.autoTableHtmlToJson(table.nativeElement);

    console.log(doc, Table, fn);
    console.log('Worked');
  }


  generatePDF() {/*
    const docDefinition = {content: 'This is an sample PDF printed with pdfMake'};

    pdfMake.createPdf(docDefinition).open();
*/
    this._pmanager.getGeneratedPDF().subscribe((data: any) => {

      /*const file = new Blob([data], {type: 'application/pdf'});
      console.log('BLOB ', file)
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);*/




      console.log('BLOB ', data)
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    });
  }
  submitForm(f){
    console.log('FORM ', f.value)
  }

  onClose() {
    this.dialogRef.close();
  }

}
