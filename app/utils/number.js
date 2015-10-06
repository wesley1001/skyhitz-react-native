'use strict';

var Number = {
    formatNumber (number) {

        // return 1k if exceeds 10000

        return number;
    },
    getFollowers(number){

        if(number === 0){

            return '';

        }

        if(number > 0){

            if(number >= 1000000){

                return Math.round(100*(number/1000000))/100 + 'M Followers';

            } else if (number >= 1000){

                return Math.round(100*(number/1000))/100 + 'K Followers';

            } else {

                return number + ' Followers';

            }

        }

    }
};


module.exports = Number;