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
  const images = req.files;
  let imageUrl = [];
  if (images) {
    for (var i = 0; i < images.length; i++) {
      imageUrl.push(images[i].filename);
    }
  }

  const type = String(productType).split('-');

  console.log(type);

  const newProduct = new Product({
    name: productName,
    description: productDescription,
    stock: productStock,
    price: productPrice,
    size: String(productSize)
      .replace(/ /g, '')
      .split(','),
    productType: { main: type[0], sub: type[1] },
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
        var p = { sellCount: 0, prodId: product._id };
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

exports.getStall = (req, res, next) => {
  User.find({ stall: { $exists: true } })
    .then(users => {
      res.render('ecommerce-stalls', {
        title: 'Quản lý gian hàng',
        allUser: users,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMyProducts = async (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId, async (err, user) => {
    let productList = [];
    if (err) console.log(err);
    if (user.stall) {
      const prodArray = user.stall.products;
      for (var i = 0; i < prodArray.length; i++) {
        await Product.findById(prodArray[i].toJSON().prodId)
          .then(prod => {
            productList.push(prod);
          })
          .catch(err => console.log(err));
      }
      return res.render('ecommerce-products', {
        title: 'Sản phẩm của tôi',
        prodList: productList,
        user: req.user
      });
    } else {
      res.render('ecommerce-products', {
        title: 'Sản phẩm của tôi',
        prodList: productList,
        user: req.user
      });
    }
  });
};
