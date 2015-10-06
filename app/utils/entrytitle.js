'use strict';

var EntryTitle = {

    getArtistName(title){

        var yourString = title.split(' - ')[0] ? title.split(' - ')[0] : ''; //replace with your string.
        var maxLength = 35; // maximum number of characters to extract

        //trim the string to the maximum length
        var trimmedString = yourString.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

        if(yourString.length < maxLength){
            return yourString;
        }else{

            return trimmedString + '...';
        }

    },
    getSongTitle(title){

        var yourString = title.split(' - ')[1] ? title.split(' - ')[1] : ''; //replace with your string.
        var maxLength = 35; // maximum number of characters to extract

        //trim the string to the maximum length
        var trimmedString = yourString.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

        if(yourString.length < maxLength){
            return yourString;
        }else{

            return trimmedString + '...';
        }

    },
    getTrimmedTitle(title){
        var maxLength = 40; // maximum number of characters to extract

        //trim the string to the maximum length
        var trimmedString = title.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

        if(title.length < maxLength){
            return title;
        }else{

            return trimmedString + '...';
        }
    }
};


module.exports = EntryTitle;