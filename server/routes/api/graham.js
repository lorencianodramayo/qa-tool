const express = require("express");
const uuid = require("uuid");
// const { saveData } = require("../helpers/mango");

//model
const PlaygroundModel = require("../../models/PlaygroundModel");
const TemplatesModel = require("../../models/TemplatesModel");
const { saveTemplate } = require("../helpers/template");

const router = express.Router();

const uuidv1 = uuid.v1;

router.post("/saveData", async (req, res) => {
    const { partnerId, templateId } =  req.body.params;

    if(templateId.length > 0){
        const savePlayground = new PlaygroundModel({
            partnerId,
            templateId
        });

        //  saving entries
        savePlayground.save((error, result) => {
            if (error) {
                return res
                    .status(500)
                    .json({ msg: "Sorry, internal server errors" });
            }

            return res.json(result);
        });
    }
});

router.post("/saveTemplate", async (req, res) => {
    const { template, conceptId } = req.body.params,
    uniqueId = uuidv1();

    let result = await saveTemplate(template, conceptId, uniqueId, req.get('referer') );

    if(result){
        const saveTemplate = 
            new TemplatesModel({
                conceptId,
                template,
                baseUrl: `https://storage.googleapis.com/adlib-showcase-bucket/${conceptId}/${uniqueId}`,
            });

        //saving entries
        saveTemplate.save((error, result) => {
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

router.get("/getTemplate", (req, res) => {
    TemplatesModel.findById(req.query.templateId, (err, success) => {
        return err
          ? res.status(500).json({ msg: "Sorry, Internal server error" })
          : res.json(success);
      }).sort([["_id", 1]]);
})

module.exports = router;