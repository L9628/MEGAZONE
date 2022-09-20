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

  const company = await Company.find();
  if (
    !company.filter((el) =>
      el.companyId === newCompany.companyId ? false : true
    )
  ) {
    return res.status(401).json({
      message: "중복되는 아이디가 있습니다. 다른 아이디를 사용해주세요",
    });
  }

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
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json({ message: "등록되지않은 이메일입니다." });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json({ message: "패스워드를 다시 확인해주세요." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password, ...others } = user._doc;
    res
      .cookie("refreshToken", refreshToken, cookieOption)
      .status(200)
      .json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
