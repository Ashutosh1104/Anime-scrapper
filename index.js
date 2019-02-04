var express= require('express')
var app = express()
var {
        getbyName,
        getCharactersfor,
        getStafffor,
        getSimilarfor,
        getallbyName
    }=require('./lib/anime')
var {getTop100}=require('./lib/topAnime')
var {getSeasonal}= require('./lib/seasonal')
var {getTopCharacters}= require('./lib/characterby')
var {searchbyName}=require('./lib/search')

module.exports={
    getbyName,
    getCharactersfor,
    getStafffor,
    getSimilarfor,
    getallbyName,
    getTop100,
    getSeasonal,
    getTopCharacters,
    searchbyName,
}



