import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import "../Pages.css"
import FuncaoLogin from "../../hooks/Login"
import CabecalhoAdmin from "../../components/CabecalhoAdmin"
import Rodape from "../../components/Rodapé"
import Fundo from "../../img/fundo4.jpg"
import Plutao from "../../img/plutão.jpg"
import Jupter from "../../img/jupiter.jpg"
import Ganimedes from "../../img/ganimedes.jpg"
import Marte from "../../img/marte.jpg"
import Netuno from "../../img/netuno.jpg"
import Saturno from "../../img/saturno.jpg"
import Tita from "../../img/tita.jpg"
import Nebula from "../../img/nebula.jpg"
import Mercurio from "../../img/Mercurio.jpg"
import Button from '@material-ui/core/Button';
import IconCheck from "@material-ui/icons/Check"
import IconPerfil from "@material-ui/icons/AssignmentIndRounded"
import Candidatos from "../../components/Candidatos"
import Aprovados from "../../components/Aprovados"

const TelaToda = styled.div `
  background-image: url("${Fundo}");
  background-color: #1b1001;
  max-width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
`

const HomeAdmin = (props) => {
  FuncaoLogin()
  
  const [openCandidato, setOpenCandidato] = useState(false);
  const [openAprovado, setOpenAprovado] = useState(false);
  const [idViagemSelecionada, setIdViagemSelecionada] = useState('')

  const fechaFormCandidato = () => {
    setOpenCandidato(false);
  };

  const fechaFormAprovado = () => {
    setOpenAprovado(false);
  };

  const ListaViagem = props.viagens.map((viagem) => {
    let astroEscolhido  
    switch (viagem.planet) {
        case "Marte":
          astroEscolhido = Marte
          break;
        case "Jupiter":
          astroEscolhido = Jupter
          break;
        case "Netuno":
          astroEscolhido = Netuno
          break;
        case "Saturno":
          astroEscolhido = Saturno
          break;
        case "Titã":
          astroEscolhido = Tita
          break;
        case "Plutão":
          astroEscolhido = Plutao
          break;
        case "Ganimedes":
          astroEscolhido = Ganimedes
          break;
        case "Mercúrio":
          astroEscolhido = Mercurio
          break;
        default:
          astroEscolhido = Nebula
          break;
      }
    return <article className='viagemAdmin' key={viagem.id}>
      <img id='astro-img-admin' src={astroEscolhido} alt="Foto do astro"/>
      <h1 id='astro-nome'>{viagem.planet} </h1>
      <h2>{viagem.name}</h2>
      <p className='detalhe-viagem'>Data: {viagem.date}</p>
      <Button
        variant="contained"
        endIcon={<IconPerfil />}
        id="inscrever-se"
        onClick = {() => {setOpenCandidato(true); setIdViagemSelecionada(viagem.id)}
        }
        size="small"
      >
        Inscritos
      </Button>
      <Button
        variant="contained"
        endIcon={<IconCheck />}
        id="inscrever-se"
        onClick = {() => {setOpenAprovado(true); setIdViagemSelecionada(viagem.id)}
        }
        size="small"
      >
        Aprovados
      </Button>

    </article>
    
  })

  return (
    <TelaToda>
      <CabecalhoAdmin />
      
      <section id='display-viagens'>
          {ListaViagem}
      </section>

      <Candidatos 
        baseUrl={props.baseUrl} 
        fechaFormCandidato={fechaFormCandidato}
        isOpenCandidato={openCandidato}
        viagemId={idViagemSelecionada}
      />

      <Aprovados
        baseUrl={props.baseUrl} 
        fechaFormAprovado={fechaFormAprovado} 
        isOpenAprovado={openAprovado}
        viagemId={idViagemSelecionada}
      />
      
      <Rodape />

    </TelaToda>
  );
};

export default HomeAdmin;