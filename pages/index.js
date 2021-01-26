import React from 'react';
import styled from 'styled-components';
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'

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
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>teste 1</h1>
          </Widget.Header>
          <Widget.Content >
            <p>xuribibi</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quiz da galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>teste teste teste</p>
          </Widget.Content>
        </Widget>
        < Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tecwagner" />
    </QuizBackground>
  )
}
