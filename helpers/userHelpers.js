var schema = require("../models/schema");
var bcrypt = require("bcrypt");
var schema1 = require("../models/todoschema");

module.exports = {
  doSignUp: (userData) => {
    return new Promise(async (resolve, reject) => {
      var user = await schema.findOne({ email: userData.email });
     if(user){
       reject("user mail exist")
       console.log("mail already exist");
     }
     else{
      userData.password = await bcrypt.hash(userData.password, 10);
      var datapass = new schema({
        username: userData.username,
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password,
      });
      datapass
        .save()
        .then((data) => {
          // console.log("success 111" + data);
          resolve(data);
        })
        .catch((err) => {
          console.log("err 111" + err);
        });
      }
    });
  
  },
  doSignin: (userData) => {
    return new Promise(async (resolve, reject) => {
      var user = await schema.findOne({ email: userData.email });
      if (user) {
        console.log("user found");
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            resolve(user);
            console.log("correct pass");
          } else {
            resolve(status);
            console.log("incorrect pass");
          }
        });
      } else {
        console.log("no user found");
        reject("no user found")
      }
    });
  },
  addTodo: (item, id) => {
    return new Promise(async (resolve, reject) => {
      const todo = new schema1({
        userId: id.toString(),
        todo: item,
      });
      todo
        .save()
        .then((status) => {
          // console.log("todo add success");
          resolve(status);
        })
        .catch((err) => {
          resolve(err);
          console.log("not success " + err);
        });
    });
  },
  data: (id) => {
    return new Promise(async (resolve, reject) => {
      const data = await schema1.find({ userId: id });
      
      resolve(data);
    });
  },
  removeTodo: (id) => {
    return new Promise(async (resolve, reject) => {
      await schema1
        .findByIdAndDelete(id)
        .then((status) => {
          resolve(status);
          console.log("remove success");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
