import React, { useState, useEffect } from "react";
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
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    }
  }
})

const Aprovados = (props) => {
  const [openForm, setOpenForm] = useState('')
  const [aprovados, setAprovados] = useState([])

  const classes = useStyles();

  const pegaAprovadosViagem = async () =>{
    const token = window.localStorage.getItem("token")
    const response = await axios.get(`${props.baseUrl}/trip/${props.viagemId}`, {
      headers:{
        auth: token
      }
    }).then(response => {
       setAprovados(response.data.trip.approved);
     }) 
     .catch(err => {
       console.log(err);
     });
  }

  useEffect(()=>{
    pegaAprovadosViagem()
  }, [props.viagemId])

  useEffect(() => {
    setOpenForm(props.isOpenAprovado)},
  [props.isOpenAprovado]) 

  const listaAprovados = aprovados.map((candidato) => {
    return <ExpansionPanel className="paineis-candidatos">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          className="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{candidato.name}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails ClassName="detalhes-candidatos">
          <Typography>
            <p className="texto-candidatos"><b>Anos: </b> {candidato.age}</p>
            <p className="texto-candidatos"><b>Profissão:</b> {candidato.profession}</p>
            <p className="texto-candidatos"><b>País: </b> {candidato.country}</p>
            <p className="texto-candidatos"><b>Mensagem: </b><i>"{candidato.applicationText}"</i></p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  })


  return (
    <MuiThemeProvider theme={MyTheme}>

      <Dialog fullWidth={true} open={openForm} onClose={props.fechaFormAprovado} id='form-iscricao'>
        <DialogTitle id="form-dialog-title">Candidatos Aprovados</DialogTitle>
        
        <DialogContent id="conteudo-dialogo">          
          {listaAprovados}
        </DialogContent>
        
        <DialogActions>
          <Button
            variant="contained"
            endIcon={<Cancelar />}
            id="dialog-inscricao"
            onClick={props.fechaFormAprovado}
            size="small"
          >
            Fechar
          </Button>
          
        </DialogActions>
      </Dialog>
      
    </MuiThemeProvider>
  );
};

export default Aprovados;