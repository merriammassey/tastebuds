<<<<<<< HEAD
import React, { Component } from "react";
import CanvasJSReact from "../../src/assets/canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VoteChart extends Component {
  render() {
    const options = {
      title: {
        text: "Basic Column Chart in React",
=======
import CanvasJSReact from "../assets/canvasjs.react";
import React, { Component } from "react";
//import "pusher-js/node";
//const Pusher = require("pusher");
//import { CanvasJSChart } from "canvasjs-react-charts";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
/* const Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1228744",
  key: "3cb02dbd0c542bff3bd5",
  secret: "18a0f8a7e8854f574cc5",
  cluster: "us3",
  useTLS: true,
}); */

class Chart extends Component {
  render(dataPoints, totalVotes) {
    const options = {
      animationEnabled: true,
      theme: "theme1",
      title: {
        //will show number of votes from database
        text: `Total Votes ${totalVotes}`,
        //text: "Total Votes: 6",
>>>>>>> createevent
      },
      data: [
        {
          type: "column",
<<<<<<< HEAD
          dataPoints: [
            { label: "Apple", y: 10 },
            { label: "Orange", y: 15 },
            { label: "Banana", y: 25 },
            { label: "Mango", y: 30 },
            { label: "Grape", y: 28 },
          ],
        },
      ],
    };
=======
          dataPoints: dataPoints,
        },
      ],
    };
    //Pusher.logToConsole = true;

    /*  var pusher = new Pusher("3cb02dbd0c542bff3bd5", {
      cluster: "us3",
    }); */

    /* var channel = pusher.subscribe("tastebuds");
    channel.bind("tastebudsvote", function (data) {
      dataPoints = dataPoints.map((x) => {
        if (x.label == data.restaurant) {
          x.y += data.points;
          return x;
        } else {
          return x;
        }
      });
      //rerender
      Chart.render();
    }); */
>>>>>>> createevent

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

<<<<<<< HEAD
export default VoteChart;
=======
export default Chart;
>>>>>>> createevent
