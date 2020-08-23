module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    router.get('/google',auth.authenticate);  

    router.get("/logout",auth.logout);
    
    router.post("/register",auth.register);

    router.post("/login",auth.login);

    app.use('/auth', router);


}