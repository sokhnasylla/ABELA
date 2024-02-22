import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function NouvelleAnalyse() {
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
      });
    
      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    
      const { level3, level2, level1 } = state;
  return (
    <div id='home'>
        <Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{display:"flex"}}>
       <CancelIcon sx={{ color: "#C9302C",cursor:"pointer",marginLeft:"91%",position:'fixed',top:'2px'}} onClick={handleClose}/>
          <Typography id="modal-modal-title" variant="h6" component="h6">
          <InfoIcon sx={{ color: "#148C8A" }}/>Choisir les scénarios à analyser</Typography>
          <hr />
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={level3} onChange={handleChange} name="level3" />
            }
            label="Criticité Level 3"
          />
          <FormControlLabel
            control={
              <Checkbox checked={level2} onChange={handleChange} name="level2" />
            }
            label="Criticité Level 2"
          />
          <FormControlLabel
            control={
              <Checkbox checked={level1} onChange={handleChange} name="level1" />
            }
            label="Criticité Level 1"
          />
        </FormGroup>
      </FormControl>
          <br />
          <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",marginLeft:"77%"}}>valider</Button>
        </Box>
      </Modal>
        </Container>

    </div>
  )
}

export default NouvelleAnalyse