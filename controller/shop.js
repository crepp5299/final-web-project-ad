const User = require('../model/user');
const Category = require('../model/productCategory');
exports.getAddNewProduct = (req, res) => {
  Category.find({})
    .then(cat => {
      console.log(cat);
      res.render('ecommerce-product-edit', {
        title: 'Thêm sản phẩm',
        user: req.user,
        cat: cat
      });
    })
    .catch(err => console.log(err));
};

exports.postAddNewProduct = (req, res) => {
  console.log(req.body);
  const { productName, productDescription, productGender, productMaterial, productSize, productType, productColor, productPrice } = req.body;
  console.log(productName);
};
