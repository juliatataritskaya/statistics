import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartistModule } from 'ng-chartist';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticApiService } from './services/statistic.api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartistModule,
    HttpClientModule
  ],
  providers: [StatisticApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
