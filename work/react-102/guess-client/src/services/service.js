//Connect with server
export const getSecretWordId = () => {
    return fetch('/secretWordId')
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-secret-word-id-fail') );
};

export const checkResult = (guess, secretWordId) => {
    return fetch('/guess', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { guess: guess, id: secretWordId } )
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('check-result-fail') );
};

export const getAllWords = () => {
    return fetch('/words')
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-word-list-fail') );
};