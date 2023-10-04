const todoRoute = require('express')()
const URL_LIST = require('../../constants')

todoRoute.get(URL_LIST.sqlQueryTodo,(req,res)=>{
    res.send(`hello ${URL_LIST.sqlQueryTodo}`)
})

todoRoute.get(URL_LIST.typeOrmTodo,(req,res)=>{
    res.send(`hello ${URL_LIST.typeOrmTodo}`)
})

module.exports = todoRoute;
