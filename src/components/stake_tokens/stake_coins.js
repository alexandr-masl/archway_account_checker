import React, { Component } from "react";
import DashBoard from './dashboard';
import { Validators_Table } from "./table";
import { Staked_Validators_Table } from "./staked_validators_table";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie'
import { CosmWasm_Client } from '../../core/cosmwasm_client';


export class Stake_Coins extends Component{

  constructor() {
    super();

    this.state = {
      balance: 0,
      all_validators_render: true
    };

    this.set_all_validators = this.set_all_validators.bind(this)
    this.set_staked_validators = this.set_staked_validators.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
  set_all_validators(){
  
    this.setState({all_validators_render: true})
  }
  
  set_staked_validators(){
  
    this.setState({all_validators_render: false})
  }

  async componentDidMount() {

    const cookies_user_adress = Cookies.get("userAddress")

    if (cookies_user_adress){

      const account_info = await new CosmWasm_Client().get_account_info(cookies_user_adress)

      this.setState({balance: Number(account_info.balance)})
    }
  }
  

  render(){  

    const all_validators_header = this.state.all_validators_render ? 

      <Typography variant="h3" gutterBottom component="div" color="#f5f5f5">
          All Validators
      </Typography>

    :
      <Typography variant="h4" gutterBottom component="div">
          All Validators
      </Typography>


    const staked_validators_header = !this.state.all_validators_render ? 

        <Typography variant="h3" gutterBottom component="div" color="#f5f5f5">
            Staked Validators
        </Typography>

      :
        <Typography variant="h4" gutterBottom component="div">
            Staked Validators
        </Typography>

    const choosed_validators_table = this.state.all_validators_render ? 
      <Validators_Table data={this.state.balance}/>
      : 
      < Staked_Validators_Table data={this.state.balance}/>


    return(
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
                          onClick={this.set_all_validators}     
                        >
                          {all_validators_header}
                        </Link>

                        <Link
                          underline="hover"
                          color="inherit"
                          // href="/material-ui/getting-started/installation/"
                          onClick={this.set_staked_validators}
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
}