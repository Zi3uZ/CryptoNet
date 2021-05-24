import {Component, OnDestroy, OnInit} from '@angular/core';
import {CryptoModel} from "../model/crypto-model";
import {DataStorageService} from "../share/data-storage/data-storage.service";
import {interval, Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {CryptoService} from "../services/crypto.service";

@Component({
  selector: 'app-crypto-information',
  templateUrl: './crypto-information.component.html',
  styleUrls: ['./crypto-information.component.scss']
})
export class CryptoInformationComponent implements OnInit, OnDestroy {

   cryptoList: Array<CryptoModel> = [];
   copyOrginalArray: Array<CryptoModel> = [];

   loading: boolean = true;

  private destroyed$: Subject<void> = new Subject();

  constructor(private getCrypto: DataStorageService, private cryptoService:CryptoService) {
  }

  search: FormControl = new FormControl('')

  ngOnInit(): void {
    this.cryptoService.fetchData("&interval=1d&per-page=100&page=1")
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(data =>{
        this.cryptoList = data;
        this.copyOrginalArray = data;
        this.loading = false;
        this.getCrypto.setCryptoList(data);
      });

    interval(10000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.cryptoService.fetchData("&interval=1d&per-page=100&page=1").subscribe( data => {
          this.cryptoList = data;
          this.getCrypto.setCryptoList(data);
        }
      ));


    this.search.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroyed$)
      )
      .subscribe(data => {
        this.cryptoList = this.copyOrginalArray;
        let result = [...this.cryptoList].filter(x => x.id.toLowerCase().includes(data.toLowerCase()))
        this.cryptoList = result;
      });
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
  }


}

