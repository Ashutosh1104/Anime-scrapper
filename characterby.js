var {rp}= require('./request')
var cheerio=require('cheerio')

async function getTopCharacters(no,by="loved"){
    z=Math.ceil(no/15)
    result=[]
    var x=0
    while(x<z+1)
    {
        url="https://www.anime-planet.com/characters/top-"+by+"?page="+x     // for weekly add /week and for today add /today here.
        await getCharacters(url).then((list)=>{
            if(x==0){m=list}
            else{
                result=result.concat(list)
            }
        })
        x++
    }
    return(result)
}

function getCharacters(url){
    return rp(url).then((data)=>{
            characters=[]
            var $= cheerio.load(data)
            tbody=$('tbody').children().each(function(){
                character={name:'',anime:[],rank:'',img:'',manga:[],traits:[],upvotes:''}
                character.rank=$(this).find('.tableRank').text()
                character.upvotes=parseInt($(this).find('.heartOn').parent().text().replace(',',''))
                character.img='https://www.anime-planet.com'+$(this).find('.tableAvatar').children().children().attr('src')
                character.name=$(this).find('.name').text()
                tag=$(this).find('.tags').find('ul').find('a').each(function(){
                    b=$(this).text()
                    character.traits.push(b)
                })
                anime=$(this).find('.tableAnime').find('div').eq(0).find('ul').find('li').each(function(){
                    b=$(this).text()
                    character.anime.push(b)            
                })
                anime=$(this).find('.tableAnime').find('div').eq(1).find('ul').find('li').each(function(){
                    b=$(this).text()
                    character.manga.push(b)            
                })
                characters.push(character)
            })
        return characters
    })
}

module.exports={getTopCharacters}

