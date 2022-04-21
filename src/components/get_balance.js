import React from 'react'
import { useState } from 'react'
// init("user_sklvQNCX9AIjZ1VyPrKoJ");

// import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
// import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';

import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"

const RPC = ConstantineInfo.rpc;

const initialState = {
  name: '',
  // email: '',
  // message: '',
}


export const Get_Balance_Form = (props) => {

  const [{ name, email, message }, setState] = useState(initialState)
  const [form_is_submited, setFormState] = useState(false)
  const [balance_responce, checkBalance] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let cosm_wasm_client = await CosmWasmClient.connect(RPC);
    const _is_submited_switching = form_is_submited ? false : true
 
    const coin = "uconst"

    try { 

      const _balance = await cosm_wasm_client.getBalance(name, coin) 
      const _chain_id = await cosm_wasm_client.getChainId()
      const _account = await cosm_wasm_client.getAccount(name)

      const account_info = {

        balance: _balance.amount.toString(),
        chain_id: _chain_id.toString(),
        acc_number: _account.accountNumber,
        address: _account.address
      }

      if (_account.pubkey){    

        account_info["pubkey_type" ] = _account.pubkey.type
        account_info["pubkey_value"] = _account.pubkey.value
      }

        checkBalance(account_info)
  
    } catch(err){ 
      
      console.log("!!!!!!!ERRRR  GET ACCOUNT ")
      console.log(err)

      checkBalance({err: "Account not found.."})
    }

    setFormState(_is_submited_switching)
  }

  const account_info = (() => {   

    const success_submit = (

      <div className='section-title'>
        <h2> Account Info</h2>
        <p> Account Number: {balance_responce.acc_number} </p>
        <p> Adress: {balance_responce.address} </p>
        <p> Balance: {balance_responce.balance} UCONST </p>
        <p> Chain Name: {balance_responce.chain_id} </p>
        <p> Public key type: {balance_responce.pubkey_type} </p>
        <p> Public key value: {balance_responce.pubkey_value} </p>
      </div>
    )

    const err_submit = (

      <div className="section-title">

        <h2> Account Info</h2>

        <p className="text-danger" >
            
            {balance_responce.err}
        </p> 
      </div>
    )

    if (balance_responce.err)  
      return err_submit
    else 
      return success_submit

  })()

  const initial_form = (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Accounts checker</h2>
                <p>
                  Here you can get a full public information of any Archway-network account, just input the account adress
                </p>
                <p> For example u can try to input this adress: archway1d7krrujhwlkjd5mmv5g6hnqpzpa0dt2x8hcnys </p>
                {/* <p> archway1d7krrujhwlkjd5mmv5g6hnqpzpa0dt2x8hcnys </p> */}
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Input Account Adress'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                 
                </div>
          
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  get account info
                </button>
              </form>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )

  const submited_form = (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              {account_info}
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Check another account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (form_is_submited){

    return submited_form
  }
  else 

    return initial_form
}
