import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule,
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
    MatSortModule
  ],
  exports: [MatButtonModule,
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
    MatSortModule
  ],
  declarations: []
})
export class MaterialModule {
}
