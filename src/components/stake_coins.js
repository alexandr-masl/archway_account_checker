import React from 'react'
import { Stake_Validator } from "./stake_validator_module";


export const Stake_Coins = (props) => {

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
               <h2> Stake Tokens</h2>
              </div>
              <Stake_Validator data={props.data} />
              <p> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}