import React from 'react'
import { useState } from 'react'
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';
import { Send_Coins } from "./send_coins";
import { Get_Balance_Form } from './get_balance';

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
    // let queryHandler = cwClient.queryClient.wasm.queryContractSmart;

    let offlineSigner = await window.getOfflineSigner(props.data.chainMeta.chainId)
    let gasPrice = GasPrice.fromString('0.002uconst');

    let cwClient = await SigningCosmWasmClient.connectWithSigner(props.data.rpc, offlineSigner, {gasPrice: gasPrice});
    let accounts = await offlineSigner.getAccounts();

    // console.log("====> OFFLINE SIGNER")
    // console.log(offlineSigner)

    // console.log("==========>>> SENDING TOKENS FROM ", props.data.userAddress, "TO", name)

    // const sent_tokens = await cwClient.sendTokens(props.data.userAddress, name, [{ amount: "7890", denom: "uconst" }], "auto", "test transfer")

    // console.log(sent_tokens)

    const upload = await cwClient.upload(props.data.userAddress, name, [{ amount: "7890", denom: "uconst" }], "auto", "test transfer")
  }

//   console.log("====> WALLET PROPS")
//   console.log(props)

// archway1stx7zdhtlpeah9qsw7959qvtwpywrmp7p6arks


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

              <Send_Coins data={props.data} />

            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}
