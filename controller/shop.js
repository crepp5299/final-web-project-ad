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

  newProduct
    .save()
    .then(prod => {
      res.redirect('/stalls');
    })
    .catch(err => {
      res.redirect('/stalls');
    });
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

exports.getDashboard = async (req, res) => {
  let top10prod;
  let userlist;
  var countUser;
  var date = new Date();
  var totalIncom = 0;
  var Incom = 0;
  var yearIncom = 0;
  var monthIncom = 0;
  var totalOrder = 0;

  await User.count({}, function(err, count) {
    countUser = count;
  });
  await Product.find({})
    .sort({ buyCounts: 'desc' })
    .limit(10)
    .then(topten => {
      top10prod = topten;
    })
    .catch(err => console.log(err));
  await User.find({ role: { $gt: 0 } })
    .limit(10)
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
      userlist = users;
    })
    .catch(err => {
      console.log(err);
    });

  await userlist.sort(function(a, b) {
    return b.sellCount - a.sellCount;
  });

  await Order.find({}).then(orders => {
    orders.forEach(function(order) {
      if (order) {
        totalOrder++;
        totalIncom += order.cart.totalPrice;
        if (order.date.getDate() == date.getDate() && order.date.getMonth() == date.getMonth() && order.date.getYear() == date.getYear()) {
          Incom += order.cart.totalPrice;
        }
        if (order.date.getMonth() == date.getMonth() && order.date.getYear() == date.getYear()) {
          monthIncom += order.cart.totalPrice;
        }
        if (order.date.getYear() == date.getYear()) {
          yearIncom += order.cart.totalPrice;
        }
      }
    });
  });

  console.log(userlist);

  return res.render('ecommerce-dashboard', {
    title: 'Dashboard',
    top10product: top10prod,
    top10stall: userlist,
    totalIncom: totalIncom,
    userCount: countUser,
    totalOrder: totalOrder,
    user: req.user
  });
};
