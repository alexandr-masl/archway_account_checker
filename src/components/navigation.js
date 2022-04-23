import React from 'react'
import logo from '../logo.svg';
import { useState } from 'react'
import { Get_Balance_Form } from "../components/get_balance";
import { Contracts } from './contracts';


const initialState = {

    account: true,
    contracts: false
}


export const Navigation = (props) => {

    const [curr_state, setState] = useState(initialState)


    const connectWallet = () => {

        console.log("======> COONECT WALLET ")
    }

    const use_account_state = () => {

        setState({account: true,contracts: false}) 
    }

    const use_contract_state = () => {

        setState({account: false, contracts: true})     
    }

    const account_info = (() => {   

        if (curr_state.account){

            return (
    
                <div>
                    <Get_Balance_Form/>
                </div>
            )
        }
        else {

            return (
    
                <div>
                    <Contracts/>
                </div>
            )
        }
    
    })()


    return (
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
            {/* <ul className='nav navbar-nav navbar-right'>
                <li>
                    <a onClick={use_account_state} className='page-scroll'>
                    Accounts
                    </a>
                </li>
              <li>
                    <a onClick={use_contract_state} className='page-scroll'>
                    Contracts
                    </a>
                </li>
                <li> 
                    <button id="connect" className="btn-custom" onClick={connectWallet}>Connect Wallet</button>
                </li>
            </ul> */}
          </div>
        </div>
      </nav>
      
    )
  }
  