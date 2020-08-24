// const authRoutes = require("../routes/auth.routes");

exports.login = (req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user,function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.send("Login Successful")
                
                // res.redirect("/secrets");
            });
        }
    })
};

exports.register = (req,res)=>{

};

exports.logout = (req,res)=>{
    req.logout();
    res.send("Logout Successful.");

};

exports.register=(req,res)=>{
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                // user.secret="My Secret is...";
                user.save(function(){
                    res.json(user)
                    // res.redirect("/auth/loginsuccess");
                })
            })
        }
    })
};
exports.authenticate=(req,res)=>{
    passport.authenticate('google', { scope: ['profile'] })
}