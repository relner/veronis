import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {

  mySymbol: string = 'VRNS';

  cost: number = 0;
  myPerc: string = '(00)'
  timeStap: string = '00:00:00'
  count: number = 0;

  tempCost: number;
  oldCost: number;
  tempTimeStap: string;

  //for style only
  myTempVar: number = 0;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData('VRNS')
    setInterval(()=>{
      if(this.count == 0) this.getData('VRNS')
    }, 60000)
  }

  getData(param){

    this.dataService.getIntraDay(param).subscribe(data => {

      this.count++
          
      let myArrObj = data["Time Series (1min)"];
      let myArr = Object.keys(myArrObj);
      let dayly = myArr[0]; 
      this.tempTimeStap = dayly;
      this.tempCost = myArrObj[dayly]['4. close'];

      // console.log(myArrObj)
      
      if(this.count == 2){
        this.setDataTo();
      }

    });

    this.dataService.getDayly(param).subscribe(data => {

      this.count++

      let myArrObj = data["Time Series (Daily)"];
      let myArr = Object.keys(myArrObj);
      let dayly = myArr[1]; 

      this.oldCost = myArrObj[dayly]['4. close'];

      // console.log(myArrObj);

      if(this.count == 2){
        this.setDataTo();
      }

    })
  }

  setDataTo(){
    this.count = 0;

    this.cost = this.tempCost;
    this.myTempVar = this.cost / this.oldCost * 100 - 100;
    this.myPerc = `${(this.cost - this.oldCost).toFixed(2)} (${this.myTempVar.toFixed(2) }%)`
    this.timeStap = this.tempTimeStap;
  }

}


