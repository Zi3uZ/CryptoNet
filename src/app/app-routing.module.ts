import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CryptoInformationComponent} from "./crypto-information/crypto-information.component";
import {MoreDetailsComponent} from "./more-details/more-details.component";

const routes: Routes = [
  { path: '', component: CryptoInformationComponent },
  { path: 'details/:cryptoName', component: MoreDetailsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
