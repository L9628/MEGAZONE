const router = require("express").Router();
const Company = require("../models/company");

//REGISTER
router.post("/signup", async (req, res) => {
  const newCompany = await new Company({
    companyId: req.body.companyId,
    companyName: req.body.companyName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedCompany = await newCompany.save();
    res.status(201).json({
      message: `환영합니다 ${savedCompany.companyName}님. MEGAZONE CLOUD 멤버로 성공적으로 등록되었습니다.`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const company = await Company.findOne({
      companyId: req.body.companyId,
    });

    if (!company) {
      return res.status(401).json({ message: "등록되지않은 아이디입니다." });
    }

    if (req.body.password !== company.password) {
      return res.status(401).json({ message: "패스워드를 다시 확인해주세요." });
    }
    res
      .status(200)
      .json({ data: company, message: "성공적으로 로그인 되었습니다!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  try {
    return res.status(200).json({ message: "로그아웃에 성공했습니다" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COMPANY
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMPANIES
router.get("/", async (req, res) => {
  try {
    let companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
