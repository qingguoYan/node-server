const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const multer = require("multer");

// 配置 Multer 中间件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // 指定文件保存的目录，可以根据需求进行修改
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "." + ext); // 使用时间戳作为文件名，确保唯一性
  },
});

const upload = multer({ storage: storage });

router.post(
  "/image",
  auth,
  upload.single("file"),
  asyncMiddleware(async (req, res) => {
    const file = req.file;
    console.log("file", file);
    const imageUrl =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    const data = {
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: imageUrl, // 图片 src ，必须
        alt: "yyy", // 图片描述文字，非必须
        href: "zzz", // 图片的链接，非必须
      },
    };
    res.send(data).end();
  })
);

module.exports = router;
