module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new users
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));  

    app.get("/logout",function(req,res){
        req.logout();
        res.redirect("/");
    });
    
    app.post("/register",function(req,res){
        User.register({username:req.body.username},req.body.password,function(err,user){
            if(err){
                console.log(err);
                res.redirect("/register");
            }else{
                passport.authenticate("local")(req,res,function(){
                    user.secret="My Secret is...";
                    user.save(function(){
                        res.redirect("/secrets");
                    })
                })
            }
        })
    
    });

    app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect secrets.
        res.redirect('/secrets');
    });
    
    app.post("/login",function(req,res){
        const user = new User({
            username:req.body.username,
            password:req.body.password
        })
        req.login(user,function(err){
            if(err){
                console.log(err);
            }else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/secrets");
                });
            }
        })
    
    });
  };