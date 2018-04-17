import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatInputModule
  ],
  declarations: []
})
export class MaterialModule {
}
