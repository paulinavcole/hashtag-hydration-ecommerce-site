const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createOrderFromCart());
  }
  catch(ex){
    next(ex);
  }

});

app.put('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getCart());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/orders', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await req.user.getPreviousOrders());
    }
    catch(ex){
      next(ex);
    }
  });

app.put('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const order = await Order.findByPk(req.params.id);
    res.send(await order.update(req.body));
  }
  catch(ex){
    next(ex); 
  }
});

app.delete('/cart', isLoggedIn, async(req, res, next)=> {
    try {
      const cart = await req.user.getCart();
      const items = cart.lineItems.find( item => item.id === req.body.id)
      res.send.status(204).send( await items.destroy());
    }
    catch(ex){
      next(ex);
    }
  });
