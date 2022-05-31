import React from 'react'
import { Wallet_Table } from './table/transactions_history_table';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import{ Final_Item, Tokens_Item} from "./items_styles"
import { ConstantineInfo } from '../chain.info.constantine';
import { Signed_CosmWasm_Client } from '../core/signed_cosmwasm_client'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};


export const Wallet = (props) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [wallet_name_input_value, setWalletNameInputValue] = React.useState('');
  const [delegated_amount_input_value, setTokensInputValue] = React.useState(0);

  const delegate_tokens = async() => {

    console.log("---> delegate_tokens, DATA")

    let offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId)

    const sent_tokens = await new Signed_CosmWasm_Client().send_tokens("archway1ms4pgv3umf52rjy6zu5rqgyfsaemr6e9yg5y4w", "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m", 123, offlineSigner)

    console.log("======= SENT TOKENS ================")
    console.log(sent_tokens)
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    borderRadius: "15px",
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  const send_tokens = (data) => {


  }

  const delegate_button = (

    (wallet_name_input_value.length && delegated_amount_input_value) ?
      ( 
        <div>
          <ColorButton 
              variant="contained" 
              style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
              onClick={(data) => send_tokens(data)}
          >
              Stake

          </ColorButton>
        </div>
      )

    :
      (
        <div>
            <Button 
                variant="outlined" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}} disabled>

                    Stake
            </Button>
        </div>
      )
  )

  const modal_form = (

        <div>
          <ColorButton 
            variant="contained" 
            style={{maxWidth: '170px', maxHeight: '120px', minWidth: '200px', minHeight: '120px'}}
            // onClick={(data) => send_tokens(data)}
            onClick={handleOpen}     
          >
            <Typography variant="h4" component="div" color="#f5f5f5">
              Send Tokens
            </Typography>

          </ColorButton>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container rowSpacing={2} >
                  <Grid item xs={20}>
                    <TextField 
                        onChange={(event)=>{setWalletNameInputValue(event.target.value)}}
                        id="outlined-basic" 
                        label="Wallet Adress" 
                        variant="outlined" 
                        type="text"
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <TextField 
                          onChange={(event)=>{setTokensInputValue(event.target.value)}}
                          id="outlined-basic" 
                          label="Tokens Amount" 
                          variant="outlined" 
                          type="number"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      {delegate_button}
                  </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
    )

  return (
    <div>
      <div id='contact'>
        <div className='container'>
            <div className='row'>
              <div className='section-title'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1}} >
                 
                  <Grid item xs={5}>
                    <Tokens_Item>
                      <Final_Item>
                        <acc_name> Account </acc_name> {"props.data.userAddress"}                                  
                      </Final_Item>
                    </Tokens_Item>
                    <p></p>
                    <Tokens_Item>
                        <Final_Item>
                          <acc_name> Balance </acc_name> {"props.data.balance"} UCONST
                        </Final_Item>
                    </Tokens_Item>
                  </Grid>
                  <Grid item xs={3}>

                    {modal_form}

                    {/* <ColorButton 
                      variant="contained" 
                      style={{maxWidth: '170px', maxHeight: '120px', minWidth: '200px', minHeight: '120px'}}
                      onClick={(data) => send_tokens(data)}
                    >
                      <Typography variant="h4" component="div" color="#f5f5f5">
                        Send Tokens
                      </Typography>

                    </ColorButton> */}
                  </Grid>
                  <Grid item xs={4}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h2">
                          Wallet
                      </Typography>
                      <Typography variant="h4" color="text.secondary" component="div">
                          Send your tokens and check transactions history
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </div>
              <p> </p>
              <Wallet_Table/>
            </div>
          </div>
        </div>
    </div>
  )
}