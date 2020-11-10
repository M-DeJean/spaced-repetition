import React, { Component } from 'react'
import './DashboardRoute.css'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

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
      <li>
        <h4>{word.original}</h4>
        <p>{`correct answer count: ${word.correct_count}`}</p>
        <p>{`incorrect answer count: ${word.incorrect_count}`}</p>
      </li>
    )
  }

  render() {
    const { language } = this.context
    const { words } = this.context
    console.log(language)
    return (
      <section className="dashboard">
        <h2>{language.name}</h2>
        <h2>{`Total correct answers: ${language.total_score}`}</h2>
        <h2><Link to={'/learn'}>Start practicing</Link></h2>
        <h3>Words to practice</h3>
        {this.renderWords()}
      </section>
    );
  }
}

export default DashboardRoute
