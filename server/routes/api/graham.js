const express = require("express");
const uuid = require("uuid");
const { saveData } = require("../helpers/mango");

//model
const PlaygroundModel = require("../../models/PlaygroundModel");


const router = express.Router();

const uuidv1 = uuid.v1;

router.post("/saveData", async (req, res) => {
    const { templates, conceptId, partnerId } =  req.body.params,
        uniqueId = uuidv1();

    let dataResult = await Promise.all(templates.map(async (data) => {
        return await saveData(data.url, conceptId, uniqueId, req.get('referer'));
    }));

    if(dataResult){
        const playground = new PlaygroundModel({
            partnerId: partnerId,
            conceptId: conceptId,
            templates: templates,
            baseUrl: `https://storage.googleapis.com/adlib-showcase-bucket/${conceptId}/${uniqueId}`,
        });

        //saving entries
        playground.save((error, result) => {
            if (error) {
                return res
                    .status(500)
                    .json({ msg: "Sorry, internal server errors" });
            }

            return res.json(result);
        });
    }
});

router.get("/getData", (req, res) => {
  PlaygroundModel.findById(req.query.id, (err, success) => {
    return err
      ? res.status(500).json({ msg: "Sorry, Internal server error" })
      : res.json(success);
  }).sort([["_id", 1]]);
});

module.exports = router;