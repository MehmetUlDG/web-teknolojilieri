var express = require('express');
var router = express.Router();
var venueController = require("../controller/VenueController");
var commentController = require("../controller/CommentController");

router.get("/", (req, res) => {
    res.json({
        message: "Venue API v1.0",
        endpoints: {
        venues:{
        getAll: 'GET /api/venues',
        getOne: 'GET /api/venues/:venueid',
        create: 'POST /api/venues',
        update: 'PUT /api/venues/:venueid',
        delete: 'DELETE /api/venues/:venueid'
    },
    comments:{
         add: 'POST /api/venues/:venueid/comments',
        getOne: 'GET /api/venues/:venueid/comments/:commentid',
        update: 'PUT /api/venues/:venueid/comments/:commentid',
        delete: 'DELETE /api/venues/:venueid/comments/:commentid'
    }
        }
    });
});

router
    .route("/venues")
    .get(venueController.listVenues)
    .post(venueController.addVenue);

router
    .route("/venues/:venueid")
    .get(venueController.getVenue)
    .put(venueController.updateVenue)
    .delete(venueController.deleteVenue);

router
    .route("/venues/:venueid/comments")
    .post(commentController.addComment)

router
    .route("/venues/:venueid/comments/:commentid")
    .get(commentController.getComment)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

module.exports = router;