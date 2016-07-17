Meteor.startup(function () {

  Meteor.users.deny({
    'update':function(){
      return true;
    }
  });

  // init items collection
  if (Items.find().count() == 0) {
    Items.insert({name: 'My Item', uploads: []});
  }


  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  // var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id != null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });

  // For sending mails , settings are here //
  //process.env.MAIL_URL = 'smtp://postmasterMAILGUN_URL';
  //console.log(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}}).fetch());

  // if(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}}).count()<2){
  //console.log(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}}).fetch());
    if(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}}).count()==0){
      var a = randomString(6,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var b = randomString(6,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var c = randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var adminEmail = a + '@' + b + '.com';
      var adminPass = c;
      console.log("admin Email = ");
      console.log(adminEmail);
      console.log("admin Password = ");
      console.log(adminPass);
      var id;
      id = Accounts.createUser({
        email: adminEmail,
        password: adminPass,

      });
          Roles.addUsersToRoles(id, ['admin']);
        }
        else if(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}}).count()==1){
          var id1=Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}},{limit:1}).fetch()[0]._id;
          console.log("Admin Credentials reset..Use the following Credentials for admin access..");
          Meteor.users.remove({'roles':{$elemMatch:{$eq:'admin'}}});
          var a = randomString(6,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          var b = randomString(6,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          var c = randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          var adminEmail = a + '@' + b + '.com';
          var adminPass = c;
          console.log("admin Email = ");
          console.log(adminEmail);
          console.log("admin Password = ");
          console.log(adminPass);
          var id;
          id = Accounts.createUser({
            email: adminEmail,
            password: adminPass,

          });
              Roles.addUsersToRoles(id, ['admin']);
          //Meteor.users.update({_id:id1},{$set:{email:adminEmail,password:adminPass}});


        }
  //}
  //console.log(Meteor.users.find({'roles':{$elemMatch:{$eq:'admin'}}},{limit:1}).fetch());
});






var fs = Npm.require('fs');
WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/.uploads\/(.*)$/.exec(req.url);
    if (re !== null) {   // Only handle URLs that start with /url_path/*
        var filePath = Meteor.absolutePath + '/.uploads/' + re[1];
        var data = fs.readFileSync(filePath, data);
        res.writeHead(200, {
                'Content-Type': 'image'
            });
        res.write(data);
        res.end();
    } else {  // Other urls will have default behaviors
        next();
    }
});
