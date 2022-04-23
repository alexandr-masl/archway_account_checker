import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Get_Balance_Form } from "./components/get_balance";
import { Navigation } from "./components/navigation";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // contract: ContractAddress,
      counter: null,
      cwClient: null,
      offlineSigner: null,
      // chainMeta: ConstantineInfo,
      gasPrice: null,
      queryHandler: null,
      loadingStatus: false,
      loadingMsg: "",
      logs: [],
      // rpc: RPC,
      accounts: null,
      userAddress: null
    };
  };

  render() {
    // State
    const loadingMsg = this.state.loadingMsg;
    const userAddress = this.state.userAddress;

    // Maps
    let logMeta = [];

    for (let i = 0; i < this.state.logs.length; i++) {
      let logItem = JSON.parse(this.state.logs[i]);
      let meta = {
        type: logItem[0].type,
        timestamp: logItem[0].timestamp
      };
      logMeta.push(meta);
    }
    const logItems = (this.state.logs.length) ? this.state.logs.map((log,i) =>
      <div key={logMeta[i].timestamp}>
        <p className="label">
          <strong><span>Counter {(logMeta[i].type === 'increment') ? 'Incremented' : 'Reset' }&nbsp;</span>({logMeta[i].timestamp}):</strong>
        </p>
        <pre className="log-entry" key={i}>{log}</pre>
      </div>
    ) : null;

    // Not Connected
    if (!userAddress) {
      return (
        <div className="content">
          {/* <img src={logo} alt="logo" /> */}

          <div className="button-controls">
            <h2>

            </h2>
            {/* <button id="connect" className="btn btn-main" onClick={this.connectWallet}>Connect Wallet</button> */}
          </div>
          <div>
            <Navigation/>
            <Get_Balance_Form />
          </div>

        </div>
      );
    }

    // Connected
    return (
      <div className="content">
        {/* <img src={logo} alt="logo" /> */}

        {/* Counter Status Display */}
        {/* <div className="status-display">
          <ul className="status">
            <li className="counter"><strong>Counter:</strong>&nbsp;{counter}</li>
          </ul>
        </div> */}

        {/* Controls */}
        {/* <div className="button-controls">
          <button id="incrementer" className="btn btn-main" onClick={this.incrementCounter}>Increment Counter</button>
          <button id="resetter" className="btn btn-alt" onClick={this.resetCounter}>Reset Counter</button>
        </div> */}

        <div>
          <Navigation />
          <Get_Balance_Form />
        </div>
        {/* Loading */}
        {Loading(loadingMsg)}

        {/* Logs map */}
        <div className="logs">
          <div>{logItems}</div>
        </div>

      </div>
    );
  };

}

// Conditional rendering
function Loading(msg) {
  if (!msg) {
    return;
  }
  return (
    <div className="loading">
      <p>{msg}</p>
    </div>
  );
}