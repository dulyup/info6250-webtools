export const getSecret = (server) => {
    let url = `${server}/game/`;
    return fetch(url, {
      method: 'POST',
      mode: 'CORS'
    })
       .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
       .catch( () => Promise.reject('get-secret-word-fail') );
};

export const getGuess = (server, secretId, common, preGuess) => {
    let url = `${server}/game/${secretId}/guessed`;
    return fetch(url, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { preGuess: preGuess, common: common, id: secretId } )
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-guess-fail') );
};

export const checkResult = (server, guess, secretId) => {
    let url = `${server}/game/${secretId}/guess/${guess}`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('check-result-fail') );
};

export const clearGame = (server, secretId) => {
    let url = `${server}/game/${secretId}`;
    return fetch(url, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('clear-history-fail') );
};

