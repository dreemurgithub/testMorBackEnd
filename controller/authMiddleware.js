const URL_LIST = require('../constants')
const urlKeys = Object.keys(URL_LIST)
const urlRoutes = urlKeys.map(el => URL_LIST[el])
const authMiddleware = async (req,res,next) =>{
    const autoPass = req.url === '/login' || req.url ==='/logout' || req.url ==='/orm/user' || req.url === '/sql/user'
    if(autoPass || req.method === 'GET') {
        next()
        return
    }
    // const userauthMiddleware = req.session.user
    const userId = req.session.userId
    const allowRouteId = urlRoutes.map(el=> `${el}/${userId}` )

    if(userId && allowRouteId.includes(req.url)) {
        next()
        return
    }
    res.status(401).send({message: 'Not Allowed'})

}

module.exports = authMiddleware