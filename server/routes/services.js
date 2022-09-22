const router = require("express").Router();
const Service = require("../models/service");

//CREATE SERVICE
router.post("/", async (req, res) => {
  const newService = new Service(req.body);
  try {
    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE SERVICE
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE SERVICE
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    await service.delete();
    res.status(200).json({ message: "서비스가 삭제되었습니다." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SERVICE
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.find({ name: req.params.id });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SERVICE
router.get("/", async (req, res) => {
  try {
    let services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
