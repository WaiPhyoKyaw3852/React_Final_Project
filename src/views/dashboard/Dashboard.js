import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { useHistory } from 'react-router';

const MyChart = () => {

	const history = useHistory();
  
  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`)
    if(flag != "true"){
      history.push(`/Login`);
    }
}, );
  useEffect(() => {
    const xyValues = [
      { x: 50, y: 7 },
      { x: 60, y: 8 },
      { x: 70, y: 8 },
      { x: 80, y: 9 },
      { x: 90, y: 9 },
      { x: 100, y: 9 },
      { x: 110, y: 10 },
      { x: 120, y: 11 },
      { x: 130, y: 14 },
      { x: 140, y: 14 },
      { x: 150, y: 15 },
    ];

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            pointRadius: 4,
            pointBackgroundColor: 'rgb(0,0,255)',
            data: xyValues,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [{ ticks: { min: 40, max: 160 } }],
          yAxes: [{ ticks: { min: 6, max: 16 } }],
        },
      },
    });
  }, []);

  return (
    <div>
        <u style={{color: 'blue', fontSize: '20px', fontFamily:'Indie Flower'}}>This is a Example Chart</u>
        <canvas id="myChart" style={{ width: '100%', maxWidth: '700px', paddingTop:'40px' }} />
    </div> 
  );
};

export default MyChart;
