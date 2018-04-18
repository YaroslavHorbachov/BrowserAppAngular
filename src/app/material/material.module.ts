import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule, MatMenuModule, MatIconModule, MatExpansionModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule, MatMenuModule, MatIconModule, MatExpansionModule
  ],
  declarations: []
})
export class MaterialModule {
}
