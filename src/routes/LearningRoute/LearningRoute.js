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
    incorrect: false
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
      })
    LanguageService.getLanguage()
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
    let _nextWord;
    let _result;
    this.context.clearError()
    LanguageService.postListGuess(guess.value)
      .then(result => {
        _result = result
        this.context.setResult(_result)
        console.log(result)
      })
      .then(
        LanguageService.getNextWord()
          .then(nextWord => {
            _nextWord = nextWord
            this.context.setNextWord(_nextWord)
            console.log("FETCHed")
          })
      )
      console.log(guess.value, this.context.result.answer)
    if (guess.value !== this.context.result.answer) {
      this.setState({ incorrect: true })
      console.log("State Changed")
    } else if (guess.value === this.context.result.answer) {
      this.setState({ correct: true })
    }
    guess.value = ''
  }

  renderCorrectRes() {
    const { result, nextWord } = this.context
    return <CorrectRes
      result={result}
      nextWord={nextWord}
    />
  }
  renderIncorrectRes() {
    const { result, nextWord } = this.context
    return <IncorrectRes
      result={result}
      nextWord={nextWord}
    />
  }
  render() {
    const { nextWord, result, language } = this.context
    return (
      <>
        { this.state.incorrect ? this.renderIncorrectRes() : this.state.correct ? this.renderCorrectRes() : <section className="learningRoute">
          <h2>Translate the word:</h2>
          <span>{result.nextWord ? result.nextWord : nextWord.nextWord}</span><div className="DisplayScore">
            <p>
              Your total score is: {result.totalScore ? result.totalScore : language.total_score}
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
