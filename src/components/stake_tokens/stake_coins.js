import React from 'react'
import DashBoard from './dashboard';
import { Validators_Table } from "./table";
import { Staked_Validators_Table } from "./staked_validators_table";
import { useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


export const Stake_Coins = (props) => {

  const [all_validators_render, setValidatorsFilter] = useState(true)


  console.log("====> ALL VALIDATORS", all_validators_render)
  
  function set_all_validators(){
  
    setValidatorsFilter(true)
  }
  
  function set_staked_validators(){
  
    setValidatorsFilter(false)
  }

  const all_validators_header = (all_validators_render ? (

      <Typography variant="h3" gutterBottom component="div" color="#f5f5f5">
          All Validators
      </Typography>

    ):(
      <Typography variant="h4" gutterBottom component="div">
          All Validators
      </Typography>

    )
  )

  const staked_validators_header = (!all_validators_render ? (

      <Typography variant="h3" gutterBottom component="div" color="#f5f5f5">
          Staked Validators
      </Typography>

    ):(
      <Typography variant="h4" gutterBottom component="div">
          Staked Validators
      </Typography>
    )
  )

  const choosed_validators_table = (all_validators_render ? <div> <Validators_Table /> </div> : <div> < Staked_Validators_Table /> </div>)
  


  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
              <div className='row'>
                  
                <DashBoard />

              </div>
              <p></p>
              <div className='row'>
              <div role="presentation" >
                  <Breadcrumbs variant="h5">
                    <Link 
                      underline="hover" 
                      color="inherit" 
                      // href="/"
                      onClick={set_all_validators}     
                    >
                      {all_validators_header}
                    </Link>

                    <Link
                      underline="hover"
                      color="inherit"
                      // href="/material-ui/getting-started/installation/"
                      onClick={set_staked_validators}
                    >
                      {staked_validators_header}
                    </Link>
                  </Breadcrumbs>
                </div>
                <p></p>
                {choosed_validators_table}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}