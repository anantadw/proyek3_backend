const dashboard = (req, res) => {
    res.render('user/index', {
        title: 'Dashboard',
        username: req.user.fullname
    })
}

module.exports = {dashboard}