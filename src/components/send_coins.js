import React from 'react'
import { useState } from 'react'
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';
const RPC = ConstantineInfo.rpc;


const initialState = {
  account_adress: '',
  tokens_amount: 0,
}


export const Send_Coins = (props) => {

  const [{ account_adress, tokens_amount }, setState] = useState(initialState)
  const [sending_tokens, setFormState] = useState(false)
  const [sending_tokens_info, setSendingTokensInfo] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handle_send_coins = async (e) => {

    try{   
      e.preventDefault()

      setFormState(true)
      setSendingTokensInfo({info: "Sending tokens..."})

      let offlineSigner = await window.getOfflineSigner(props.data.chainMeta.chainId)
      let gasPrice = GasPrice.fromString('0.002uconst');
      let cwClient = await SigningCosmWasmClient.connectWithSigner(props.data.rpc, offlineSigner, {gasPrice: gasPrice});
      // let accounts = await offlineSigner.getAccounts();

      // delegateTokens

      const delegate_tokens = await cwClient.delegateTokens(props.data.userAddress, account_adress, { amount: tokens_amount, denom: "uconst" }, "auto", "test delegate")

      console.log("====> Delegate Tokens")
      console.log(delegate_tokens)



      console.log("==========>>> SENDING TOKENS FROM ", props.data.userAddress, "TO", account_adress)

      const sent_tokens = await cwClient.sendTokens(props.data.userAddress, account_adress, [{ amount: tokens_amount, denom: "uconst" }], "auto", "test transfer")

      console.log(sent_tokens)
      


      console.log('HASH')
      console.log(sent_tokens.transactionHash)



      setSendingTokensInfo({

        info: "Successfully sent ✔️",
        data: sent_tokens.rawLog,
        transaction_hash: "Transaction HASH:  "+ sent_tokens.transactionHash,
        transaction_height: "Transaction number:  "+ sent_tokens.height,
        transaction_gas_used: "Gas used:  "+ sent_tokens.gasUsed,
        transaction_gas_wanted: "Gas wanted:  "+ sent_tokens.gasWanted
      })
    }
    catch(err){

      setSendingTokensInfo({

        info: "⚠️Transaction failed..",
        transaction_hash: err.toString(),
      })

      console.log('SEND TOKEN ERRRRRRRRRRR')
      console.log(err)
    }
  }

  const handle_resend_tokens = (e) => {
      
    e.preventDefault()
    setFormState(false)
  }

  if (sending_tokens){

    return (
      <div id='send_tokens'>
        <div className='container' >
          <div className='section-title'>
            <p> </p>
            <p> </p>
            <p> {sending_tokens_info.info} </p>
            <p> <acc_name> {sending_tokens_info.transaction_hash} </acc_name> </p>
            <p> <acc_name> {sending_tokens_info.transaction_height} </acc_name> </p>
            <p> <acc_name> {sending_tokens_info.transaction_gas_used} </acc_name> </p>
            <p> <acc_name> {sending_tokens_info.transaction_gas_wanted} </acc_name> </p>
          </div>
          <form name='sentMessage' validate onSubmit={handle_resend_tokens}>
                  <button type='submit' className='btn btn-custom btn-lg'>
                    send more tokens
                  </button>
          </form>
        </div>
      </div>)
  }


  return (
    <div>
      <div id='send_tokens'>
        <div className='container' >
            <form name='sentMessage' validate onSubmit={handle_send_coins}>

                <ul className='nav navbar-nav navbar-left' >

                    <li>
                        <input
                            type='text'
                            id='account_adress'
                            name='account_adress'
                            className='send-tokens-form'
                            placeholder='input account adress'
                            required
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <p> "" </p>
                    </li>
                    <li>
                        <input
                            type='number'
                            id='tokens_amount'
                            name='tokens_amount'
                            className='send-tokens-amount-input'
                            placeholder='input coins amount'
                            required
                            onChange={handleChange}
                        />
                    </li>
                    
                    <li> 
                        <button id="connect" className="send-btn" type='submit' validate onSubmit={handle_send_coins} >Send Coins</button>
                    </li>
                </ul>
            </form>
        </div>
      </div>
    </div>
  )
}
