import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CryptoInformationComponent } from './crypto-information/crypto-information.component';
import { CryptoCalculatorComponent } from './crypto-information/crypto-calculator/crypto-calculator.component';
import {HttpClientModule} from "@angular/common/http";
import { LoadedSpinnerComponent } from './share/loaded-spinner/loaded-spinner.component';
import { ScrollToTopComponent } from './share/scroll-to-top/scroll-to-top.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MoreDetailsComponent } from './more-details/more-details.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { CryptoChartComponent } from './more-details/crypto-chart/crypto-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CryptoInformationComponent,
    CryptoCalculatorComponent,
    LoadedSpinnerComponent,
    ScrollToTopComponent,
    MoreDetailsComponent,
    CryptoChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
