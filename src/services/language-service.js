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
}

export default LanguageService