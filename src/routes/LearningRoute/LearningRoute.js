import React, { Component } from 'react'
import CorrectRes from '../../components/CorrectRes/CorrectRes'
import IncorrectRes from '../../components/IncorrectRes/IncorrectRes'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'
import './LearningRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningRoute extends Component {

  state = {
    correct: false,
    incorrect: false,
    guess: ''
  }

  static contextType = UserContext
  componentDidMount() {
    let _nextWord;
    let _language;
    let _words;
    this.context.clearError()
    LanguageService.getNextWord()
      .then(nextWord => {
        _nextWord = nextWord
        this.context.setNextWord(_nextWord)
        return LanguageService.getLanguage()
      })
      .then(language => {
        _language = language.language
        _words = language.words
        this.context.setLanguage(_language)
        this.context.setWords(_words)
      })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { guess } = ev.target
    this.setState({ guess: guess.value })
    let _nextWord;
    let _result;
    this.context.clearError()
    LanguageService.postListGuess(guess.value)
      .then(result => {
        _result = result
        this.context.setResult(_result)
        if (guess.value !== result.answer) {
          this.setState({ incorrect: true })
        } else if (guess.value === result.answer) {
          this.setState({ correct: true })
        }
        return LanguageService.getNextWord()
      })
  }

  renderCorrectRes() {
    const { result, nextWord } = this.context
    return <CorrectRes
      guess={this.state.guess}
      result={result}
      nextWord={nextWord}
    />
  }
  renderIncorrectRes() {
    const { result, nextWord } = this.context
    return <IncorrectRes
      guess={this.state.guess}
      result={result}
      nextWord={nextWord}
    />
  }
  render() {
    const { nextWord, result, language } = this.context
    return (
      <>
        { result.isCorrect === false ? this.renderIncorrectRes() : result.isCorrect === true ? this.renderCorrectRes() : <section className="learningRoute">
          <h2>Translate the word:</h2>
          <span>{result.nextWord ? result.nextWord : nextWord.nextWord}</span><div className="DisplayScore">
            <p>
              Your total score is: {nextWord.totalScore}
            </p>
          </div>
          <form onSubmit={this.handleSubmit} className="learning">
            <div className="textbox">
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
        </section>}
      </>
    );
  }
}

export default LearningRoute
