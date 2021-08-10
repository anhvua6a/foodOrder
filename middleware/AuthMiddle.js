var UserModel = require('../model/User')
let {RoleUser} = require('../enum/Enumcommon')


module.exports.checkLogin = async (req, res, next) => {
    if (!req.cookies.user_id) {
        return res.redirect('/login')
    }
    let user = await UserModel.findOne({_id: req.cookies.user_id})
    if (!user) {
        return res.redirect('/login')
    }
    if (user.role !== RoleUser.ADMIN) {
        return res.redirect('/login')
    }
    next()


}
