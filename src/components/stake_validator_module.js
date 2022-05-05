import React from 'react'
import { useState } from 'react'


const validators = [   

    {   
    max_change_rate: "0.010000000000000000",
    max_rate: "0.200000000000000000",
    rate: "0.100000000000000000",
    update_time: "2022-04-08T13:26:20.761688550Z",
    consensus_pubkey: "'@type': /cosmos.crypto.ed25519.PubKey",
    key: "u3zfkoNAa4aOaJh5NVqN/Asx4kq9Rp/87rFF3kiXnN4=",
    delegator_shares: "100000000000032263.000000000000000000",
    description:{
        moniker: "archway"
        },
    min_self_delegation: "1",
    operator_address: "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m",
    // status: BOND_STATUS_BONDED,
    tokens: "100000000000032263",
    unbonding_time: "1970-01-01T00:00:00Z"
    }
] 

const initialState = {
    account_adress: '',
    tokens_amount: 0,
}


export const Stake_Validator = (props) => {

    const [{ account_adress, tokens_amount }, setState] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setState((prevState) => ({ ...prevState, [name]: value }))
      }
    

    const stake_coins = () => {


    }

    const items = validators.map((item) =>

        <li 
            
            key={item}>  
            {/* <acc_name> {item.operator_address} </acc_name> */}

            <div>
                <div id='send_tokens'>
                    <div className='container' >
                        <form name='sentMessage' validate onSubmit={stake_coins}>

                            <ul className='nav navbar-nav navbar-left' >

                                <li>
                                    <input
                                        type='text'
                                        id='account_adress'
                                        name='account_adress'
                                        className='send-tokens-form'
                                        placeholder='input account adress'
                                        required
                                        onChange={stake_coins}
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
                                        onChange={stake_coins}
                                    />
                                </li>
                                
                                <li> 
                                    <button id="connect" className="send-btn" type='submit' validate onSubmit={stake_coins} >Send Coins</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </li>
    );


    console.log("TEst ITems")
    console.log(items)


    return (
        <div>
            {/* <div id='transactions_history'>
                <div className='container' >
                    <p></p>
                    <p></p> */}
                    <ul>
                        {items}
                    </ul>
                {/* </div>
            </div> */}
        </div>
    )
}
