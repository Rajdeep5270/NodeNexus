module.exports.addGujaratiDishPage = (req, res) => {
    return res.render('gujrati/gujratiFoodAddPage');
}

module.exports.gujratiFoodViewPage = (req, res) => {
    return res.render('gujrati/gujratiFoodViewPage');
}

module.exports.gujratiFoodEditPage = (req, res) => {
    return res.render('gujrati/gujratiFoodEditPage');
}