import React from 'react'
import { useState } from 'react'
import { Signed_CosmWasm_Client } from '../core/signed_cosmwasm_client'
import Frame from 'react-frame-component';
import Modal from 'react-modal';
import { useTable } from 'react-table'


const initialState = {
    account_adress: '',
    tokens_amount: 0,
}




export const Stake_Validator = (props) => {

    const data = React.useMemo(() => [
          {
            validator: 'Archway',
            voting_power: '411.2721M',
            commission: '19%',
            tokens_staked: 0,
            stake: ""
          },
          {
            validator: 'Archway 1',
            voting_power: '711.2721M',
            commission: '23%',
            tokens_staked: 0,
            stake: ""
          },
          {
            validator: 'Archway 2',
            voting_power: '611.2721M',
            commission: '33%',
            tokens_staked: 0,
            stake: ""
          },
        ],
        []
      )
    
      const columns = React.useMemo(() => [
            {
                Header: 'Validator',
                accessor: 'validator' // accessor is the "key" in the data
            },
            {
                Header: 'Voting Power',
                accessor: 'voting_power'
            },
            {   
                Header: 'Commission',
                accessor: 'commission'
            },
            {   
                Header: 'Tokens Staked',
                accessor: 'tokens_staked'
            },
            {   
                Header: 'Stake',
                accessor: 'stake'
            }
        ],
        []
      )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
    
      return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                    //   borderBottom: 'solid 3px red',
                      background: '',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '20px',
                          border: 'solid 1px gray',
                        //   background: 'papayawhip',
                            "text-align": "center"
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )

    // const [tokens_amount, setState] = useState(initialState)
    // const [staking_validators, setValidators] = useState([])

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    
    //     // setState((prevState) => ({ ...prevState, [name]: value }))


    //     console.log("---- handleChange --- e ")
    //     console.log(e)
    // }

    // const stake_coins = async () => {

    //     let offlineSigner = await window.getOfflineSigner(props.data.chainMeta.chainId)



    //     console.log("------ STAKE VALIDATORS STAKE ")



    //     setValidators(staking_validators => [...staking_validators, "response"]);

    //     // const stake_tokens = await new Signed_CosmWasm_Client().delegate_tokens(props.data.userAddress, "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m", tokens_amount, offlineSigner)

    //     // console.log(stake_tokens)

    // }

    // const validator_module_state = (validator_id) => {


    //     // <div className='row'>
    //     //     <form name='sentMessage' validate onSubmit={stake_coins}>
    //     //         <ul className='nav navbar-nav navbar-left' >
                    
    //     //             <li>
    //     //                 <h3> {item.description.moniker} </h3>
    //     //             </li>
    //     //             <li>
    //     //                 <p> </p>
    //     //             </li>
    //     //             <li>
    //     //                 <input
    //     //                     type='number'
    //     //                     id='tokens_amount'
    //     //                     name='tokens_amount'
    //     //                     className='send-tokens-amount-input'
    //     //                     placeholder= 'input coins amount '
    //     //                     required
    //     //                     onChange={handleChange}
    //     //                 />
    //     //             </li>
                    
    //     //             <li> 
    //     //                 <button id="connect" className="send-btn" type='submit' >Delegate Tokens</button>
    //     //             </li>
    //     //         </ul>
    //     //     </form>
    //     // </div>
    // }

    // const items = validators.map((item, index) =>{

    //     const item_name = "---> Index "+ index

    //     console.log(item_name)

    //     return (
            
    //         <li  key={item} >

    //             <div>
    //                 <div id='send_tokens'>
    //                     <div className='container' >
    //                         <div className='col-md-8'>
    //                             <div className='row'>

    //                                 <form name='sentMessage' validate onSubmit={stake_coins}>
    //                                     <ul className='nav navbar-nav navbar-left' >
                                            
    //                                         <li>
    //                                             <h3> {item.description.moniker} </h3>
    //                                         </li>
    //                                         <li>
    //                                             <p> </p>
    //                                         </li>
    //                                         <li>
    //                                             <input
    //                                                 type='number'
    //                                                 id='tokens_amount'
    //                                                 name='tokens_amount'
    //                                                 className='send-tokens-amount-input'
    //                                                 placeholder= 'input coins amount '
    //                                                 required
    //                                                 // onChange={handleChange}
    //                                             />
    //                                         </li>
                                            
    //                                         <li> 
    //                                             <button id="connect" className="send-btn" type='submit' >Delegate Tokens</button>
    //                                         </li>
    //                                     </ul>
                                    
    //                                 </form>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </li>
    //     )
    // });


    // return (
    //     <div>
    //         {items}
    //     </div>
    // )
}
