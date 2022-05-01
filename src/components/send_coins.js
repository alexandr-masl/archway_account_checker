import React from 'react'
import { useState } from 'react'
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';
const RPC = ConstantineInfo.rpc;

const initialState = {
  name: '',
  // email: '',
  // message: '',
}


export const Send_Coins = (props) => {

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
      <div id='send_tokens'>
        <div className='container' >
            <form name='sentMessage' validate onSubmit={handle_send_coins}>

                <ul className='nav navbar-nav navbar-left' >

                    <li>
                        <input
                            type='text'
                            id='name'
                            name='name'
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
                            id='name'
                            name='name'
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
