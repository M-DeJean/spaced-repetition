import React, { Component } from 'react'
import './Words.css'

export default class Words extends Component {
    render() {
        const { word } = this.props
        console.log(word)
        return (
            <li className="word">
                <h4>{word.original}</h4>
                <p>{`correct answer count: ${word.correct_count}`}</p>
                <p>{`incorrect answer count: ${word.incorrect_count}`}</p>
            </li>
        )
    }
}