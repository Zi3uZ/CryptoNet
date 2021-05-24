import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../share/data-storage/data-storage.service';
import {CryptoModel} from '../../model/crypto-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crypto-calculator',
  templateUrl: './crypto-calculator.component.html',
  styleUrls: ['./crypto-calculator.component.scss']
})
export class CryptoCalculatorComponent implements OnInit {


  constructor(private dataStorage: DataStorageService) { }

  cryptoList: Array<CryptoModel> = [];

  calculatorForm = new FormGroup({
      cryptoItem: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
  });

  price: string;
  mode: boolean = true;


  ngOnInit(): void {
    this.cryptoList = this.dataStorage.getCryptoList();
  }


  calculate(): void {
    const item = this.dataStorage.getCyrptoItem(this.calculatorForm.value.cryptoItem);
    if(this.mode){
      this.price = (parseFloat(item[0].price) * this.calculatorForm.value.quantity).toFixed(8);
    }else{
      this.price = (this.calculatorForm.value.quantity/parseFloat(item[0].price)).toFixed(8);
    }
  }

  clearForm(): void {
    this.calculatorForm.reset();
    this.calculatorForm.value.cryptoItem = null;
    this.price = '';
  }

  switchMode(): void {
    this.mode = !this.mode;
    this.calculatorForm.reset();
    this.price = '';
  }
}
