import React from "react";
import "./Components.css"
import Logo from "../img/Logo2.png"
import styled from 'styled-components'
import IconHome from "@material-ui/icons/Home"
import Exit from "@material-ui/icons/ExitToApp"
import { useHistory } from "react-router-dom";

const IconeHome = styled(IconHome)`
  color: #ff8035;
  &&{
    :hover{
      color: #5a2303
    }
  }
`
const IconeSair = styled(Exit)`
  color: #ff8035;
  &&{
    :hover{
      color: #5a2303
    }
  }
`

const CabecalhoUser = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/usuario/home");
  };

  const goToWellcome = () => {
    history.push("/");
  };

  return (
    <div id="conteudo-cabecalho" >
      <img id='logo-site' src={Logo} alt="Logo" />
      
      <h1 id='titulo-cabecalho'>"Encontre as melhores viagens espaciais!"</h1>

        <article className="navegacao" onClick={goToWellcome}>
          <IconeSair fontSize={'large'} />
          <p className="texto-icone-user">Sair</p>
        </article>

      
    </div>
  );
};

export default CabecalhoUser;