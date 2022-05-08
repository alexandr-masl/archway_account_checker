import React, { Component, useState } from 'react';
// import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { browserHistory, Router, Route } from 'react-router';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import { Routes ,Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import { Get_Balance_Form } from "./components/get_balance";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from './chain.info.constantine';
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"
import { Wallet } from './components/wallet';
import Cookies from 'js-cookie'
import { Stake_Coins } from './components/stake_coins';
import { Navigation } from "./components/nav_bar"

const RPC = ConstantineInfo.rpc;
const ContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;


export default class App extends Component {

  constructor(props) {
    super(props);

    const cookies_user_adress = Cookies.get("userAddress")

    console.log("---------> COOOOOOOCKIES ")
    console.log(cookies_user_adress)


    this.state = {
      contract: ContractAddress,
      counter: null,
      cwClient: null,
      offlineSigner: null,
      chainMeta: ConstantineInfo,
      gasPrice: null,
      queryHandler: null,
      loadingStatus: false,
      loadingMsg: "",
      logs: [],
      rpc: RPC,
      accounts: null,
      userAddress: cookies_user_adress ? cookies_user_adress : null,
      balance: 0
    };
  };

  render() {
    // State
    const loadingMsg = this.state.loadingMsg;
    const userAddress = this.state.userAddress;


    const use_wallet_state = () => {
  
      // setState({account: false, contracts: true})     
    }
  
    const connectWallet = async () => {
      console.log('Connecting wallet...');
        try {
          if (window) {
            if (window['keplr']) {
              if (window.keplr['experimentalSuggestChain']) {

                await window.keplr.experimentalSuggestChain(this.state.chainMeta)
                await window.keplr.enable(this.state.chainMeta.chainId);              
                let offlineSigner = await window.getOfflineSigner(this.state.chainMeta.chainId);

                console.log('offlineSigner', offlineSigner);

                let cwClient = await SigningCosmWasmClient.connectWithSigner(this.state.rpc, offlineSigner);
                
                let accounts = await offlineSigner.getAccounts();
                let queryHandler = cwClient.queryClient.wasm.queryContractSmart;
                let gasPrice = GasPrice.fromString('0.002uconst');
                let userAddress = accounts[0].address;

                let cosm_wasm_public_client = await CosmWasmClient.connect(RPC);

                const _balance = await cosm_wasm_public_client.getBalance(userAddress, "uconst") 

                Cookies.set("userAddress", userAddress)

                // Update state
                this.setState({
                  accounts: accounts,
                  userAddress: userAddress,
                  cwClient: cwClient,
                  queryHandler: queryHandler,
                  gasPrice: gasPrice,
                  offlineSigner: offlineSigner,
                  balance: Number(_balance.amount)
                });
  
                // Debug
                console.log('dApp Connected', {
                  accounts: this.state.accounts,
                  userAddress: this.state.userAddress,
                  client: this.state.cwClient,
                  queryHandler: this.state.queryHandler,
                  gasPrice: this.state.gasPrice,
                  offlineSigner: this.state.offlineSigner,
                  balance: Number(_balance.amount)
                });
  
              } else {
                console.warn('Error access experimental features, please update Keplr');
              }
            } else {
              console.warn('Error accessing Keplr');
            }
          } else {
            console.warn('Error parsing window object');
          }
        } catch (e) {
          console.error('Error connecting to wallet', e);
        }
    }

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
            <h2>
                  ""
            </h2>
          <div>
            <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
              <div className='container'>
                <div className='navbar-header'>
                  <button
                    type='button'
                    className='navbar-toggle collapsed'
                    data-toggle='collapse'
                    data-target='#bs-example-navbar-collapse-1'
                  >
                    {' '}
                    <span className='sr-only'>Toggle navigation</span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                  </button>
                  <a className='navbar-brand page-scroll' href='#page-top'>
                  <img src={logo} alt="logo" />
                  </a>{' '}
                </div>
    
                <div
                  className='collapse navbar-collapse'
                  id='bs-example-navbar-collapse-1'
                >
                  <ul className='nav navbar-nav navbar-right'>
                      {/* <li>
                          <a onClick={connectWallet} className='page-scroll'>
                          Accounts
                          </a>
                      </li>
                      <li>
                          <a onClick={connectWallet} className='page-scroll'>
                          Contracts
                          </a>
                      </li> */}
                      <li> 
                          <button id="connect" className="btn-custom" onClick={connectWallet}>Connect Wallet</button>
                      </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Get_Balance_Form />
            <p></p>
            <Stake_Coins data={this.state} />
          </div>

        </div>
      );
    }

    // Connected
    return (

      <Router>
        <Navigation />
          <Routes>

            <Route exact path="/" element={<Stake_Coins/>}/>
            <Route exact path="/network_info" element={<Get_Balance_Form data={this.state}/>}/>
            <Route exact path="/stake_tokens" element={<Stake_Coins data={this.state}/>}/>
            <Route exact path="/wallet" element={<Wallet data={this.state}/>}/>
             
          </Routes>
      </Router>
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