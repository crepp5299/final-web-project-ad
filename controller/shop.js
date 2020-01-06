const User = require('../model/user');
const Category = require('../model/productCategory');
const Product = require('../model/product');

exports.getAddNewProduct = (req, res) => {
  Category.find({})
    .then(cat => {
      res.render('ecommerce-product-edit', {
        title: 'Thêm sản phẩm',
        user: req.user,
        cat: cat
      });
    })
    .catch(err => console.log(err));
};

exports.postAddNewProduct = (req, res) => {
  let error = {};
  const {
    productName,
    productDescription,
    productMaterial,
    productSize,
    productType,
    productColor,
    productPrice,
    radioGender,
    productSale,
    productTag,
    productStock
  } = req.body;
  console.log(req.body);
  const images = req.files;
  console.log(images);
  let imageUrl = [];
  if (images) {
    for (var i = 0; i < images.length; i++) {
      imageUrl.push('http://bros-admin.herokuapp.com/' + images[i].path);
    }
  }

  const type = String(productType).split('-');

  const newProduct = new Product({
    name: productName,
    description: productDescription,
    stock: productStock,
    price: productPrice,
    size: String(productSize)
      .replace(/ /g, '')
      .split(','),
    type: { main: type[0], sub: type[1] },
    color: String(productColor).split(','),
    tags: String(productTag).split(','),
    isSale: { status: productSale > 0, percent: productSale },
    gender: radioGender,
    images: imageUrl,
    materials: String(productMaterial).split(','),
    ofSellers: { userId: req.user._id, name: req.user.username }
  });

  newProduct
    .save()
    .then(product => {
      User.findById(req.user._id, (err, user) => {
        var p = { sellCount: 0, id: product._id };
        let userProd = user.stall.products;
        userProd.push(p);
        user.stall.products = userProd;
        user.stall.total++;
        user.save();
      });
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
