import React from 'react'
import { Send_Coins } from "./send_coins";


export const Transactions_history = (props) => {

    const test_arr = ["appl", "lino", "brodyaga", "bop"]

    const items = test_arr.map((item) =>

        <li 
            
            key={item}>  <acc_name> {item} </acc_name>
        
        </li>
    );


    console.log("TEst ITems")
    console.log(items)



    return (

        <div>
            <div id='transactions_history'>
                <div className='container' >
                    <p></p>
                    <p> <acc_name> Transactions history: </acc_name></p>
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>
        </div>
    )
}
