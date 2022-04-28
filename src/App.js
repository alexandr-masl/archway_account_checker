import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Get_Balance_Form } from "./components/get_balance";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from './chain.info.constantine';


const RPC = ConstantineInfo.rpc;
const ContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;


export default class App extends Component {



  constructor(props) {
    super(props);
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
      userAddress: null
    };
  };

  render() {
    // State
    const loadingMsg = this.state.loadingMsg;
    const userAddress = this.state.userAddress;

    const initialState = {

      account: true,
      contracts: false
    }

    const use_account_state = () => {

      // setState({account: true,contracts: false}) 
    }
  
    const use_contract_state = () => {
  
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

                console.log("----> Account")
                console.log(accounts)
  
                // Update state
                this.setState({
                  accounts: accounts,
                  userAddress: userAddress,
                  cwClient: cwClient,
                  queryHandler: queryHandler,
                  gasPrice: gasPrice,
                  offlineSigner: offlineSigner
                });
  
                // Debug
                console.log('dApp Connected', {
                  accounts: this.state.accounts,
                  userAddress: this.state.userAddress,
                  client: this.state.cwClient,
                  queryHandler: this.state.queryHandler,
                  gasPrice: this.state.gasPrice,
                  offlineSigner: this.state.offlineSigner
                });

                await cwClient.sendTokens("archway169kmp7zf5u5tengqmskwfzzsutcjmzt9r22fl0")
  
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
                          <a onClick={use_account_state} className='page-scroll'>
                          Accounts
                          </a>
                      </li>
                    <li>
                          <a onClick={use_contract_state} className='page-scroll'>
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
          </div>

        </div>
      );
    }

    console.log(this.state.chainMeta)
    // Connected
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
                    <li>
                        <a onClick={use_account_state} className='page-scroll'>
                        Account adress   {this.state.userAddress}
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
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