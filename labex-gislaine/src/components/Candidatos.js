import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cancelar from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from "axios";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#D76D2D'
    },
    secondary: {
      main: '#623113'
    }
  }
})

const Input = styled(TextField)`
  margin:0;
  padding: 0;
`

const Candidatos = (props) => {
  const [openForm, setOpenForm] = useState('')
  const [cadidatosViagem, setCadidatosViagem] = useState([])


  const classes = useStyles();

  const pegaCadidatosViagem = async () =>{
    const token = window.localStorage.getItem("token")
    console.log("token", token)
    console.log("URL", props.baseUrl)
    console.log("id da viagem", props.viagemId)
    const response = await axios.get(`${props.baseUrl}/trip/${props.viagemId}`, {
      headers:{
        auth: token
      }
    }).then(response => {
       setCadidatosViagem(response.data.trip.candidates);
     }) 
     .catch(err => {
       console.log(err);
     });
  }
  const enviaAprovacao = async (isAprovado, id) =>{
    const token = window.localStorage.getItem("token")
    const body = {
      approve: isAprovado
    }
    console.log("token", token)
    
    const response = await axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/gislaine-julian/trips/${props.viagemId}/candidates/${id}/decide`, body, {
      headers:{
        auth: token
      }
    }).then(response => {
      pegaCadidatosViagem()
      console.log(response);
     }) 
     .catch(err => {
       console.log(err);
     });
  }

  useEffect(()=>{
    pegaCadidatosViagem()
  }, [props.viagemId, ])

  useEffect(() => {
    setOpenForm(props.isOpenCandidato)},
  [props.isOpenCandidato])
  
  
  const listaCandidatos = cadidatosViagem.map((candidato) =>{
    return <ExpansionPanel className="paineis-candidatos">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          className="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{candidato.name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{candidato.country}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails ClassName="detalhes-candidatos">
          <Typography>
            <p className="texto-candidatos"><b>Anos: </b>{candidato.age}</p>
            <p className="texto-candidatos"><b>Profissão: </b> {candidato.profession}</p>
            <p className="texto-candidatos"><b>Mensagem: </b><i>"{candidato.applicationText}"</i></p>
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button 
            size="small" 
            color="secondary" 
            onClick = {() => {enviaAprovacao(false, candidato.id); pegaCadidatosViagem()}}
          >
            Dispensar
          </Button>

          <Button 
            size="small" 
            color="primary" 
            onClick = {() => {enviaAprovacao(true, candidato.id)}}
          >
            Aceitar
            </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
  })


  return (
    <MuiThemeProvider theme={MyTheme}>
      <Dialog fullWidth={true} open={openForm} onClose={props.fechaFormCandidato} id='form-iscricao'>
        <DialogTitle id="form-dialog-title">Candidatos Pendentes</DialogTitle>
        
        <DialogContent id="conteudo-dialogo">          
          {listaCandidatos}
        </DialogContent>
        
        <DialogActions>
          <Button
            variant="contained"
            endIcon={<Cancelar />}
            id="dialog-inscricao"
            onClick={props.fechaFormCandidato}
            size="small"
          >
            Fechar
          </Button>
          
        </DialogActions>
      </Dialog>
      
    </MuiThemeProvider>
  );
};

export default Candidatos;