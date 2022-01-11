const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:pGB_YaaJSyF5UA9@cluster0.q2wsr.mongodb.net/node-auth?retryWrites=true', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))
;

const Product = require('../models/product');

async function addProducts(){
    const product = new Product({
    //     name: "Beer Bottle",
    //     image: "https://chenyiya.com/codepen/product-1.jpg",
    //     price: "25",
    //     description: "Lorem Ipsum Hello Bye",
    //     id: "beer"
    //   }
    //  {
    //     name: "Eco Bag2",
    //     image: "https://chenyiya.com/codepen/product-2.jpg",
    //     price: "45",
    //     description: "Lorem Ipsum Hello Bye!",
    //     id: "eco-bag2"
    //   }
    //   {
        name: "Paper Bag2",
        image: "https://chenyiya.com/codepen/product-3.jpg",
        price: "42",
        description: "Lorem Ipsum Hello Bye",
        id: "paper-bag2"
      }
    );
    
    try{
        const result = await product.save();
        console.log(result);
        console.log('1');
    }
    catch(ex) {
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
}


//addProducts();

