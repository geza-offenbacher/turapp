const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


const Hike = require("../../models/Hike");

const Profile = require("../../models/Profile");


const validateHikeInput = require("../../validation/hike");

router.get("/test", (req, res) => res.json({ msg: "Túrák működnek" }));

router.get("/", (req, res) => {
    Hike.find()
        .sort({ date: -1 })
        .then((hikes) => res.json(hikes))
        .catch((err) => res.status(404).json({ nohikesfound: "Nincsenek tűrák" }));
});

router.get("/:id", (req, res) => {
    Hike.findById(req.params.id)
        .then((hike) => res.json(hike))
        .catch((err) =>
            res.status(404).json({ nohikesfound: "Nincsenek túrák ilyen ID-vel" })
        );
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateHikeInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newHike = new Hike({
            text: req.body.text,
            title: req.body.title,
            start: req.body.start,
            arrive: req.body.arrive,
            from: req.body.from,
            to: req.body.to,

            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
        });

        newHike.save().then((hike) => res.json(hike));
    }
);

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Hike.findById(req.params.id)
                .then((hike) => {
                    if (hike.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: "A felhasználónak nincsen hozzáférése" });
                    }
                    hike.remove().then(() => res.json({ success: true }));
                })
                .catch((err) =>
                    res.status(404).json({ postnotfound: "Nem található ilyen túra" })
                );
        });
    }
);

router.post(
    "/hikeLike/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Hike.findById(req.params.id)
                .then((hike) => {
                    if (
                        hike.hikeLikes.filter((hikeLike) => hikeLike.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: "A felhasználó már jelentkezett" });
                    }

                    hike.hikeLikes.unshift({ user: req.user.id });

                    hike.save().then((hike) => res.json(hike));
                })
                .catch((err) =>
                    res.status(404).json({ hikenotfound: "No hike found" })
                );
        });
    }
);

router.post(
    "/unhikelike/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Hike.findById(req.params.id)
                .then((hike) => {
                    if (
                        hike.hikeLikes.filter((hikeLike) => hikeLike.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ nothikeLiked: "You have not yet hikeliked this post" });
                    }

                    const removeIndex = hike.hikeLikes
                        .map((item) => item.user.toString())
                        .indexOf(req.user.id);

                    hike.hikeLikes.splice(removeIndex, 1);

                    hike.save().then((hike) => res.json(hike));
                })
                .catch((err) =>
                    res.status(404).json({ postnotfound: "Nincsen túra" })
                );
        });
    }
);

router.post(
    "/hikeComment/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateHikeInput(req.body);

        // Validáció ellenőrzése
        if (!isValid) {
            // Ha hibát talál dob egy 400-at és egy error objektumot
            return res.status(400).json(errors);
        }

        Hike.findById(req.params.id)
            .then((hike) => {
                const newComment = {
                    text: req.body.text,
                    title: req.body.title,
                    start: req.body.start,
                    arrive: req.body.arrive,
                    from: req.body.from,
                    to: req.body.to,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id,
                };

                hike.hikeComments.unshift(newHikeComment);
                hike.save().then((hike) => res.json(hike));
            })
            .catch((err) => res.status(404).json({ hikenotfound: "Nincsen poszt" }));
    }
);

router.delete(
    "/hikeComment/:id/:hikeComment_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Hike.findById(req.params.id)
            .then((hike) => {
                if (
                    hike.hikeComments.filter(
                        (hikeComment) => hikeComment._id.toString() === req.params.hikeComment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ hikecommentnotexists: "A komment nem létezik" });
                }

                const removeIndex = hike.hikeComments
                    .map((item) => item._id.toString())
                    .indexOf(req.params.hikeComment_id);

                hike.hikeComments.splice(removeIndex, 1);

                hike.save().then((hike) => res.json(hike));
            })
            .catch((err) => res.status(404).json({ hikenotfound: "Nincsen túra" }));
    }
);

module.exports = router;
