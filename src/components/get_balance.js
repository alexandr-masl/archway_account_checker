import React from 'react'
import { useState } from 'react'
// init("user_sklvQNCX9AIjZ1VyPrKoJ");

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
// import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';

import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"

import { Secp256k1HdWallet } from "cosmwasm";

import Cookies from 'js-cookie'

import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";

import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";

import { Cosm } from './cosm';

const secp256k1 = require('secp256k1')


const publicKeyToAddress = require('ethereum-public-key-to-address')




let gasPrice = GasPrice.fromString('0.002uconst');




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


    Cookies.remove('userAddress')

    let cosm_wasm_client = await CosmWasmClient.connect(RPC);
    const _is_submited_switching = form_is_submited ? false : true
 
    const coin = "uconst"

    try { 

      const _balance = await cosm_wasm_client.getBalance(name, coin) 
      const _chain_id = await cosm_wasm_client.getChainId()

      const mnemonic =
        "oak kitchen caught panel agent scare pulse abstract only tell protect occur";

        // Create a wallet
      // const wallet = await new Secp256k1HdWallet(mnemonic);

      // console.log(":::::: FROM MNEMONIC ")
      // console.log(wallet);

      const wallet_adress = "archway1stx7zdhtlpeah9qsw7959qvtwpywrmp7p6arks"

      const algo = "secp256k1"

      const pub_key = "Agbm2GiSK3KhOpXPzic9FbYIfhwvh6EYyOZVCuv+N5ji"

      new Cosm().check()

      const offln_signer = [
        {
          address: wallet_adress,
          // Currently, only secp256k1 is supported.
          algo: "secp256k1",
          pubkey: pub_key,
        },
      ];

      const offline_sign = new Cosm(wallet_adress, pub_key)


      let cwClient = await SigningCosmWasmClient.connectWithSigner(RPC, offline_sign, {gasPrice: gasPrice});

      console.log("::::::::::::::::: CW CLIENT INFO ")
      console.log(cwClient);


      // let accounts = await client.getAccounts();

      const sent_tokens = await cwClient.sendTokens("archway169kmp7zf5u5tengqmskwfzzsutcjmzt9r22fl0", "archway1ms4pgv3umf52rjy6zu5rqgyfsaemr6e9yg5y4w", [{ amount: "7777", denom: "uconst" }], "auto", "test transfer")


      console.log("::::::::::::::::: NEW CLIENT INFO ")
      console.log(sent_tokens);

      if (!Number(_balance.amount)){

        checkBalance({

          balance: _balance.amount.toString(),
          chain_id: _chain_id.toString()
        })

      }
      else{    

        const _account = await cosm_wasm_client.getAccount(name.toLowerCase())

        const account_info = {

          balance: _balance.amount.toString(),
          chain_id: _chain_id.toString()
        }

        if (_account && _account["accountNumber"])
          account_info["acc_number"] = _account.accountNumber
          account_info["address"] = _account.address

        if (_account && _account.pubkey){    

          account_info["pubkey_type" ] = _account.pubkey.type
          account_info["pubkey_value"] = _account.pubkey.value
        }

        checkBalance(account_info)
      }
  
    } catch(err){ 
      
      console.log("!!!!!!!ERRRR  GET ACCOUNT ")
      console.log(err)

      checkBalance({err: "Account not found.."})
    }

    setFormState(_is_submited_switching)
  }

  const account_info = (() => {   

    const success_submit = (

      Number(balance_responce.balance) ?

        <div className='section-title'>
          <h2> Account Info</h2>
          <p> Account Number: {balance_responce.acc_number} </p>
          <p> Adress: {balance_responce.address} </p>
          <p> Balance: {balance_responce.balance} UCONST </p>
          <p> Chain Name: {balance_responce.chain_id} </p>
          <p> Public key type: {balance_responce.pubkey_type} </p>
          <p> Public key value: {balance_responce.pubkey_value} </p>
        </div>

        :

          <div className='section-title'>
          <h2> Account Info</h2>
          <p> Adress: {name} </p>
          <p> Balance: {balance_responce.balance} UCONST </p>
          <p> Chain Name: {balance_responce.chain_id} </p>
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
