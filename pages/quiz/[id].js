import React from 'react'
import QuizScreen from '../../src/sreens/Quiz'
import { ThemeProvider } from 'styled-components';

const QuizDaGalera = ({ dbExterno }) => {

    return (
        <ThemeProvider theme={dbExterno}>
            <QuizScreen
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            />
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {

    const [projectName, githubUser] = context.query.id.split('__');

    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((respostaDoServidor) => {
            if (respostaDoServidor.ok) {
                return respostaDoServidor.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaDoServidor) => {
            return respostaConvertidaDoServidor
        })
        .catch((err) => {
            return(err)
        });
    return {
        props: {
            dbExterno,
        }, // will be passed to the page component as props
    }
}

export default QuizDaGalera