import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CryptoModel} from "../model/crypto-model";
import {map} from "rxjs/operators";
import {DataStorageService} from "../share/data-storage/data-storage.service";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient, private dataStorage: DataStorageService) {
  }






  fetchData(apiParameters: string) {
    return this.http.get<CryptoModel[]>(environment.apiURL + environment.apiKey + apiParameters).pipe(
      map(value => Object.values(value))
    )
  }

}



