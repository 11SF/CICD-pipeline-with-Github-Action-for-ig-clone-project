const Post = require("../models/Post");
const Comment = require("../models/Comment");
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
const upload = multer({ storage: storage });

router.get("/fetchPost", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.post("/createPost", auth, upload.single("file"), async (req, res) => {
  const { caption } = req.body;
  const owner_id = req.user.id;
  const username = req.user.username;

  if (!req.file) {
    return res.status(400).json({ msg: "image is required" });
  }

  const post = await Post.create({
    owner_id,
    username,
    caption,
    imagePath: req.file.path,
    timestamp: Date.now(),
  });
  res.status(200).json({ status: true, msg: "Created Post Success", post });
});

router.put("/createComment", auth, async (req, res) => {
  try {
    const username = req.user.username;
    const owner_id = req.user.id;
    const { text, id } = req.body;
    const post = await Post.findById(id);
    if (post) {
      const comment = await Comment.create({
        username,
        owner_id,
        post_id: id,
        text,
        timestamp: Date.now(),
      });
      if (comment) {
        return res
          .status(200)
          .json({ status: true, msg: "Add comment successfully" });
      }
      // const newComments = [...post.comments, comment];
      // const result = await Post.findByIdAndUpdate(id, {comments: newComments});
    }
    res.status(500).json({ status: false, msg: "error" });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

router.put("/likePress", async (req, res) => {
  const { owner_id, id } = req.body;
  try {
    if (!owner_id || !id) {
      return res.status(400).json({
        status: false,
        msg: "Require Post id and owner id",
      });
    }

    const post = await Post.findById(id);
    if (post.size !== 0) {
      let arr_id = post.like_count;
      let isLike = arr_id.filter((e) => e === owner_id);
      console.log(isLike);
      if (isLike.length === 0) {
        arr_id = [...arr_id, owner_id];
        const result = await Post.findByIdAndUpdate(id, { like_count: arr_id });
        console.log(result);
        return res.status(200).json({ status: true, like_count: arr_id.length });
      } else {
        arr_id = arr_id.filter((e) => e !== owner_id);
        const result = await Post.findByIdAndUpdate(id, { like_count: arr_id });
        console.log(result);
        return res
          .status(200)
          .json({ status: true, like_count: arr_id.length });
      }
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

router.get("/getComment/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: false,
      msg: "Require id  '/getComment/:id' for query data",
    });
  }
  // const post = await Post.find({ _id: id }, { comments: 1 });
  const comments = await Comment.find({ post_id: id });
  if (comments === []) {
    return res
      .status(400)
      .json({ status: false, msg: `Comment of post id:${id} is not found` });
  }
  res.status(200).json({ status: true, comments: comments });
});

router.delete("/deleteComment/:id", async (req, res) => {
  let id = req.params.id;

  try {
    Comment.findByIdAndRemove(id, (err, result) => {
      if (err) {
        res.status(500).json({ status: false, msg: err.message });
      } else {
        console.log(result);
        return res
          .status(200)
          .json({ status: true, msg: "Delete comment successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

router.get("/getPost/:id", auth, async (req, res) => {
  let id = req.params.id;

  const post = await Post.findById(id);
  if (post) {
  }
  res.status(200).json(post);
});

router.delete("/deletePost/:id", async (req, res) => {
  let id = req.params.id;

  try {
    Post.findByIdAndRemove(id, (err, result) => {
      if (err) {
        res.status(500).json({ status: false, msg: err.message });
      } else {
        console.log(result);
        return res
          .status(200)
          .json({ status: true, msg: "Delete post successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

module.exports = router;
