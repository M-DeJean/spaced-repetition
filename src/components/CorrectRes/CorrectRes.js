import React, { Component } from 'react'
import Button from '../Button/Button'
import './CorrectRes.css'

export default class IncorrectRes extends Component {
    render() {
        const { result, nextWord } = this.props
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
                        {`The correct translation for ${nextWord.nextWord} was ${result.answer} and you chose ${result.guess}!`}
                    </p>
                    <Button type="click">
                        Try another word!
                    </Button>
                </div>
            </div>
        )
    }
}