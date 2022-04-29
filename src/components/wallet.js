import React from 'react'
import { useState } from 'react'
// init("user_sklvQNCX9AIjZ1VyPrKoJ");
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
// import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';

import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"

const RPC = ConstantineInfo.rpc;

const initialState = {
  name: '',
  // email: '',
  // message: '',
}


export const Wallet = (props) => {

  const [{ name, email, message }, setState] = useState(initialState)
  const [form_is_submited, setFormState] = useState(false)
  const [balance_responce, checkBalance] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handle_send_coins = async (e) => {
    e.preventDefault()

    
  }

  console.log("====> WALLET PROPS")
  console.log(props)



  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <p> <acc_name> Account </acc_name> {props.data.userAddress} </p>
                <p> <acc_name> Balance </acc_name> {props.data.balance} UCONST </p>
              </div>

              <form name='sentMessage' validate onSubmit={handle_send_coins}>
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
                        <button type='submit' className='btn btn-custom btn-lg'>
                            send coins
                        </button>
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}
