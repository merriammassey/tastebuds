import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VoteChart extends Component {
  render(props) {
    const options = {
      title: {
        text: props.title,
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: props.currentRestaurants[0], y: 10 },
            { label: props.currentRestaurants[1], y: 15 },
            { label: "Banana", y: 25 },
            { label: "Mango", y: 30 },
            { label: "Grape", y: 28 },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}

export default VoteChart;
