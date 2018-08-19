import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataModel } from '../models/models';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
	//private quoteProviderURL = "https://www.alphavantage.co/";
  private apiKey = "BUCAQ9RJZL6I9X12";
  
  private BASE_URL = 'https://www.alphavantage.co/query?function='

  getDayly(symbol): Observable<DataModel>{
    return this.http.get<DataModel>(`${this.BASE_URL}TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`);
  }

  getIntraDay(symbol): Observable<DataModel>{
    return this.http.get<DataModel>(`${this.BASE_URL}TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${this.apiKey}`);
  }

}



  
// "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + apiKey

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo