import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { CosmWasm_Client } from '../core/cosmwasm_client';

const initialState = {
  name: ''
}

export const Get_Balance_Form = (props) => {

  const [{ name }, setState] = useState(initialState)
  const [form_is_submited, setFormState] = useState(false)
  const [got_account_info, setAccountInfo] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    Cookies.remove('userAddress')

    const _is_submited_switching = form_is_submited ? false : true
 
    const account_info = await new CosmWasm_Client().get_account_info(name)

    if (account_info.err)
      setAccountInfo({err: account_info.err})

    setAccountInfo(account_info)
    setFormState(_is_submited_switching)
  }

  const account_info = (() => {   

    const success_submit = (

      Number(got_account_info.balance) ?

        <div className='section-title'>
          <h2> Account Info</h2>
          <p> Account Number: {got_account_info.acc_number} </p>
          <p> Adress: {got_account_info.address} </p>
          <p> Balance: {got_account_info.balance} UCONST </p>
          <p> Chain Name: {got_account_info.chain_id} </p>
          <p> Public key type: {got_account_info.pubkey_type} </p>
          <p> Public key value: {got_account_info.pubkey_value} </p>
        </div>

        :

          <div className='section-title'>
          <h2> Account Info</h2>
          <p> Adress: {name} </p>
          <p> Balance: {got_account_info.balance} UCONST </p>
          <p> Chain Name: {got_account_info.chain_id} </p>
        </div>

    )

    const err_submit = (

      <div className="section-title">

        <h2> Account Info</h2>
        {got_account_info.err}

      </div>
    )

    if (got_account_info.err)  
      return err_submit
    else 
      return success_submit

  })()

  const initial_form = (

    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Accounts checker</h2>
                <p>
                  Here you can get a full public information of any Archway-network account, just input the account adress
                </p>
                <p> For example u can try to input this adress: archway1d7krrujhwlkjd5mmv5g6hnqpzpa0dt2x8hcnys </p>
              </div>
             <div id='send_tokens'>
              <div className='container' >
                  <form name='sentMessage' validate onSubmit={handleSubmit}>

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
                              <button id="connect" className="check-btn" type='submit' validate onSubmit={handleSubmit} >Get account info</button>
                          </li>
                      </ul>
                  </form>
              </div>
            </div>

            </div>
          </div>
         
        </div>
      </div>
    </div>
  )

  const submited_form = (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              {account_info}
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Check another account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (form_is_submited){

    return submited_form
  }
  else 

    return initial_form
}
