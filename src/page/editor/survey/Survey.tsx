import React from 'react'
import'./Survey.scss'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames'
import QuestionGroupType from '../model/survey/QuestionGroup'
import QuestionType from '../model/survey/Question'
import SubQuestionType from '../model/survey/SubQuestion'
import QuestionGroup from './QuestionGroup'
import Question from './Question'
import SubQuestion from './SubQuestion'
import TextEditableInline from './../../../component/TextEditableInline/TextEditableInline'
import { useApi as surveyUseApi } from '../model/SurveyUseApi'

export function Survey() {

    const { surveyQuery, survey, updateTitle } = surveyUseApi()
    const questionGroups: QuestionGroupType[] = survey.questionGroups ?? []

    const titleText = survey && survey.title && survey.title.en ? survey.title.en : ''

    const questionGroupsView = questionGroups ? questionGroups.map(
        (questionGroup, x) => renderQuestionGroup(questionGroup, x)
    ) : []

    return (
        <Col
            className={classNames(
                'survey'
            )}>
            {surveyQuery.isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : null}
            <h2 className={classNames('mt-4', 'mb-4')}>
                <TextEditableInline
                    size="lg"
                    defaultValue={titleText}
                    onSave={value => updateTitle(value)}
                />
            </h2>
            {questionGroupsView}
        </Col>
    )
}

function renderQuestionGroup(questionGroup: QuestionGroupType, key: number) {

    const { questions } = questionGroup

    const questionsView = questions ? questions.map(
        (question, x) => {
                return renderQuestion(question, x)
        }
    ) : []

    return (
        <QuestionGroup questionGroup={questionGroup} key={key}>
            {questionsView}
        </QuestionGroup>
    )
}

function renderQuestion(question: QuestionType, key: number) {

    const { subQuestions } = question

    const subQuestionsView = subQuestions ? subQuestions.map(
        (subQuestion, x) => renderSubQuestion(subQuestion, x)
    ) : []

    return (
        <Question question={question} key={key}>
            {subQuestionsView}
        </Question>
    )
}

function renderSubQuestion(subQuestion: SubQuestionType, key: number) {
    return (
        <SubQuestion subQuestion={subQuestion} key={key} />
    )
}

export default Survey
