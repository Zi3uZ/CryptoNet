import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from '../share/data-storage/data-storage.service';
import {takeUntil} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';
import {CryptoModel} from '../model/crypto-model';
import {CryptoService} from '../services/crypto.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss']
})
export class MoreDetailsComponent implements OnInit, OnDestroy {

  private destroyed$: Subject<void> = new Subject();

// Value for chart
  oneDayChange: any;
  sevenDayChange: any;
  oneYearChange: any;

  cryptoDetail: Array<CryptoModel> = [];
  loading = true;

  constructor(private route: ActivatedRoute, private router: Router, private dataStorage: DataStorageService, private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const cryptoName = routeParams.get('cryptoName');
    this.cryptoService.fetchData(`&ids=${cryptoName}&interval=1d,7d,365d&per-page=100&page=1`)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        if (data.length === 0) {
          this.router.navigate(['']);
        } else {
          this.cryptoDetail = data;
          this.oneDayChange = this.cryptoDetail[0]["1d"].price_change;
          this.sevenDayChange = this.cryptoDetail[0]["7d"]?.price_change;
          this.oneYearChange = this.cryptoDetail[0]["365d"]?.price_change;
          this.loading = false;

        }
      });

    interval(10000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() =>
        this.cryptoService.fetchData(`&ids=${cryptoName}&interval=1d&per-page=100&page=1`).subscribe(data =>{
          this.cryptoDetail = data;
        })
      )

  }


  ngOnDestroy() {
    this.destroyed$.next();
  }

}

