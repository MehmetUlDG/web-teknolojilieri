const passport = require("passport");
const mongoose = require("mongoose");
const { token } = require("morgan");
const User = mongoose.model("user");
const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const signUp = async function (req, res) {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.email === "admin@admin.com") {
        user.role = "admin";
    } else {
        user.role = "user";
    }
    user.setPassword(req.body.password);
    // if (!req.body.name || !req.body.email || !req.body.password) {
    //    createResponse(res, 400, { status: "Tüm alanlar gereklidir!" });
    //}
    try {
        await user.save().then((newUser) => {
            let generatedToken = newUser.generateToken();
            createResponse(res, 200, { token: generatedToken });
        });
    } catch (error) {
        createResponse(res, 400, { status: "Kayıt başarısız!" });
    }
};

const login = async function (req, res) {

    passport.authenticate("local", (err, currentUser, info) => {
        if (currentUser) {
            let generatedToken = currentUser.generateToken();
            createResponse(res, 200, { token: generatedToken });
        } else
            createResponse(res, 400, { status: "Kullanıcı adı veya şifre hatalı" });
    })(req, res);
    // if (!req.body.email || !req.body.password) {
    //  createResponse(res, 400, { status: "Tüm alanlar gereklidir!" });
    //}
};
const verifyAdmin = (req, res, next) => {
    if (req.payload && req.payload.role == "admin") {
        next();
    } else {
        res.status(403).json({ status: "Hata", message: "Bu işlem için admin yetkisi gerekiyor!" });
    }
}
module.exports = {
    signUp, login, verifyAdmin

};