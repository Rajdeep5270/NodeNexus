module.exports.addSouthIndianDishPage = (req, res) => {
    return res.render('southIndian/southIndianFoodAddPage');
}

module.exports.southIndianFoodViewPage = (req, res) => {
    return res.render('southIndian/southIndianFoodViewPage')
}

module.exports.southIndianFoodEditPage = (req, res) => {
    return res.render('southIndian/southIndianFoodEditPage');
}