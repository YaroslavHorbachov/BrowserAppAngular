import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatDialogModule,
    MatDividerModule,
    MatSortModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  declarations: []
})
export class MaterialModule {
}
