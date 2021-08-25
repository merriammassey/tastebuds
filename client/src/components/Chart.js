import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VoteChart extends Component {
  render(eventData) {
    const props = { eventData };
    //console.log(this.props.eventData.restaurants[0]);
    const restaurants = this.props.eventData.restaurants;
    console.log(restaurants[0].votes.length);
    //var colors = ["#00a7c7", "#feab6b", "#e76f3d", "#9bcfe0"];
    CanvasJS.addColorSet("customColorSet1", [
      "#00a7c7",
      "#feab6b",
      "#e76f3d",
      "#9bcfe0",
    ]);
    var dps = [];
    const parseDataPoints = () => {
      for (var i = 0; i < restaurants.length; i++)
        dps.push({
          label: restaurants[i].name,
          y: restaurants[i].votes.length,
        });
    };
    parseDataPoints();
    //console.log(dps);
    const options = {
      colorSet: "customColorSet1",
      title: {
        //text: this.props.eventData.title,
      },
      axisX: {
        labelFontSize: 20,
        labelAngle: 0,
        labelAutoFit: true,
      },
      axisY: {
        interval: 1,
      },
      data: [
        {
          type: "column", //or bar
          dataPoints: dps,
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
