import { Component, OnInit } from '@angular/core';
import { file_url } from '../global';
import * as CanvasJs from '../../canvasjs.min.js';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

export class Dates{
  public date1:String="";
  public date2:String="";
}

@Component({
  selector: 'app-analyticpage',
  templateUrl: './analyticpage.component.html',
  styleUrls: ['./analyticpage.component.css']
})
export class AnalyticpageComponent implements OnInit {

  FILE_URL=file_url
  storage=window.sessionStorage
  dates=new Dates()
  chartPoints=[]

  constructor(public http : HttpService,public router:Router,private authService:SocialAuthService) { }

  ngOnInit(): void {
    if(!(this.storage.getItem("isContactSubmit")=='true')){
      this.router.navigate(["/"])
      alert("Submit form first.")
    }
  }

  onDateEnter(){
    this.chartPoints=[]
    if(this.dates.date1!="" && this.dates.date2!=""){
      this.http.getData(this.dates.date1,this.dates.date2).subscribe(
        data => {
          if('success' in data){
            let points = data["data"]
            for(let key of Object.keys(points)){
              let datetime=key.split("-")
              this.chartPoints.push({x:new Date(Number(datetime[0]),Number(datetime[1])-1,Number(datetime[2])),y:points[key]})
            }
            this.createChart(this.chartPoints)
            // console.log(this.chartPoints)
            // console.log(data)

          }
          else{
            alert("Server Error")
          }
          }
        ,
        error => {

        });
    }
  }

  createChart(pointData){
    var chart = new CanvasJs.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      zoomEnabled: true,
      axisX: {
        title:'Date',
        titleFontColor: "blue",
        interval:1,
        intervalType: "day"
      },
      axisY:{
        title:'Enquiries received',
        titleFontColor: "blue",
        interval:1,
        lineColor:"#000000"
      },
      data: [{        
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: pointData
      }]
    });
    chart.render();
  }

  logout(){
    this.authService.signOut()
    this.storage.setItem("isContactSubmit","")
    this.storage.setItem("isLogIn","")
  }

}
