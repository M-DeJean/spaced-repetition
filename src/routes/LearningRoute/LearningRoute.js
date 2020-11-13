import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'
import './LearningRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningRoute extends Component {

  static contextType = UserContext
  componentDidMount() {
    let _nextWord;
    this.context.clearError()
    LanguageService.getNextWord()
      .then( nextWord => {
        _nextWord =nextWord
        this.context.setNextWord(_nextWord)
      })
  }
  render() {
    const { nextWord } = this.context
    console.log(nextWord)
    return (
      <section className="learningRoute">
        <h2>Translate the word:</h2>
        <span>{nextWord.nextWord}</span>
        <p>Your total score is: {nextWord.totalScore}</p>
        <form className="learning">
          <div className ="textbox">
            <Label htmlFor="learn-guess-input">
              What's the translation for this word?
            </Label>
            <Input
              id={'learn-guess-input'}
              name={'guess'}
              required
            />
          </div>
          <Button type="submit">
            Submit your answer
          </Button>
        </form>
    <p>You have answered this word correctly {nextWord.wordCorrectCount} times.</p>
    <p>You have answered this word incorrectly {nextWord.wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
