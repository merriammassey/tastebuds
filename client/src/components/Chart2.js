import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import { useStoreContext } from "../utils/GlobalState";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const VoteChart = () => {
  const [state, dispatch] = useStoreContext();
  const { currentRestaurants, eventTitle, eventNote } = state;
  class VoteChart extends Component {
    render() {
      const options = {
        title: {
          text: { eventTitle, eventNote },
        },
        data: [
          {
            type: "column",
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
};

export default VoteChart;
