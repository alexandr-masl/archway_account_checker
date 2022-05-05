

import { ConstantineInfo } from '../chain.info.constantine';
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"
const RPC = ConstantineInfo.rpc;
const stakeCurrency = ConstantineInfo.stakeCurrency.coinMinimalDenom


export class CosmWasm_Client {


    public async get_account_info(account_adress: string){        
        try { 

            let cosm_wasm_client = await CosmWasmClient.connect(RPC);
                    
            const _balance = await cosm_wasm_client.getBalance(account_adress, stakeCurrency) 
            const _chain_id = await cosm_wasm_client.getChainId()
            const _account = await cosm_wasm_client.getAccount(account_adress)

            const account_info = {
                chain_id: _chain_id.toString(),
                balance: _balance && _balance.amount ? _balance.amount : null,
                acc_number: _account && _account.accountNumber ? _account.accountNumber : null,
                address: _account && _account.accountNumber ? _account.address : null,
                pubkey_type: _account && _account.pubkey ? _account.pubkey.type : null,
                pubkey_value: _account && _account.pubkey ? _account.pubkey.value : null
            }


            console.log("====> CosmWasm_Client | Account INFO")
            console.log(account_info)



            return account_info


        } catch(err){ 

            return({err: "Account info Error "+ err})
        }
    }
}