import React, { Component, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import { Get_Balance_Form } from "./components/get_balance";
import { ConstantineInfo } from './chain.info.constantine';
import { Wallet } from './components/wallet';
import { Stake_Coins } from './components/stake_tokens/stake_coins';
import { Navigation} from "./components/nav_bar"


export default class App extends Component {

  constructor(props) {
    super(props);
  };

  render() {
      
    return (

      <div className="content">
        <h2>
              ""
        </h2>
        <div>
          <Router>
            <Navigation />
              <Routes>
                <Route exact path="/" element={<Stake_Coins/>}/>
                <Route exact path="/network_info" element={<Get_Balance_Form data={this.state}/>}/>
                <Route exact path="/stake_tokens" element={<Stake_Coins data={this.state}/>}/>
                <Route exact path="/wallet" element={<Wallet data={this.state}/>}/>
              </Routes>
          </Router>
        </div>
      </div>
    );
  };
}
