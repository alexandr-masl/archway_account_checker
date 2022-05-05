import React from 'react'
import { Send_Coins } from "./send_coins";
import { Transactions_history } from "./transactions_history";



export const Wallet = (props) => {

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
              <p> </p>
              <p> </p>
              <Transactions_history data={props.data} />


            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}


// archwayd tx staking create-validator \
//   --from ${archway13vh5n2xh2u8uuj5frw56c8z33zj9s0wvh0hxs2} \
//   --amount 1000000000udenom \
//   --min-self-delegation 1000000000udenom \
//   --commission-rate 0.01 \
//   --commission-max-rate 0.1 \
//   --commission-max-change-rate 0.1 \
//   --pubkey "$(archwayd tendermint show-validator)" \
//   --chain-id constantine


// docker run --rm -it -v ~/.archway:/root/.archway archwaynetwork/archwayd:constantine \
//   add-genesis-account "archway13vh5n2xh2u8uuj5frw56c8z33zj9s0wvh0hxs2" 1000000000stake,1000000000ARCH