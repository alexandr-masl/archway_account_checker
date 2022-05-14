import React from 'react'
import { Stake_Validator } from "./stake_validator_module";
import { Validators_Table } from "./table/table";



export const Stake_Coins = (props) => {

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>

            <div className='card'>


                <div className='left_content'>
                    
                    "fisrt block"
                </div>
                <div className='block'>
                    
                    "second block"
                </div>
                <p></p>
                <div className='row'>

                  <Validators_Table />

                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}