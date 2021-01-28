import React from 'react'
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer/QuizContainer'
import Button from '../src/components/Button'


function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                Desafio do Loading...
            </Widget.Content>
        </Widget>
    )
}

function WidgetQuestion({ question, totalQuestions, questionIndex, onSubmit }) {
    console.log(db.questions, '1')

    const questionId = `${questionIndex}`// A cada pergunta tem um id
    
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {/* Interpolação do java script */}
                    {` Pergunta ${questionId + 1} de ${totalQuestions} `}
                </h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}>
                    {question.alternatives.map((alternative, aternativeIndex) => {
                        const alternativeId = `alternative__${aternativeIndex}` //cria um id para cada alternativa   
                        console.log(alternativeId, 'index')
                        return (
                            <Widget.Topic
                                as="label"
                                htmlFor={alternativeId}
                            >
                                <input
                                    // style={{display: 'none'}}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                />
                                { alternative}
                            </Widget.Topic>
                        )
                    })}
                </form>
                {/* 

                <pre>
                    {console.log(question, 'question')}
                    {JSON.stringify(question.alternatives)}
                </pre> */}

                <Button>Confirmar</Button>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    LOADING: 'LOADING',
    QUIZ: 'QUIZ',
    RESULT: 'RESULT'
}

export default function QuizPage() {


    const [screenState, setScreenState] = React.useState(screenStates.LOADING) //estado inicial será carregar tela
    const totalQuestions = db.questions.length
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const questionIndex = currentQuestion //como a pergunta muda a cada seleção. Deve retorna a proxima pergunta
    const question = db.questions[questionIndex] // quantidade de questão

    console.log(question, '2')
    React.useEffect(() => {
        //fetch()...
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 100)
        // nassce === didMount
    }, [])

    /*
    [REACT chama de: Efeito || Effects]
    Se estiver trabalhando com componente de classe
    nassce === didMount
    atualizado === willUpdate
    morre === willUnmount
    */

    function handlerSubmitQuiz() {
        //verificar se se ainda tem perguntas a ser respondida
        const nextQuestion = questionIndex + 1
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(questionIndex + 1)
        } else {
            setScreenState(screenStates.RESULT)
        }
    }
    
    return (
        
        <QuizBackground backgroundImage={db.bg}>
            {console.log(question, '3')}
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.QUIZ && (
                    <WidgetQuestion                     
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handlerSubmitQuiz}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Você acertou 'X' questões, parabéns!</div>}
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/tecwagner" />
        </QuizBackground>
    );
}