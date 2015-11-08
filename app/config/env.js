
'use strict';

var Env = {
    FB_URL: __DEV__ ? 'https://skyhitz-staging.firebaseio.com/sandbox/staging/v1' : 'https://skyhitz-prod.firebaseio.com/sandbox/prod/v1',
    API_URL: __DEV__ ? 'https://skyhitz-staging.herokuapp.com' : 'https://skyhitz-prod.herokuapp.com'
};

module.exports = Env;