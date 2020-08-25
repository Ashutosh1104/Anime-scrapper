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
    makingDb,
}
app.get('/',function(req,res){
    makingDb().then(promises=>{
        Promise.all(promises).then( temp => {
            result=[]
            console.log('.......................')
            for( let i = 0 ; i < temp.length ; i++){
                for( let j = 0 ; j < temp[i].length ; j++){
                    result.push(temp[i][j])
                    if( i == temp.length-1 && j == temp[i].length-1 ){
                        console.log(result.length)
                        res.send(result);
                    }
                }
            }
        }).catch(err=> console.log(err))
    }).catch(err=> console.log(err))
})
app.listen('8000',function(){
    console.log('server started on 8000');
})

