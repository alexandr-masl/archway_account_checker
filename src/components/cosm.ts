
import {
    OfflineSigner,
    AccountData,
    AminoSignResponse,
    StdSignDoc,
  } from "@cosmjs/launchpad";



export class Cosm {

    acc_adress: string
    acc_key: Uint8Array

    constructor(acc_adress: string, acc_key: Uint8Array){

        this.acc_adress = acc_adress
        this.acc_key = acc_key
    }

    check(){

        console.log("Cosm CHECK ......................")
    }

    async getAccounts(): Promise<AccountData[]> {
    
        return [
          {
            address: this.acc_adress,
            // Currently, only secp256k1 is supported.
            algo: "secp256k1",
            pubkey: this.acc_key,
          },
        ];
    }

    
}