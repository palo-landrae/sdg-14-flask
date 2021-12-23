import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppComponent } from './app.component';
import { BeachLitterChartComponent } from './beach-litter-chart/beach-litter-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BeachLitterChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleChartsModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
