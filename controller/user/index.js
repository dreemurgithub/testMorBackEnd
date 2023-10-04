const usertRoute = require('express')()
const URL_LIST = require('../../constants')

usertRoute.get(URL_LIST.sqlQueryUser,(req,res)=>{
    res.send(`hello ${URL_LIST.sqlQueryUser}`)
})

usertRoute.get(URL_LIST.typeOrmUser,(req,res)=>{
    res.send(`hello ${URL_LIST.typeOrmUser}`)
})

module.exports = usertRoute;
