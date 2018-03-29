const messages = {
    'get-secret-word-fail': 'Failed to load secret word.  Check your network connection and try again.',
    'get-guess-fail': 'Failed to load guess word.  Check your network connection and try again.',
    'check-result-fail': 'Failed to check result.  Check your network connection and try again.',
    'clear-history-fail': 'Failed to clear game history.  Check your network connection and try again.',
    'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};