import React from 'react'
import { useState } from 'react'
import { Signed_CosmWasm_Client } from '../core/signed_cosmwasm_client'
import Modal from 'react-modal';



const initialState = {
  account_adress: '',
  tokens_amount: 0,
}

const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export const Send_Coins = (props) => {

  const [{ account_adress, tokens_amount }, setState] = useState(initialState)
  const [sending_tokens, setFormState] = useState(false)
  const [sending_tokens_info, setSendingTokensInfo] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setFormState(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handle_send_coins = async (e) => {

    try{   
      e.preventDefault()

      let offlineSigner = await window.getOfflineSigner(props.data.chainMeta.chainId)

      setFormState(true)
      setSendingTokensInfo({info: "Sending tokens..."})
      openModal()
        
      const sent_tokens = await new Signed_CosmWasm_Client().send_tokens(props.data.userAddress, account_adress, tokens_amount, offlineSigner)


      if (sent_tokens.err){

        return (setSendingTokensInfo({

          info: "⚠️Transaction failed..",
          transaction_hash: sent_tokens.err.toString(),
        }))

      }


      setSendingTokensInfo({

        info: "Successfully sent ✔️",
        data: sent_tokens.rawLog,
        transaction_hash: "Transaction HASH:  "+ sent_tokens.transaction_hash,
        transaction_height: "Transaction number:  "+ sent_tokens.transaction_height,
        transaction_gas_used: "Gas used:  "+ sent_tokens.transaction_gas_used,
        transaction_gas_wanted: "Gas wanted:  "+ sent_tokens.transaction_gas_wanted
      })

    }
    catch(err){

      setSendingTokensInfo({

        info: "⚠️Transaction failed..",
        transaction_hash: err.toString(),
      })

      console.log('SEND TOKEN ERRRRRRRRRRR')
      console.log(err)
    }
  }

  const handle_resend_tokens = (e) => {
      
    e.preventDefault()
    setFormState(false)
  }

  if (sending_tokens){

    return (

      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalCustomStyles}
      contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Send Tokens</h2>
        <p> </p>
        <p> </p>
        <p> {sending_tokens_info.info} </p>
        <p> <acc_name> {sending_tokens_info.transaction_hash} </acc_name> </p>
        <p> <acc_name> {sending_tokens_info.transaction_height} </acc_name> </p>
        <p> <acc_name> {sending_tokens_info.transaction_gas_used} </acc_name> </p>
        <p> <acc_name> {sending_tokens_info.transaction_gas_wanted} </acc_name> </p>        
        <button onClick={closeModal}>close</button>
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>

      // <div id='send_tokens'>
      //   <div className='container' >
      //     <div className='section-title'>
      //       <p> </p>
      //       <p> </p>
      //       <p> {sending_tokens_info.info} </p>
      //       <p> <acc_name> {sending_tokens_info.transaction_hash} </acc_name> </p>
      //       <p> <acc_name> {sending_tokens_info.transaction_height} </acc_name> </p>
      //       <p> <acc_name> {sending_tokens_info.transaction_gas_used} </acc_name> </p>
      //       <p> <acc_name> {sending_tokens_info.transaction_gas_wanted} </acc_name> </p>
      //     </div>
      //     <form name='sentMessage' validate onSubmit={handle_resend_tokens}>
      //             <button type='submit' className='btn btn-custom btn-lg'>
      //               send more tokens
      //             </button>
      //     </form>
      //   </div>
      // </div>
      )
  }


  return (
    <div>
      <div id='send_tokens'>
        <div className='container' >
            <form name='sentMessage' validate onSubmit={handle_send_coins}>

                <ul className='nav navbar-nav navbar-left' >

                    <li>
                        <input
                            type='text'
                            id='account_adress'
                            name='account_adress'
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
                            id='tokens_amount'
                            name='tokens_amount'
                            className='send-tokens-amount-input'
                            placeholder='input coins amount'
                            required
                            onChange={handleChange}
                        />
                    </li>
                    
                    <li> 
                        <button id="connect" className="send-btn" type='submit' >Send Coins</button>
                    </li>
                </ul>
            </form>
        </div>
      </div>
    </div>
  )
}
