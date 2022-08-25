import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  serviceName: any[] |  Services[]=[]
  serviceCost: any[] |  Services[]=[]

  constructor(private servicesService: ServicesService) { }

  getAllServiceName(){
    this.servicesService.getAllServices().subscribe(results=>{
      this.serviceName = results.data.map(mapitems=>{
      return mapitems.serviceName 
      })

      this.serviceCost = results.data.map(mapcosts=>{
        return mapcosts.serviceCost
        })
  

      console.log(this.serviceName)
      console.log(this.serviceCost)
      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: this.serviceName,
            datasets: [{
                label: 'cost of services',
                data: this.serviceCost,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      // this.serviceCost = results.data.serviceCost
    })
  }

  ngOnInit(): void {
    this.getAllServiceName()
  
  }

}
