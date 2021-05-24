import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss']
})
export class CryptoChartComponent implements OnInit {

  constructor() { }

  @Input() oneDayChange: any;
  @Input() sevenDayChange: any;
  @Input() yearChange: any;

  options: any;

  ngOnInit(): void {
    this.options = {
      color: ['#FF8C00'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['One day change', 'Seven day changed', 'Year change'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '$',
          type: 'bar',
          barWidth: '60%',
          data: [parseFloat(this.oneDayChange), parseFloat(this.sevenDayChange), parseFloat(this.yearChange)],
        },
      ],
    };
  }

}
