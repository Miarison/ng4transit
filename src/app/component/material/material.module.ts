import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

const COMPONENTS = [
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule
]

@NgModule({
  imports: [ COMPONENTS ],
  exports: [ COMPONENTS ],
})
export class MaterialModule { }
