const commentRoute = require('express')()
const URL_LIST = require('../../constants')

commentRoute.get(URL_LIST.sqlQueryComment,(req,res)=>{
    res.send(`hello ${URL_LIST.sqlQueryComment}`)
})

commentRoute.get(URL_LIST.typeOrmComment,(req,res)=>{
    res.send(`hello ${URL_LIST.typeOrmComment}`)
})

module.exports = commentRoute;
