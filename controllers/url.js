const shortid = require("shortid");
const URL = require("../models/url");
// const mongoose = require("mongoose");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    //   // Set Up the Database connection
    // mongoose.connect(
    //     'mongodb://127.0.0.1:27017/short-url', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })

    // // Defining customerSchema schema
    // const customerSchema = new mongoose.Schema({
    //     shortId: {
    //         type: String,
    //         required: true,
    //         unique: true
    //     },
    //     redirectURL: {
    //         type: String,
    //         required: true,
    //     },
    //     visitHistory: [ { timestamp: {type: Number} }]
    //     },
    //     {timestamps: true}
    // )

    // // Defining customerSchema model
    // const Customer = mongoose.model(
    //     'urls', customerSchema);
    //     const shortID = shortid();

    // // creating document using create method
    // Customer.create({
    //     shortId: shortID,
    //     redirectURL: body.url,
    //     visitHistory: [],
    //   })
    //     .then(result => {
    //         console.log(result)
    //     })

    const shortID = shortid();
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
