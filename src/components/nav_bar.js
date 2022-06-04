import React from 'react';
import { useState } from 'react'
import logo from '../logo.svg';
import Cookies from 'js-cookie'
import { ConstantineInfo } from '../chain.info.constantine';


export const Navigation = () => {

    const cookies_user_adress = Cookies.get("userAddress")
    const got_coockie_account = cookies_user_adress ? true : false
    const [is_connected, setConnection] = useState(got_coockie_account)

   

    const disconnecttWallet = async () => { 

        Cookies.remove('userAddress')
        setConnection(false)

        console.log("---- Connection", is_connected)

        window.location.reload(false);
    }

    const connectWallet = async () => {

        console.log('Connecting wallet...');
        try {
          if (window) {
            if (window['keplr']) {
              if (window.keplr['experimentalSuggestChain']) {

                await window.keplr.experimentalSuggestChain(ConstantineInfo)
                await window.keplr.enable(ConstantineInfo.chainId);              
                let offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId);

                console.log('offlineSigner', offlineSigner);

                // let cwClient = await SigningCosmWasmClient.connectWithSigner(this.state.rpc, offlineSigner);
                
                let accounts = await offlineSigner.getAccounts();
                // let queryHandler = cwClient.queryClient.wasm.queryContractSmart;
                // let gasPrice = GasPrice.fromString('0.002uconst');
                let userAddress = accounts[0].address;

                // let cosm_wasm_public_client = await CosmWasmClient.connect(RPC);

                // const _balance = await cosm_wasm_public_client.getBalance(userAddress, "uconst") 

                setConnection(true)

                Cookies.set("userAddress", userAddress)

                console.log("---- connectWallet---- Connection", is_connected)

                window.location.reload(false);
  
              } else {
                console.warn('Error access experimental features, please update Keplr');
              }
            } else {
              return {err: "Keplr is not defined.."}
              console.warn('Error accessing Keplr');
            }
          } else {
            console.warn('Error parsing window object');
          }
        } catch (e) {
          console.error('Error connecting to wallet', e);
        }
    }

    const connection_button = is_connected ? 

        <a onClick={disconnecttWallet}> Disconnect Wallet </a> 
        : 
        <button id="connect" className="btn-custom" onClick={connectWallet}>Connect Wallet</button>


    return (
        <div>
            <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>

                    <a className='navbar-brand page-scroll' href='/'>
                    <img src={logo} alt="logo" />
                    </a>

                    <div
                        className='collapse navbar-collapse'
                        id='bs-example-navbar-collapse-1'
                    >
                        <ul className='nav navbar-nav navbar-right'>

                            <li>
                                <a href='/network_info'>
                                    Network Info
                                </a>
                            </li>

                            <li>
                                <a href="/stake_tokens" >
                                    Stake Tokens
                                </a>
                            </li>

                            <li>
                                <a href="/wallet">
                                    Wallet
                                </a>
                            </li>
                            <li> 
                                {connection_button}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div> 
    )
};

export default Navigation;


