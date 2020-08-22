const authRoutes = require("../routes/auth.routes");

exports.login = (req,res)=>{

};

exports.register = (req,res)=>{

};

exports.logout = (req,res)=>{
    req.logout();
    res.send("Logout Successful.");

};