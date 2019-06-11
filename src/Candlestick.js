import React, { Component } from "react";
import Chart from "./components/Chart";
import io from "socket.io-client";

import "./App.css";
var socket;
var that = this;
class Candlestick extends Component {
  constructor() {
    super();
    this.state = {
      stacks: {}
    };
  }

  componentDidMount() {
    this.getChartData();
    console.log("Component has mounted ");

    var that = this;
    var symbols = [
      "EUR/USD",
      "XAU/USD",
      "GBP/USD",
      "JPY/USD",
      "AUD/USD",
      "NZD/USD"
    ]; //"BTC/USD","USD/CHF","CAD/JPY","USD/TRY"];

    socket = io.connect("http://192.168.1.145:5000");
    socket.emit("join", symbols);
    socket.on("stack", function(datas) {
      console.log(datas);

      var stacks = that.state.stacks;

      stacks.map((stack, i) => {
        stack.buy = datas.buy;
        stack.sell = datas.sell;
        console.log(stacks);
        stacks.push(datas);
      });

      that.setState({
        stacks: stacks
      });
    });
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      stacks: {
        labels: [],
        datasets: [
          {
            data: [
              that.state.stacks.map(
                (values, i) => (
                  values.buy,
                  values.sell,
                  values.buy2,
                  values.sell2,
                  values.buy3,
                  values.sell3
                )
              )
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Chart
          chartData={this.state.stacks}
          location="Massachusetts"
          legendPosition="bottom"
        />
      </div>
    );
  }
}

export default Candlestick;
