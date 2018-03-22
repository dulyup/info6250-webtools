const messages = {
    'get-secret-word-id-fail': 'Failed to load secret word.  Check your network connection and try again.',
    'get-word-list-fail': 'Failed to load word list.  Check your network connection and try again.',
    'check-result-fail': 'Failed to check result.  Check your network connection and try again.',
    'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};