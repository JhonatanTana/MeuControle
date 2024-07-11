import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardModule } from "primeng/card";
import { FloatLabelModule } from "primeng/floatlabel";
import { Button } from "primeng/button";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastModule } from "primeng/toast";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProgressBarModule } from "primeng/progressbar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        CardModule,
        FloatLabelModule,
        Button,
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule,
        BrowserAnimationsModule,
        ProgressBarModule,
    ],
  providers: [CookieService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
