import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link'
import { motion } from 'framer-motion'

//Router
import { useRouter } from 'next/router'

//função que estiliza o componente
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.success}; 
// `

// function Title(props) { // propcidades do react
//   return (
//     <h1> {props.children} </h1>
//   )
// }

// const BackgroundImage = styled.div`
//     background-image: url(${db.bg});
//     flex: 1;
//     background-size: cover;
//     background-position: center;
//     width: 100%;
//     height: 100%;
//     position: absolute;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

//essa função que representa a pagina
export default function Home() {
  //Todos os Hooks 
  const router = useRouter()
  const [name, setName] = React.useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head >
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        {/* <QuizLogo /> */}
        <Widget 
          //Motion
          as={motion.section}
          transition={{delay: 0, duration: 0.5}}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz da galera</h1>
          </Widget.Header>
          <Widget.Content >
            <p>Seja Bem Vindo(a)! {`${name}`}</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              //router manda para proxima pagina              
              router.push(`/quiz?name=${name}`)
            }}>
              <Input
                name="NomeUsuario"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                placeholder="Diz ai seu nome"
                value={name}
              ></Input>
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
         //Motion
         as={motion.section}
         transition={{delay: 0.5, duration: 0.5}}
         variants={{
           show: {opacity: 1},
           hidden: {opacity: 0},
         }}
         initial="hidden"
         animate="show"
        >
          <Widget.Header>
            <h1>API de perguntas</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                console.log('link', linkExterno)
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}__${githubUser}`}
                    >
                      {`${projectName}/${githubUser}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        {/* < Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tecwagner" />
    </QuizBackground>
  )
}
