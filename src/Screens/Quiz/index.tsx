import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Div } from 'react-native-magnus'

import MainContainer from '@/Containers/MainContainer'
import { PCHeader, PCText } from '@/Components'
import Logger from '@/Utils/Logger'

interface Props {}

interface OSProps {
  label: string
  answer: string
  value: number
}

const { useEffect, useState } = React
export default function Quiz({}: Props) {
  const quiz = require('./questions/example.json')

  const [answers, setAnswers] = useState<any[]>([])
  const [questionNumber, setQuestionNumber] = useState<number>(1)
  const { numberOfQuestions, questions } = quiz

  useEffect(() => {
    Logger.debug('quiz =', quiz)
    if (questionNumber == numberOfQuestions) {
      return
    }
    return () => {}
  }, [questionNumber])

  const selectValueHandler = (value: number) => {
    Logger.debug('selectAnswerHandler: answer =', value)
    setAnswers([...answers, { questionNumber, value }])
    if (questionNumber == numberOfQuestions) {
      return
    }
    setQuestionNumber(questionNumber + 1)
  }

  const OptionSelector: React.FC<OSProps> = ({ label, answer, value }) => (
    <TouchableOpacity onPress={() => selectValueHandler(value)}>
      <PCText>{`${label} .) ${answer}`}</PCText>
    </TouchableOpacity>
  )

  return (
    <MainContainer>
      <PCHeader bottomLine>{`${String(questionNumber)} / ${String(
        numberOfQuestions,
      )}`}</PCHeader>
      <Div>
        <PCText>{questions[questionNumber - 1].question}</PCText>
      </Div>
      <Div>
        {questions[questionNumber - 1].options.map(
          (option: OSProps, idx: number) => {
            const { label, answer, value } = option
            return (
              <OptionSelector
                key={String(idx)}
                label={label}
                answer={answer}
                value={value}
              />
            )
          },
        )}
      </Div>
    </MainContainer>
  )
}

const styles = StyleSheet.create({})
