import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CryptoModel} from "../../model/crypto-model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  cryptoArrayChanged = new BehaviorSubject<CryptoModel[]>([]);
  private cryptoArray: CryptoModel[] = [];

  setCryptoList(cryptoArray: CryptoModel[]): void{
    this.cryptoArray = cryptoArray;
    this.cryptoArrayChanged.next(this.cryptoArray);
  }

  getCryptoList(): Array<CryptoModel>{
    return this.cryptoArray;
  }

  getCyrptoItem(item: string): Array<CryptoModel>{
    return (this.cryptoArray.filter(x => x.name === item));
  }


}
