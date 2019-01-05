var cheerio=require('cheerio')
var {rp}= require('./request')
var {gethover}=require('./namemagic')

function getTop100(filter='anime',timing='all'){
    base_url='https://www.anime-planet.com/anime/top-anime'
    //timing can be all , week , today
    if(timing!='all'){
        base_url=base_url+"/"+timing.toLowerCase
    }
    return rp(base_url).then((data)=>{
        var $= cheerio.load(data)
        top100=[]
        tbody=tbody=$('tbody').find('tr').each(function(){
            anime={title:'',rank:'',type:''}
            anime.rank=$(this).find('.tableRank').text()
            anime.name=$(this).find('.tableTitle').text()
            anime.type=$(this).find('.tableType').text() 
            x=gethover(cheerio.load($(this).find('.tooltip').attr('title')))
            anime={...anime,...x}                
            top100.push(anime)
        })
        return top100
    }).catch(err=> console.log(err))
}

module.exports={getTop100}



