import React, { useState, useEffect } from 'react'
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizContainer from '../../src/components/QuizContainer/QuizContainer'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativeForm'
import { CircularProgress } from '@material-ui/core'


function ResultWidget({ results }) {

    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado:
            </Widget.Header>

            <Widget.Content>
                <p>Você acertou:
                {' '}
                    {console.log(results, 'result1')}
                    {/* 
                    {results.reducer((somatoriaAtual, resultadoAtual) => {
                        const isAcerto = resultadoAtual === true;
                        isAcerto ? somatoriaAtual + 1 : somatoriaAtual
                    }, 0)}
                     */}
                    {results.filter((x) => x).length},
                {' '}
                perguntas!
                </p>
                <ul>

                    {results.map((result, index) => (
                        <li key={`result ${result}`}>
                            #{index + 1} Resultado:
                            {' '}
                            {result === true ? ' Acertou ' : ' Errou '}
                        </li>
                    ))}
                </ul>

            </Widget.Content>
        </Widget>
    )
}

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                < CircularProgress />
            </Widget.Content>
        </Widget>
    )
}

function WidgetQuestion({ question, totalQuestions, questionIndex, onSubmit, addResult }) {

    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = questionIndex// A cada pergunta tem um id
    const isCorrect = selectedAlternative === question.answer // declarada a variavel que guarda o resultado
    const hasAlternativeSelected = selectedAlternative !== undefined

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
                    height: '300px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>

                <AlternativesForm

                    onSubmit={(e) => {

                        e.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect)
                            onSubmit()
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 3 * 300)
                    }}>

                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = alternativeIndex //cria um id para cada alternativa
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
                        const isSelected = selectedAlternative === alternativeIndex

                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input
                                    style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    type="radio"
                                />
                                { alternative}
                            </Widget.Topic>
                        )
                    })}

                    <Button type="submit" disabled={!hasAlternativeSelected}> Confirmar </Button>

                    {isQuestionSubmited && (isCorrect ? <p> Você acertou! : ) </p> : <p>Você errou! :( </p>)}
                    {/* { isCorrect && <p>Você acertou! : ) </p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou! :( </p>} */}
                </AlternativesForm>

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

    const [screenState, setScreenState] = useState(screenStates.LOADING) //estado inicial será carregar tela
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [results, setResults] = useState([])
    const totalQuestions = db.questions.length
    const questionIndex = currentQuestion //como a pergunta muda a cada seleção. Deve retorna a proxima pergunta
    const question = db.questions[questionIndex] // quantidade de questão

    function addResult(result) {
        // results.push(result)
        setResults([
            ...results,
            result,
        ]);
    }

    useEffect(() => {
        //fetch()...
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000)
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
            setCurrentQuestion(nextQuestion)
        } else {
            setScreenState(screenStates.RESULT)
        }
    }

    return (

        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                {/* <QuizLogo /> */}
                {screenState === screenStates.QUIZ && (
                    <WidgetQuestion
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handlerSubmitQuiz}
                        addResult={addResult}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/tecwagner" />
        </QuizBackground>
    );
}