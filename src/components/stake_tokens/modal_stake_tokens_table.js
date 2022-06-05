import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ColorButton, GreyButton } from "./buttons_set"
import { Signed_CosmWasm_Client } from '../../core/signed_cosmwasm_client'
import { ConstantineInfo } from '../../chain.info.constantine';



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

export const Stake_Tokens_Modal_Table = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [stake_amount_input_value, setTokensInputValue] = React.useState(0);

    const stake_tokens = async() => {

        if (props.data)
            handleOpen()
    }

    const close_modal = async()=>{

        setTokensInputValue(0)
        handleClose()
    }

    const modal_stake_button = (

        (stake_amount_input_value) ?

            <ColorButton 
                variant="contained" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                onClick={(data) => stake_tokens(data)}
            >
                Stake

            </ColorButton>
        :
            <Button 
                variant="outlined" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px', borderRadius: "15px"}} disabled
            >

                Stake

            </Button>
    )

    const main_stake_button = (

        (props.data) ?

            <ColorButton 
                variant="contained" 
                onClick={stake_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Stake
                </Typography>

            </ColorButton>
        :
            <GreyButton 
                variant="contained" 
                onClick={stake_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Stake
                </Typography>

            </GreyButton>
    )


    return (
        <div>
            {main_stake_button}
            <Modal
                open={open}
                onClose={close_modal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container rowSpacing={2} >
                        <Grid item xs={5}>
                            <TextField 
                                onChange={(event)=>{setTokensInputValue(event.target.value)}}
                                id="outlined-basic" 
                                label="Tokens Amount" 
                                variant="outlined" 
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {modal_stake_button}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}