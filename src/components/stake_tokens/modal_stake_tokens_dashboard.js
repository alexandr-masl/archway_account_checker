import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { Staked_validators } from './test_validators_data';


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

export const Stake_Tokens_Modal_Dashboard = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [validator_name_input_value, setValidatorInputValue] = React.useState('');
    const [delegated_amount_input_value, setTokensInputValue] = React.useState(0);

    const set_validator_to_delegate = (data) => {

        console.log("---> set_validator_to_delegate, DATA")
        console.log(data)
    }

    console.log("--- Delegating DATA, name", validator_name_input_value, "amount", delegated_amount_input_value)


    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
          backgroundColor: orange[700],
        },
    }));

    const delegate_button = (

        (validator_name_input_value.length && delegated_amount_input_value) ?
           ( <div>
                <ColorButton 
                    variant="contained" 
                    style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                >
                    Stake

                </ColorButton>
            </div>)
        :
            (<div>
                <Button 
                    variant="outlined" 
                    style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}} disabled>

                        Stake
                </Button>
            </div>)
    )


    return (
        <div>
            <Button onClick={handleOpen}>Stake</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container rowSpacing={2} >
                        <Grid item xs={9}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Staked_validators}
                                sx={{ width: 300 }}
                                onChange={(event, newInputValue) => {
                                    setValidatorInputValue((newInputValue ? newInputValue.label : ""));
                                }}
                                renderInput={(params) => <TextField {...params} label="Validators" />}
                            />
                        </Grid>
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
                            {delegate_button}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}