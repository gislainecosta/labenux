import React, { useState } from "react";
import styled from 'styled-components'
import "../Pages.css"
import CabecalhoUser from "../../components/CabecalhoUser"
import Rodape from "../../components/Rodapé"
import Fundo from "../../img/fundo4.jpg"
import Plutao from "../../img/plutão.jpg"
import Jupter from "../../img/jupiter.jpg"
import Ganimedes from "../../img/ganimedes.jpg"
import Marte from "../../img/marte.jpg"
import Netuno from "../../img/netuno.jpg"
import Saturno from "../../img/saturno.jpg"
import Tita from "../../img/tita.jpg"
import Mercurio from "../../img/Mercurio.jpg"
import Nebula from "../../img/nebula.jpg"
import Button from '@material-ui/core/Button';
import IconPlus from '@material-ui/icons/FastForward'
import Candidatarse from "../../components/CandidatarseViagem"


const TelaToda = styled.div `
  background-image: url("${Fundo}");
  background-color: #1b1001;
  max-width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
`

const HomeUser = (props) => {
  const [open, setOpen] = useState(false);
  const [idViagem, setIdViagem] = useState('')

  const fechaForm = () => {
    setOpen(false);
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

    return <article className='viagemUser' key={viagem.id}>
      <img id='astro-img-user' src={astroEscolhido} alt="Foto do astro"/>
      <h1 id='astro-nome'>{viagem.planet} </h1>
      <h2>{viagem.name}</h2>
      <p className='descricao'>"{viagem.description}"</p>
      <p className='detalhe-viagem'>Duração: {viagem.durationInDays} dias</p>
      <p className='detalhe-viagem'>Data: {viagem.date}</p>
      <Button
        variant="contained"
        endIcon={<IconPlus />}
        id="inscrever-se"
        onClick = {
          () => {
            setOpen(true);
            setIdViagem(viagem.id)
          }
        }
        size="small"
      >
        Eu quero!
      </Button>
    </article>
    
  })

  return (
    <TelaToda>
      <CabecalhoUser />
      
      <section id='display-viagens'>
          {ListaViagem}
      </section>
      
      <Candidatarse baseUrl={props.baseUrl} fechaForm={fechaForm} isOpen={open} viagemId={idViagem}/>
      
      <Rodape />

    </TelaToda>
  );
};

export default HomeUser;