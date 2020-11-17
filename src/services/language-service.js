import config from '../config'
import TokenService from './token-service'

const LanguageService = {
    //fetching language and words 
    getLanguage() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                //sending bearer token with request
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getNextWord() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                //sending bearer token with request
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postListGuess( guess ) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ guess }),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
          )
      },
}

export default LanguageService