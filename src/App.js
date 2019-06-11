import React from "react";
import "./App.css";
import Candlestick from "./Candlestick.js";

import SimpleDealingRates from "./SimpleDealingRates";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/* <SimpleDealingRates
          className="simpledealingrates"
          id="simpledealingrates"
        /> */}
        <br />
        <Candlestick />
        <div />
      </div>
    );
  }
}

export default App;
