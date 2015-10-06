'use strict';

var Time = {
    timeDifference(previous) {

        var timeNow = Math.floor(Date.now());

        var msPerMinute = 60 * 1000,

            msPerHour = msPerMinute * 60,

            msPerDay = msPerHour * 24,

            msPerYear = msPerDay * 365,

            elapsed = timeNow - previous;

        if (elapsed < msPerMinute) {

            return Math.round(elapsed / 1000) + 's';

        }

        else if (elapsed < msPerHour) {

            return Math.round(elapsed / msPerMinute) + 'm';

        }

        else if (elapsed < msPerDay) {

            return Math.round(elapsed / msPerHour) + 'h';

        }

        else if (elapsed < msPerYear) {

            return Math.round(elapsed / msPerDay) + 'd';

        } else {

            return Math.round(elapsed / msPerYear) + 'y';

        }

    }

};


module.exports = Time;