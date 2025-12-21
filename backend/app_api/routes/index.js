const jwt = require("express-jwt");
const auth = jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["sha1", "RS256", "HS256"]
});
var express = require('express');
var router = express.Router();
const ctrlVenues = require("../controller/VenueController");
const ctrlComments = require("../controller/CommentController");
const ctrlAuth = require("../controller/Auth");
router.get("/", (req, res) => {
    res.json({
        message: "Venue API v1.0",
        endpoints: {
            auth:{
                signUp:"POST /api/signup",
                login:"POST /api/login"
            },
            venues: {
                getAll: 'GET /api/venues',
                getOne: 'GET /api/venues/:venueid',
                create: 'POST /api/venues',
                update: 'PUT /api/venues/:venueid',
                delete: 'DELETE /api/venues/:venueid'
            },
            comments: {
                add: 'POST /api/venues/:venueid/comments',
                getOne: 'GET /api/venues/:venueid/comments/:commentid',
                update: 'PUT /api/venues/:venueid/comments/:commentid',
                delete: 'DELETE /api/venues/:venueid/comments/:commentid'
            }
        }
    });
});
router.post("/signup", ctrlAuth.signUp);
router.post("/login", ctrlAuth.login);
router
    .route("/venues/:venueid/comments").post(auth, ctrlComments.addComment);
router
    .route("/venues/:venueid/comments/:commentid").get(ctrlComments.getComment).put(auth, ctrlComments.updateComment);
router
    .route("/venues/:venueid/comments/:commentid").delete(auth,ctrlAuth.verifyAdmin, ctrlComments.deleteComment);
router
    .route("/venues")
    .get(ctrlVenues.listVenues);
router
    .route("/venues")
    .post(auth,ctrlAuth.verifyAdmin,ctrlVenues.addVenue);
router
    .route("/venues")
    .get(auth,ctrlAuth.verifyAdmin,ctrlVenues.getAllVenues);
router
    .route("/venues/:venueid")
    .get(ctrlVenues.getVenue);
router
    .route("/venues/:venueid")
    .put(auth,ctrlAuth.verifyAdmin,ctrlVenues.updateVenue)
    .delete(auth,ctrlAuth.verifyAdmin,ctrlVenues.deleteVenue);

module.exports = router;