import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule, MatMenuModule, MatIconModule, MatExpansionModule, MatTableModule, MatPaginatorModule, CdkTableModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule, MatMenuModule, MatIconModule, MatExpansionModule, MatTableModule, MatPaginatorModule, CdkTableModule
  ],
  declarations: []
})
export class MaterialModule {
}
