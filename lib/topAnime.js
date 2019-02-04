var cheerio=require('cheerio')
var {rp}= require('./request')
var {gethover}=require('./namemagic')

function getTop100(timing='all',filter='anime'){
    base_url='https://www.anime-planet.com/anime/top-anime/'
    //timing can be all , week , today
    let url=base_url+timing
    if(timing=='all'){
        url=base_url        
    }
    return rp(url).then((data)=>{
        var $= cheerio.load(data)
        top100=[]
        tbody=tbody=$('tbody').find('tr').each(function(){
            anime={name:'',rank:'',type:''}
            anime.rank=$(this).find('.tableRank').text()
            anime.name=$(this).find('.tableTitle').text()
            anime.type=$(this).find('.tableType').text() 
            y=cheerio.load($(this).find('.tooltip').attr('title'))
            anime.img='https://www.anime-planet.com'+y('img').attr('src')
            x=gethover(cheerio.load($(this).find('.tooltip').attr('title')))
            anime={...anime,...x}                
            top100.push(anime)
        })
        return top100
    }).catch(err=> console.log(err))
}

module.exports={getTop100}



