const Post = require("../models/Post");
let router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    //   console.log(file);
    let filetype = "";
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
const upload = multer({storage: storage});

router.get("/fetchPost", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.get("/getComment/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({
        status: false,
        msg: "Require id  '/getComment/:id' for query data",
      });
  }
  const post = await Post.find({_id: id},{comments: 1});
  if (!post) {
    return res
      .status(400)
      .json({status: false, msg: `Post id:${id} is not found`});
  }
  // console.log(post[0].comments);
  res.status(200).json({status: true, comments: post[0].comments});
});

router.post("/createPost", auth, upload.single("file"), async (req, res) => {
  const {caption} = req.body;
  const owner_id = req.user.id;
  const username = req.user.username;

  if (!req.file) {
    return res.status(400).json({msg: "image is required"});
  }

  const post = await Post.create({
    owner_id,
    username,
    caption,
    imagePath: req.file.path,
    timestamp: Date.now(),
  });
  res.status(200).json({status: true, msg: "Created Post Success", post});
});

router.put("/createComment", auth, async (req, res) => {
  try {
    const username = req.user.username;
    const owner_id = req.user.id;
    const {text, id} = req.body;
    const comment = {
      owner_id,
      username,
      text,
      timestamp: Date.now(),
    };
    const post = await Post.findById(id);
    if (post) {
      const newComments = [...post.comments, comment];
      const result = await Post.findByIdAndUpdate(id, {comments: newComments});
      return res.status(200).json({status: true, msg: "Add comment successfully"});
    }
    res.status(500).json({status: false, msg: "error"});
  } catch (err) {
    res.status(500).json({status: false, msg: err.message});
  }
});

router.get("/getPost/:id", auth, async (req, res) => {
  let id = req.params.id;

  const post = await Post.findById(id);
  if (post) {
  }
  res.status(200).json(post);
});

module.exports = router;
