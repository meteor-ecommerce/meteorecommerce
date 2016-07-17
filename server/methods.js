// It contain all methods that are called in 'account.js' and 'data_queries.js' //

function cal_final_price(productId,productQty,coupon){
        var total_price = 0;
        var discountPer;
        var ord = Products.find().fetch();
        if(coupon == "notApplied")
            discountPer = 0;
        else{
            var discount = Coupons.find({code:coupon}).fetch();
            discountPer = discount[0].discount;
        }
        var orders = Products.find({_id:productId[0]}).fetch()[0].salePrice;
        
        // console.log(productId);
        // console.log(discountPer);
        // console.log(orders);
        // console.log(ord);
        for(var i=0;i<productId.length;i++){
            var y = Products.find({_id:productId[i]}).fetch()[0].salePrice;
            //console.log(y);
            total_price += parseFloat(y)*parseFloat(productQty[i]);
        }
        //total_price = 500;
        var total_discount = parseFloat((total_price*discountPer)/100);
        total_price = total_price - total_discount;
        // console.log(total_discount);
        // console.log(total_price);
        return total_price;
        
    }


Meteor.methods({    

    

    'orders_lists': function(){
		    
		    return order_list;
	   },     

     //the products that have been added recently
     'show_recent_products':function(){
        return Products.find({},{sort:{createdAt:-1}});
     },
    
    'insert_category':function(name){
        Categories.insert({
            name:name
        });
    },

    'insert_product_data':function(p_name,p_price,p_slug,p_salePrice,p_costPrice,p_categories,p_longDescription,p_shortDescription,p_stock,discount){
        var id = Products.insert({
            name:p_name,
            price:parseFloat(p_price),
            slug:p_slug,
            salePrice:parseFloat(p_salePrice),
            costPrice:parseFloat(p_costPrice),
            categories:p_categories,
            
            longDescription:p_longDescription,
            shortDescription:p_shortDescription,
            stock:parseFloat(p_stock),
            
            discount:discount
        });

        return id;

    },
    'updateProduct':function(id,p_name,p_price,p_slug,p_salePrice,p_costPrice,p_categories,p_longDescription,p_shortDescription,p_stock,discount){
        Products.update({_id:id},{
            name:p_name,
            price:parseFloat(p_price),
            slug:p_slug,
            salePrice:parseFloat(p_salePrice),
            costPrice:parseFloat(p_costPrice),
            categories:p_categories,
            longDescription:p_longDescription,
            shortDescription:p_shortDescription,
            stock:parseFloat(p_stock),
            discount:discount

        });
    },

    'update_categories':function(id,name){
      Categories.update({_id:id},{name:name});
    },
    
    'remove_product':function(id){
      Products.remove({_id:id});
    },
    'remove_category':function(id){
      Categories.remove({_id:id});
    },
    

    'search_data':function(pId,pName){
        Search.insert({
            pId:pId,
            pName:pName
        });
    },     

     'insert_ordered_data':function(prod,ip,obj,productQty,productId,coupon,status,chec){
        var owner;
        var total_price = cal_final_price(productId,productQty,coupon);

        if(!Meteor.userId()){
            owner = "guest";
        }else{
            owner = Meteor.userId();
        }
        //var sync = Meteor.wrapAsync(Ordered.insert);
        //var newId = sync({
        var newId = Ordered.insert({
            products:prod,
            orderedBy:owner,
            createdAt:new Date(),
            clientIp:ip,
            checkoutDetails:obj,
            status:status,
            total_amount:total_price,
            paymentMethod:chec
            
        });
        
        return newId;

     },

     'changeStatus': function(paymentRequestId,oId){
        if(typeof paymentRequestId == 'undefined' || paymentRequestId == null){
            Ordered.update({_id:oId},{$set:{"status":"3"}});
            //console.log(Ordered.find({_id:oId}).fetch());
        }else{
            Ordered.update({paymentRequestId:paymentRequestId},{$set:{"status":"3"}});
            //console.log(Ordered.find({paymentRequestId:paymentRequestId}).fetch());
        }
        //console.log("status changed ...................................");
     },

     'update_status_admin':function(id,val){
        Ordered.update({_id:id},{$set:{status:val}});

     },
     
     'setPaymentStatus':function(paymentRequestId,oId,paymentId){
        if(typeof paymentRequestId == 'undefined' || paymentRequestId == null){
            Ordered.update({_id:oId},{$set:{paymentId:paymentId}});
            //console.log(Ordered.find({_id:oId}).fetch());
        }else{
            Ordered.update({paymentRequestId:paymentRequestId},{$set:{"paymentId":paymentId}});
            //console.log(Ordered.find({paymentRequestId:paymentRequestId}).fetch());
        }
        //console.log("paymentId included ...................................");
     },

     'update_stock':function(rId,oId){
        if(rId == null){
            var products = Ordered.find({_id:oId}).fetch()[0].products;
            for (var i=0;i<products.length;i++){
                var id = products[i].id;
                var stock = Products.find({_id:id}).fetch()[0].stock;
                if(stock>0)
                  Products.update({_id:id},{$inc:{stock:-1}});
            }
        }
        else{
            var products = Ordered.find({paymentRequestId:rId}).fetch()[0].products;
            for (var i=0;i<products.length;i++){
                var id = products[i].id;
                var stock = Products.find({_id:id}).fetch()[0].stock;
                if(stock > 0)
                  Products.update({_id:id},{$inc:{stock:-1}});
                
            }
        }
     },

    paymentRequest: function(productId,productQty,coupon,name,email,phone,oId) {        
        var total_price = cal_final_price(productId,productQty,coupon);
        //console.log(total_price);
        var request = require('request');
        var headers = { 'X-Api-Key': 'API_KEY', 'X-Auth-Token': 'AUTH_TOKEN'}
        var payload = {
          purpose: 'FIFA 16',
          amount: total_price,
          phone: phone,
          buyer_name: name,
          redirect_url: 'redirect_url',
          send_email:false,
          webhook: 'webhook',
          send_sms: false,
          email: email,
          allow_repeated_payments: false}
        var sync = Meteor.wrapAsync(HTTP.post);
        var result = sync('https://test.instamojo.com/api/1.1/payment-requests/',{params: payload,  headers: headers});

        // console.log(result);
        // console.log(result.data.success);
        // console.log(oId);
        Ordered.update({_id:oId},{$set:{paymentRequestId:result.data.payment_request.id}});
        //console.log(Ordered.find({_id:oId}).fetch());
        return result.data.payment_request.longurl;
    },
    getPaymentDetails: function(paymentId,paymentRequestId){
        var request= require('request');
         var payload = {
            payment_id : paymentId,
            payment_request_id : paymentRequestId};
        var headers = { 'X-Api-Key': 'API_KEY', 'X-Auth-Token': 'API_TOKEN'};

        var sync = Meteor.wrapAsync(HTTP.get);
        var result = sync('https://test.instamojo.com/api/1.1/', {params: payload,  headers: headers});
        // console.log(result);
        // console.log(result.data.success);
        return result.data.success;
    },
    sendEmailText: function(email,subject,text) {
      // send the email!
      Email.send({to:email,
         from:'test@test.com',
         subject:subject,
          text:text
        });
    },
    sendEmailHTML: function(email,subject,text) {
      // send the email!
      Email.send({to:email,
         from:'test@test.com',
         subject:subject,
          text:text
        });
    },
    sendSMS:function (number,text) {
      var thread='http://api.msg91.com/api/sendhttp.php?authkey=AUTH_KEY&mobiles='+number+'&message='+text+'&mobile&sender=TLRKFT&route=template';
      HTTP.call( 'GET', thread, {


        }, function( error, response ) {
              if ( error ) {
                  //console.log( error );
              } else {
                  //console.log( response );
                }
            });
    }

    
});

