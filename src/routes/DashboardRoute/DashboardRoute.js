import React, { Component } from 'react'
import './DashboardRoute.css'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import Words from '../../components/Words/Words'

class DashboardRoute extends Component {

  static contextType = UserContext

  componentDidMount() {
    let _language;
    let _words;
    this.context.clearError()
    LanguageService.getLanguage()
      .then(language => {
        _language = language.language
        _words = language.words
        this.context.setLanguage(_language)
        this.context.setWords(_words)
      })
  }

  renderWords() {
    const { words = [] } = this.context
    return words.map(word =>
        <Words
          key={word.id}
          word={word}
        />
    )
  }

  render() {
    const { language } = this.context
    return (
      <section className="dashboard">
        <h2>{language.name}</h2>
        <h2>{`Total correct answers: ${language.total_score}`}</h2>
        <Link to={'/learn'}>Start practicing</Link>
        <h3>Words to practice</h3>
        <ul className="wordList">
          {this.renderWords()}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute
