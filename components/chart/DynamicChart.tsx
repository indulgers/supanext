'use client'
import React, { useState, useEffect, FC } from 'react';
import ReactECharts from 'echarts-for-react';
import { cloneDeep } from 'lodash';
interface IProps {
}
export const DynamicChart: FC<IProps> = () => {
  const DEFAULT_OPTION = {
    title: {
      text:'Hello Echarts-for-react.',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:['最新成交价', '预购队列']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom:30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(Number(now) - 2000); // Convert now to a number before subtraction
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(50 - len + 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '价格',
        max: 20,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '预购量',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name:'预购队列',
        type:'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: function (idx: number) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx: number) {
          return idx * 10;
        },
        data:(function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })()
      },
      {
        name:'最新成交价',
        type:'line',
        data:(function (){
          let res = [];
          let len = 0;
          while (len < 50) {
            res.push(Number((Math.random()*10 + 5).toFixed(1)) - 0);
            len++;
          }
          return res;
        })()
      }
    ]
  };

  let count: number = 51;

  const [option, setOption] = useState(DEFAULT_OPTION);

  function fetchNewData() {
    const axisData: string = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
    const newOption = cloneDeep(option); // immutable
    newOption.title.text = 'Hello Echarts-for-react.' + new Date().getSeconds();
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push(Number((Math.random() * 10 + 5).toFixed(1)));

    newOption.xAxis[0].data.shift();
    newOption.xAxis[0].data.push(axisData as never);
    newOption.xAxis[1].data.shift();
    newOption.xAxis[1].data.push(count++ as never);

    setOption(newOption);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData();
    }, 1000);

    return () => clearInterval(timer);
  });

  return <ReactECharts
    option={option}
    style={{ height: 400 }}
  />;
}