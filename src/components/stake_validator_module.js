import React from 'react'
import { useState } from 'react'
import { Signed_CosmWasm_Client } from '../core/signed_cosmwasm_client'
import Frame from 'react-frame-component';
import Modal from 'react-modal';



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
    },
    // {   
    //     max_change_rate: "0.010000000000000000",
    //     max_rate: "0.200000000000000000",
    //     rate: "0.100000000000000000",
    //     update_time: "2022-04-08T13:26:20.761688550Z",
    //     consensus_pubkey: "'@type': /cosmos.crypto.ed25519.PubKey",
    //     key: "u3zfkoNAa4aOaJh5NVqN/Asx4kq9Rp/87rFF3kiXnN4=",
    //     delegator_shares: "100000000000032263.000000000000000000",
    //     description:{
    //         moniker: "archway-1"
    //         },
    //     min_self_delegation: "1",
    //     operator_address: "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m",
    //     // status: BOND_STATUS_BONDED,
    //     tokens: "100000000000032263",
    //     unbonding_time: "1970-01-01T00:00:00Z"
    // }
] 

const initialState = {
    account_adress: '',
    tokens_amount: 0,
}


export const Stake_Validator = (props) => {

    const [tokens_amount, setState] = useState(initialState)
    const [staking_validators, setValidators] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target
    
        // setState((prevState) => ({ ...prevState, [name]: value }))


        console.log("---- handleChange --- e ")
        console.log(e)
    }

    const stake_coins = async () => {

        let offlineSigner = await window.getOfflineSigner(props.data.chainMeta.chainId)



        console.log("------ STAKE VALIDATORS STAKE ")



        setValidators(staking_validators => [...staking_validators, "response"]);

        // const stake_tokens = await new Signed_CosmWasm_Client().delegate_tokens(props.data.userAddress, "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m", tokens_amount, offlineSigner)

        // console.log(stake_tokens)

    }

    const validator_module_state = (validator_id) => {


        // <div className='row'>
        //     <form name='sentMessage' validate onSubmit={stake_coins}>
        //         <ul className='nav navbar-nav navbar-left' >
                    
        //             <li>
        //                 <h3> {item.description.moniker} </h3>
        //             </li>
        //             <li>
        //                 <p> </p>
        //             </li>
        //             <li>
        //                 <input
        //                     type='number'
        //                     id='tokens_amount'
        //                     name='tokens_amount'
        //                     className='send-tokens-amount-input'
        //                     placeholder= 'input coins amount '
        //                     required
        //                     onChange={handleChange}
        //                 />
        //             </li>
                    
        //             <li> 
        //                 <button id="connect" className="send-btn" type='submit' >Delegate Tokens</button>
        //             </li>
        //         </ul>
        //     </form>
        // </div>
    }

    const items = validators.map((item, index) =>{

        const item_name = "---> Index "+ index

        console.log(item_name)

        return (
            
            <li  key={item} >

                <div>
                    <div id='send_tokens'>
                        <div className='container' >
                            <div className='col-md-8'>
                                <div className='row'>

                                    <form name='sentMessage' validate onSubmit={stake_coins}>
                                        <ul className='nav navbar-nav navbar-left' >
                                            
                                            <li>
                                                <h3> {item.description.moniker} </h3>
                                            </li>
                                            <li>
                                                <p> </p>
                                            </li>
                                            <li>
                                                <input
                                                    type='number'
                                                    id='tokens_amount'
                                                    name='tokens_amount'
                                                    className='send-tokens-amount-input'
                                                    placeholder= 'input coins amount '
                                                    required
                                                    // onChange={handleChange}
                                                />
                                            </li>
                                            
                                            <li> 
                                                <button id="connect" className="send-btn" type='submit' >Delegate Tokens</button>
                                            </li>
                                        </ul>
                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </li>
        )
    });


    return (
        <div>
            {items}
        </div>
    )
}
