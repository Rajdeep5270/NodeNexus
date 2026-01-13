module.exports.loginPage = (req, res) => {
    return res.render('auth/login');
}

module.exports.dashboardPage = (req, res) => {
    return res.render('dashboard');
}

// add new admin page 
module.exports.addNewAdminPage = (req, res) => {
    return res.render('admin/addNewAdminPage');
}