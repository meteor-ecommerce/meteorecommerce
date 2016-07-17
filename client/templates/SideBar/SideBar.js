var categoryvalues = [];



Template.SideBar.rendered=function(){
            

            //Conversion of categories object to categories array
            var categoryobject=Categories.find().fetch();
            for(var i=0;i<categoryobject.length;i++)
               categoryvalues[i]=categoryobject[i].name;

            
            $( "#price-range-slider" ).slider({
               range:true,
               min: 1,
               max: 3000,
               values: [ 1, 3000 ],
               slide: function( event, ui ) {
                  $("#c_min").text(ui.values[0]);
                  $("#c_max").text(ui.values[1]);
               }
           });
            //handle1.stop();
         $("#c_min").text($( "#price-range-slider" ).slider( "values", 0 ));
         $("#c_max").text($( "#price-range-slider" ).slider( "values", 1 ));
         var minVal = $( "#price-range-slider" ).slider( "values", 0 );
         var maxVal = $( "#price-range-slider" ).slider( "values", 1 );
         Session.set('sliderMinValue',minVal);
         Session.set('sliderMaxValue',maxVal);
         Session.set('checkboxValue',categoryvalues);
         
         //Session.set('checkDiscountValue',[0,100]);
         //console.log(Session.get('checkDiscountValue'));
         //console.log(minVal);
         //console.log(maxVal);
         
};


Template.SideBar.events({
   'click #c_filterbutton':function(event){
      event.preventDefault();
      var minVal = $( "#price-range-slider" ).slider( "values", 0 );
      var maxVal = $( "#price-range-slider" ).slider( "values", 1 );
      Session.set('sliderMinValue',minVal);
      Session.set('sliderMaxValue',maxVal);

      // console.log("clicked item");
      // console.log(minVal);
      // console.log(maxVal);
   },

   'change .category':function(event,template){
      event.preventDefault();  

      var selected = template.findAll( "#categoryBox:checked");

      var arrayCategory = _.map(selected, function(item) {
         return item.defaultValue;
      });

      if(arrayCategory.length == 0){
         console.log("empty array");
         Session.set('checkboxValue',categoryvalues);
      }else{
         console.log("full array");
         Session.set('checkboxValue', arrayCategory);
      }      

      console.log(array);

 
   },
   

});


Template.SideBar.helpers({
   'showallcategories':function(){
      return Categories.find();
   },
   

});