import React, { Component } from 'react'
import Button from '../Button/Button'
import './CorrectRes.css'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext'

export default class CorrectRes extends Component {

    static contextType = UserContext

    refreshPage() {
        LanguageService.getNextWord()
            .then(
                window.location.reload(false)
            )
    }

    render() {
        const { result, nextWord, guess } = this.props
        return (
            <div className="CorrectRes">
                <div className="DisplayScore">
                    <p>
                        Your total score is: {result.totalScore}
                    </p>
                    <h2>You were correct! :D</h2>
                </div>
                <div className="DisplayFeedback">
                    <p>
                        {`The correct translation for ${nextWord.nextWord} was ${result.answer} and you chose ${guess}!`}
                    </p>
                    <Button onClick={this.refreshPage} type="click">
                        Try another word!
                    </Button>
                </div>
            </div>
        )
    }
}