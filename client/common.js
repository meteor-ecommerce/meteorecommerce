shoppingCart = new Meteor.Collection(null);
shoppingCartObserver = new LocalPersist(shoppingCart, 'Shopping-Cart',
      {                                     // options are optional!
        maxDocuments: 20,                   // maximum number of line items in cart
        storageFull: function (col, doc) {  // function to handle maximum being exceeded
          col.remove({ _id: doc._id });
          alert('Shopping cart is full.');
        }
      });
 






