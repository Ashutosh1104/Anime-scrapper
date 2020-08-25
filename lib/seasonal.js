var cheerio=require('cheerio')
var {rp}= require('./request')
var {gethover}=require('./namemagic')

base_url='https://www.anime-planet.com/anime/seasons/'

function getSeasonal(season){
    url='https://www.anime-planet.com/anime/seasons/'+season;
    return rp(url).then((data)=>{
            var $=cheerio.load(data)
            result={}
            target=$('.cardDeck.cardGrid').each(function(i){
                elements=[]
                subtarget=$(this).find('.card').each(function(){
                    anime={}
                    anime.name=$(this).find('.cardName').text()
                    anime.img='https://www.anime-planet.com'+$(this).find('.crop').children().attr('data-src')
                    x=gethover(cheerio.load($(this).find('.tooltip').attr('title')))
                    anime={...anime, ...x}
                    elements.push(anime)                 
                })
                if(i==0){result.anime=elements}
                if(i==1){result.movies=elements}
                if(i==2){result.OVA=elements}
            })
            return result
    }).catch(err=> console.log(err))
}

module.exports=
    {
        getSeasonal
    }