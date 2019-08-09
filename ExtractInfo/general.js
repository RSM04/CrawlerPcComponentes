var cheerio = require('cheerio')
var axios = require('axios')

module.exports = {
    Pccomponentes: function (url) {
        return new Promise(async (resolve, reject) => {
            await axios
                .get(url)
                .then((res) => {
                    let infoproducto = {}
                    const $ = cheerio.load(res.data)
                    infoproducto.url = url
                    infoproducto.price = parseFloat($('div.precioMain.h1').attr('data-price'))
                    infoproducto.model = $('h1[itemprop="name"]').text()
                    // infoproducto.reviews = $('#article-hlink-comments').text()
                    // if (infoproducto.reviews.includes('Opina')) {
                    //     infoproducto.reviews = 'Sin opiniones'
                    // }
                    infoproducto.rating =
                        parseFloat($('div.rating-stars').attr('style').replace('width: ', '').replace('%', '')) / 10 / 2
                    // infoproducto.SerialNumber = $('span[itemprop=productID]').attr('content')
                    let cadena = $('.col-xs-12.col-sm-9').text()
                    let principio = cadena.indexOf('Desde') + 6
                    let final = cadena.indexOf('€')
                    let enviotemp
                    if (cadena.substr(principio, final - principio).includes(',')) {
                        enviotemp = cadena.substr(principio, final - principio).replace(',', '.')
                    }
                    infoproducto.sendprice = parseFloat(enviotemp)
                    // infoproducto.stock = $('span#enstock').text()
                    let img = $('img[itemprop="image"]').attr('src')
                    // infoproducto.img = 'https://' + img.replace('//', '')
                    infoproducto.gamma = $('.GTM-breadcumb').attr('href')
                    infoproducto.marca = $('[itemprop="brand"]').text()
                    infoproducto.totalprice = infoproducto.price + infoproducto.sendprice
                    resolve(infoproducto)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }


}