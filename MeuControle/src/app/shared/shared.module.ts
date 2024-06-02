import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FaIconComponent,
    RouterLinkActive,
    RouterLink
  ],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule { }
