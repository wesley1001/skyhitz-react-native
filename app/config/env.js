
'use strict';

var Env = {

    FB_URL: __DEV__ ? 'https://skyhitz-staging.firebaseio.com/sandbox/alejo/v1' : 'https://skyhitz-prod.firebaseio.com/sandbox/alejo/v1',
    S3_URL: __DEV__ ? 'https://skyhitz-staging.s3.amazonaws.com' : 'https://skyhitz-prod.s3.amazonaws.com',
    S3_BUCKETNAME: __DEV__ ? 'skyhitz-staging' : 'skyhitz-prod'

};

module.exports = Env;