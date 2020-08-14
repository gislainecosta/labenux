import React, { useState } from "react";
import './index.css';
import axios from "axios";
import clsx from 'clsx';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import ImagemFundo from "../../img/fundo.jpg"
import Logo from "../../img/Logo2.png"
import Button from '@material-ui/core/Button';
import IconSend from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={12} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }),
);

const MyTheme = createMuiTheme({
    palette: {
        primary: {
            light: "rgba(255, 95, 0, 1)",
            main: "rgba(225, 62, 0, 1)",
            dark: "rgba(34, 13, 0, 1)",
            contrastText: "rgba(255, 229, 210, 1)"
        },
    }
})

const TelaToda = styled.div `
  background-image: url("${ImagemFundo}");
  background-color: #000000;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
`
const Inputs = styled(FormControl)`
  background-color: rgba(255, 234, 221, 0.7);
  border-radius: 5% 5% 0 0;
`

const Wellcome = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [valorSenha, setValorSenha] = useState('')
  const [mostraSenha, setMostraSenha] = useState(false)
  const [valorUsuario, setValorUsuario] = useState('')
  const [openAlertSucesso, setOpenAlertSucesso] = useState(false);
  const [openAlertErro, setOpenAlertErro] = useState(false);
  
  const formSucesso = () => {
    setOpenAlertSucesso(true);
  };

  const formErro = (erro) => {
    setOpenAlertErro(true);
    console.log(erro);
  };

  const fechaAlert = (event ? : React.SyntheticEvent, reason ? : string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertSucesso(false);
    setOpenAlertErro(false);
  };
  
  const fazerLogin = async () => {
    const body = {  
      email: valorUsuario,
      password: valorSenha,
    };
    try {
      const response = await axios.post(`${props.baseUrl}/login`, body);
      localStorage.setItem("token", response.data.token);
      formSucesso()
      history.push("/admin/home");
    } catch (e) {
      formErro();
    }
  };
  
  const handleClickShowPassword = () => {
      setMostraSenha(!mostraSenha);
  };

  const handleMouseDownPassword = (event: React.MouseEvent < HTMLButtonElement > ) => {
      event.preventDefault();
  };
  
  const goToUserPage = () => {
    history.push("/usuario/home");
  };
  
  return(
      <TelaToda>
          <MuiThemeProvider theme={MyTheme}>
            <section id="cabecalho">
              <img id="logo" src={Logo} alt={'Logo'}/>
              <h1>"Encontre as melhores viagens espaciais!"</h1>
            </section>
            <section id="corpo-site">      
              <section className="div-login">
                <h3>Sou Administrador</h3>
                
                <Inputs className={clsx(classes.margin, classes.textField)} variant="filled">
                    <InputLabel color="primary.light" htmlFor="input-usuario">Usuário</InputLabel>
                    <FilledInput
                        color="primary"
                        id="input-usuario"
                        type={'text'}
                        value={valorUsuario}
                        onChange={e => setValorUsuario(e.target.value)}
                        endAdornment={
                          <InputAdornment position="start">
                            <AccountCircle color="primary.dark"/>
                          </InputAdornment>
                        }
                    />
                </Inputs>
                
                <Inputs className={clsx(classes.margin, classes.textField)} variant="filled">
                    <InputLabel htmlFor="input-senha">Senha</InputLabel>
                    <FilledInput
                        color="primary"
                        id="input-senha"
                        type={mostraSenha ? 'text' : 'password'}
                        value={valorSenha}
                        onChange={e => setValorSenha(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              color = "error.dark"
                              aria-label="Visibilidade Senha"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {mostraSenha ? <Visibility color = "primary.dark"/> : <VisibilityOff color = "primary.dark" />}
                            </IconButton>
                        </InputAdornment>
                      }
                  />
                </Inputs>
              
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<IconSend />}
                  id="botao-admin"
                  onClick={fazerLogin}
                  size="small"
                >
                  Entrar
                </Button>
              </section>
                
              <section className="div-login">
                <h3>Quero me candidatar</h3>
                <p>Escontre a sua viagem dos sonhos</p>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<IconSend />}
                  id="botao-user"
                  onClick={goToUserPage}
                  size="large"
                >
                  Entrar
                </Button>
              </section>
            </section>

            <Snackbar open={openAlertSucesso} autoHideDuration={6000} onClose={fechaAlert}>
              <Alert onClose={fechaAlert} severity="success">
                Formulário enviado com sucesso!
              </Alert>
            </Snackbar>

            <Snackbar open={openAlertErro} autoHideDuration={6000} onClose={fechaAlert}>
              <Alert onClose={fechaAlert} severity="error">
                Por favor, tente novamente.
              </Alert>
            </Snackbar>
          </MuiThemeProvider>
      </TelaToda>
  );
};

export default Wellcome;