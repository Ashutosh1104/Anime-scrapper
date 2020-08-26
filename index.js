var express= require('express')
var app = express()
var {
        getbyName,
        getCharactersfor,
        getStafffor,
        getSimilarfor,
        getallbyName,
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

app.listen('8000',function(){
    console.log('server started on 8000');
})

//working example
async function m(){
    let x = await getSimilarfor('fullmetal alchemist');
    console.log(x);
}
m();