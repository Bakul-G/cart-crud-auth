const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Cart = require('../models/Cart');
const Product = require('../models/product');

router.get('/shopping', ensureAuthenticated, async (req, res) => {
  try{
    const product = await Product.find();
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    res.render('shopping', { products: product , cart: cart});
  }catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  } 
});

router.post("/minus/:id", async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const quantity = 1;
  try{
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex(p => p.productId == productId);
    let productItem = cart.products[itemIndex];
    productItem.quantity -= quantity;
    cart.products[itemIndex] = productItem;
    cart = await cart.save();
    return res.status(201).redirect('/shopping');
  }catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.post("/remove/:id", async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex(p => p.productId == productId);
    //let productItem = cart.products[itemIndex];    
    cart.products.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(201).redirect('/shopping');
  }catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.post("/:id", async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const pro = await Product.findById(productId);
  const name = pro.name;
  const price = pro.price;
  const image = pro.image;
  const quantity = 1;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      //find the index of the product
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem; //ye line nahi samjh aayi :(
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price, image });
      }
      cart = await cart.save();
      return res.status(201).redirect('/shopping');
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price, image }]
      });
      // return res.status(201)
      return res.status(201).redirect('/shopping');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;

//Khud ka

//add to cart
// router.get('/add-cart', async (req, res) => {
//     const id = req.user._id;
//     const quant = await User.findByIdAndUpdate(id, {
//         cart: {
//             products: {
//                 $inc: {
//                     quantity: +0.5
//                 }
//             }
//         }
//     }, {new: true}, (err, doc) => {
//         console.log(doc);
//     })
//         // .then(result => {
//         //     res.render('cart', {quant: result.quantity});
//         // })
//         // .catch(err => console.log(err))
//     ;
//     res.render('cart', {quant: quant.quantity});
// });


// router.get('/view-cart', (req, res) => {
//     res.send(`${req.user.cart.products[quantity]}`);
// });