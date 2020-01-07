const User = require('../model/user');
const Category = require('../model/productCategory');
const Product = require('../model/product');
const Order = require('../model/order');
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

  newProduct.save();
};

exports.getStall = (req, res, next) => {
  User.find({ role: { $gt: 0 } })
    .then(async users => {
      let userArray = [];
      for (var i = 0; i < users.length; i++) {
        let userObj = {};
        await Product.find({ 'ofSellers.userId': users[i]._id }).then(products => {
          users[i].prodCount = products.length;
          var sell = 0;
          for (var j = 0; j < products.length; j++) {
            sell += Number(products[j].buyCounts);
          }
          users[i].sellCount = sell;
        });
      }

      return res.render('ecommerce-stalls', {
        title: 'Quản lý gian hàng',
        allUser: users,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMyProducts = (req, res, next) => {
  const userId = req.user._id;
  Product.find({ 'ofSellers.userId': userId })
    .then(productList => {
      return res.render('ecommerce-products', {
        title: 'Sản phẩm của tôi',
        prodList: productList,
        user: req.user
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId).then(prod => {
    Category.find({})
      .then(cat => {
        res.render('product-edit', {
          title: 'Sửa sản phẩm',
          user: req.user,
          cat: cat,
          prod: prod
        });
      })
      .catch(err => console.log(err));
  });
};

exports.postEditProduct = (req, res, next) => {
  let error = {};
  const prodId = req.params.prodId;
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

  var updateConfig = {
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
    materials: String(productMaterial).split(',')
  };

  if (imageUrl.length > 0) {
    updateConfig.images = imageUrl;
  }

  Product.findByIdAndUpdate(prodId, updateConfig).then(prod => {
    res.redirect('/stalls');
  });
};

exports.postDeleteProduct = (req, res, next) => {
  let error = {};
  const prodId = req.params.prodId;
  Product.findByIdAndDelete(prodId).then(res.redirect('/stalls'));
};

exports.getOrder = (req, res) => {
  Order.find({ 'cart.numItems': { $gt: 0 } }).then(listOrders => {
    return res.render('orders', {
      title: 'Quản lý Đơn Hàng',
      orders: listOrders,
      user: req.user
    });
  });
};

exports.getDashboard = (req, res) => {
  Product.find({})
    .sort({ buyCounts: 'desc' })
    .limit(10)
    .then(topten => {
      Product.find({})
        .sort({ buyCounts: 'desc' })
        .limit(10)
        .then(topten => {
          return res.render('ecommerce-dashboard', {
            title: 'Quản lý Đơn Hàng',
            user: req.user,
            top10product: topten
          });
        });
    });
};
