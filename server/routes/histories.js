const router = require("express").Router();
const History = require("../models/history");

//CREATE HISTORY
router.post("/", async (req, res) => {
  const newHistory = new History(req.body);
  try {
    const savedHistory = await newHistory.save();
    res.status(200).json(savedHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE HISTORY
router.put("/:id", async (req, res) => {
  try {
    const updatedHistory = await History.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE HISTORY
router.delete("/:id", async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    await history.delete();
    res.status(200).json({ message: "기록이 삭제되었습니다." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HISTORY
router.get("/:id", async (req, res) => {
  try {
    const history = await History.find({ companyId: req.params.id });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HISTORY
router.get("/", async (req, res) => {
  try {
    let histories = await History.find();
    res.status(200).json(histories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
