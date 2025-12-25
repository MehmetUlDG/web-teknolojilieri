const passport = require("passport");
const mongoose = require("mongoose");
const { token } = require("morgan");
const User = mongoose.model("user");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const signUp = async function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        createResponse(res, 400, { status: "Tüm alanlar gereklidir!" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.name === "admin") {
        user.role = "admin";
    } else {
        user.role = "user";
    }
    if (req.body.password) {
        user.setPassword(req.body.password);
    } else {
        throw new Error("Şifre boş olamaz.");
    }
    user.setPassword(req.body.password);

    try {
        await user.save().then((newUser) => {
            let generatedToken = newUser.generateToken();
            createResponse(res, 200, { token: generatedToken });
        });
    } catch (error) {
        console.error("Hata Detayı:", error); // Vercel loglarında hatanın ismini görmek için

        let mesaj = "Bir hata oluştu";

        if (error.name === "ValidationError") mesaj = "Veri doğrulama hatası: " + error.message;
        if (error.code === 11000) mesaj = "Bu e-posta zaten kayıtlı!";
        if (error.message.includes("JWT_SECRET")) mesaj = "Sunucu yapılandırma hatası (JWT)";
        createResponse(res, 400, {
            status: "Kayıt başarısız!", mesaj: mesaj,
            errorType: error.name
        });
    }
};

const login = async function (req, res) {
    if (!req.body.email || !req.body.password) {
        createResponse(res, 400, { status: "Tüm alanlar gereklidir!" });
    }
    passport.authenticate("local", (err, currentUser, info) => {
        if (currentUser) {
            let generatedToken = currentUser.generateToken();
            createResponse(res, 200, { token: generatedToken });
        } else
            createResponse(res, 400, { status: "Kullanıcı adı veya şifre hatalı" });
    })(req, res);
};
const verifyAdmin = (req, res, next) => {
    const userData = req.payload || req.auth || req.user;
    if (userData && userData.role == "admin") {
        next();
    } else {
        res.status(403).json({ status: "Hata", message: "Bu işlem için admin yetkisi gerekiyor!" });
    }
}
module.exports = {
    signUp, login, verifyAdmin

};