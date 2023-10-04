const connectRoute = require('express')()
const URL_LIST = require('../../constants')

connectRoute.get(URL_LIST.sqlQueryConnect,(req,res)=>{
    res.send(`hello ${URL_LIST.sqlQueryConnect}`)
})

connectRoute.get(URL_LIST.typeOrmConnect,(req,res)=>{
    res.send(`hello ${URL_LIST.typeOrmConnect}`)
})

module.exports = connectRoute;
