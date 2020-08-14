import React from "react";
import "./Components.css"
import Logo from "../img/Logo2.png"
import styled from 'styled-components'
import IconHome from "@material-ui/icons/Home"
import Add from "@material-ui/icons/Queue"
import Exit from "@material-ui/icons/ExitToApp"
import { useHistory } from "react-router-dom";

const IconeAdd = styled(Add)`
  color: #ff8035;
  &&{
    :hover{
      color: #5a2303
    }
  }
`
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
const Cabecalho = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/admin/home");
  };

  const goToAddTrip = () => {
    history.push("/admin/criar-nova-rota");
  };

  const goToWellcome = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div id="conteudo-cabecalho" >
      <img id='logo-site' src={Logo} alt="Logo" />
      
      <h1 id='titulo-cabecalho'>"Encontre as melhores viagens espaciais!"</h1>
      
      <section id='icones-admin'>
        <article className="navegacao" onClick={goToHome}>
          <IconeHome fontSize={'large'}/>
          <p className="texto-icone-admin">Home</p>
        </article>

        <article className="navegacao" onClick={goToAddTrip}>
          <IconeAdd fontSize={'large'}/>
          <p className="texto-icone-admin">Adicionar<br/>Viagem</p>
        </article>

        <article className="navegacao" onClick={goToWellcome}>
          <IconeSair fontSize={'large'}/>
          <p className="texto-icone-admin">Sair</p>
        </article>
      </section>
      
    </div>
  );
};

export default Cabecalho;