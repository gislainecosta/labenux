import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Enviar from '@material-ui/icons/Send'
import Cancelar from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import FormPaises from "./FormPaises";
import useForm from "../hooks/Formulario"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={12} variant="filled" {...props} />;
}

const MyTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#D76D2D'
    }
  }
})

const Input = styled(TextField)`
  margin:0;
  padding: 0;
`

const Candidatarse = (props) => {
  const { form, onChange, resetForm } = useForm({
    name: "",
    age: "",
    profissao: "",
    mensagem: "",
  });
  
  const [pais, setPais] = useState('Brasil')
  const [openForm, setOpenForm] = useState('')
  const [idViagem, setIdViagem] = useState("")
  const [openAlertSucesso, setOpenAlertSucesso] = useState(false);
  const [openAlertErro, setOpenAlertErro] = useState(false);

  useEffect(() => {
    setIdViagem(props.viagemId)},
  [props.viagemId])

  useEffect(() => {
    setOpenForm(props.isOpen)},
  [props.isOpen])

  const mudaPais = (event) =>{
    setPais(event.target.value)
  }
  
  const mudaValorInput = event => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const formSucesso = () => {
    setOpenAlertSucesso(true);
  };

  const submitForm = event => {
    event.preventDefault()
  }

  const formErro = (erro) => {
    setOpenAlertErro(true);
    console.log(erro);
  };

  const fechaAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertSucesso(false);
    setOpenAlertErro(false);
  }; 

  const enviaCandidato = () => {
    const body ={
      name: form.name,
      age: form.age,
      applicationText: form.mensagem,
      profession: form.profissao,
      country: pais,
    }
    axios
      .post(`${props.baseUrl}/trips/${idViagem}/apply`, body)
      .then(response => {
        console.log(response.data);
        resetForm();
        formSucesso()
      })
      .catch(err => {
        formErro(err);
      });
  }

  return (
    <MuiThemeProvider theme={MyTheme}>
      <Dialog fullWidth={true} open={openForm} onClose={props.fechaForm} id='form-iscricao'>
        <DialogTitle id="form-dialog-title">Formulario de Inscrição</DialogTitle>
        <DialogContent id="conteudo-dialogo">
          <DialogContentText>
            Preencha todos os dados 
          </DialogContentText>
          
          <form onSubmit={submitForm}>
            <section id="inputs-pequenos">
              <FormPaises pais={pais} selecionaPais={mudaPais}/>
              <Input
                className="input-pequeno"
                required
                autoFocus
                id='idade'
                label="Idade"
                type="number"
                min="18"
                value={form.age}
                name="age"
                onChange={mudaValorInput}
              />
            </section>
           
            <Input
              required
              autoFocus
              margin="dense"
              id='input-medio'
              label="Nome"
              type="text"
              value={form.name}
              inputProps={{ 
                pattern: "[a-zA-Z]{3,}",
                title: "O nome deve conter mais de 3 letras" }}
              name="name"
              onChange={mudaValorInput}
            />
            <Input
              required
              autoFocus
              fullWidth
              margin="dense"
              label="Profissão"
              id='profissao'
              type="text"
              inputProps={{ 
                pattern: "[a-zA-Z0-9]{10,}",
                title: "A profissão deve conter mais de 10 caracteres" }}
              name="profissao"
              value={form.profissao}
              onChange={mudaValorInput}
            />
            <Input
              required
              autoFocus
              margin="dense"
              label="Mensagem"
              fullWidth
              type="text"
              inputProps={{ 
                pattern: "[a-zA-Z0-9]{30,}",
                title: "A mensagem deve ter mais de 30 caracteres" }}
              multiline
              value={form.mensagem}
              name="mensagem"
              onChange={mudaValorInput}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            endIcon={<Cancelar />}
            id="dialog-inscricao"
            onClick={props.fechaForm}
            size="small"
          >
            Cancelar
          </Button>
          
          <Button
            variant="contained"
            endIcon={<Enviar />}
            id="dialog-inscricao"
            onClick={() =>{props.fechaForm(); enviaCandidato()} }
            size="small"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={openAlertSucesso} autoHideDuration={6000} onClose={fechaAlert}>
        <Alert onClose={fechaAlert} severity="success">
          Formulário enviado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={openAlertErro} autoHideDuration={6000} onClose={fechaAlert}>
        <Alert onClose={fechaAlert} severity="error">
          Por favor, tente novamente
        </Alert>
      </Snackbar>
      
    </MuiThemeProvider>
  );
};

export default Candidatarse;