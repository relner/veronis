import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {

  mySymbol: string = '10';
  cost: number = 7;
  myPerc: string = '(00)'
  timeStap: string = '00:00:00'

  constructor(private dataService: DataService) { }

  ngOnInit() {
    /*
    this.dataService.getIntraDay('VRNS').subscribe(data => {
      console.log(data);
    })
    this.dataService.getDayly('VRNS').subscribe(data => {
      console.log(data);
    })
    */
   this.getData()
  }

  getData(){

    this.dataService.getIntraDay('VRNS').subscribe(data => {
          
      let myArrObj = data["Time Series (1min)"];
      var myArr = Object.keys(myArrObj);
      let dayly = myArr[0]; 
      
      console.log(myArrObj)
      console.log(dayly);
      console.log(myArrObj[dayly])
      
      


    })
    // this.dataService.getDayly('VRNS').subscribe(data => {
    //   console.log(data);
    // })
  }

}


//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo