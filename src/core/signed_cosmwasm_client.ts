
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, coin, GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';
const RPC = ConstantineInfo.rpc;



export class Signed_CosmWasm_Client{
    

    public async send_tokens(sender_adress: string, receiver_adress: string, tokens_amount: string, off_line_signer: any): Promise<any> {

        try{   

            // let offlineSigner = await off_line_signer(ConstantineInfo.chainId)
            let gasPrice = GasPrice.fromString('0.002uconst');
            let cwClient = await SigningCosmWasmClient.connectWithSigner(RPC, off_line_signer, {gasPrice: gasPrice});
            
            const coin = [{amount: tokens_amount, denom: "uconst"}]

            console.log("==========>>> SENDING TOKENS FROM ", sender_adress, "TO", receiver_adress)
        
            const sent_tokens = await cwClient.sendTokens(sender_adress, receiver_adress, coin, "auto")
        
            console.log(sent_tokens)
            
        
        
            console.log('HASH')
            console.log(sent_tokens.transactionHash)

            return {
                data: sent_tokens.rawLog,
                transaction_hash: sent_tokens.transactionHash,
                transaction_height: sent_tokens.height,
                transaction_gas_used: sent_tokens.gasUsed,
                transaction_gas_wanted: sent_tokens.gasWanted
            }
        }
        catch(err){
    
          return {
              err: err
          }
        }
    }

    public async delegate_tokens(sender_adress: string, staking_validators_adress: string, tokens_amount: string, off_line_signer: any): Promise<any> {

        try{   

            // let offlineSigner = await off_line_signer(ConstantineInfo.chainId)
            let gasPrice = GasPrice.fromString('0.002uconst');
            let cwClient = await SigningCosmWasmClient.connectWithSigner(RPC, off_line_signer, {gasPrice: gasPrice});
            
            const coin = {amount: tokens_amount, denom: "uconst"}


            const delegate_tokens = await cwClient.delegateTokens(sender_adress, staking_validators_adress, coin, "auto")

            console.log("====> Delegate Tokens")
            console.log(delegate_tokens)



            // console.log("==========>>> SENDING TOKENS FROM ", sender_adress, "TO", receiver_adress)
        
            // const sent_tokens = await cwClient.sendTokens(sender_adress, receiver_adress, coin, "auto", "test transfer")
        
            // console.log(sent_tokens)
            
        
        
            // console.log('HASH')
            // console.log(sent_tokens.transactionHash)

            // return {
            //     data: sent_tokens.rawLog,
            //     transaction_hash: sent_tokens.transactionHash,
            //     transaction_height: sent_tokens.height,
            //     transaction_gas_used: sent_tokens.gasUsed,
            //     transaction_gas_wanted: sent_tokens.gasWanted
            // }
        }
        catch(err){
    
          return {
              err: err
          }
        }
    }
}