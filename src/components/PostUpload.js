import {Button, Input} from "@material-ui/core";
import React, {useState} from "react";
import axios from "../axios";
import "../css/PostUpload.css";

function PostUpload({setNewPost}) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const chooseFile = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  async function resizeMe(img) {
    var max_width = 500;
    var max_height = 500;

    var canvas = document.createElement("canvas");
    const bitmap = await createImageBitmap(img);
    var width = bitmap.width;
    var height = bitmap.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > max_width) {
        //height *= max_width / width;
        // console.log(`Math.round(${height} *= ${max_width} / ${width}) ${Math.round(height *= max_width / width)}` )
        height = Math.round((height *= max_width / width));
        width = max_width;
      }
    } else {
      if (height > max_height) {
        //width *= max_height / height;
        width = Math.round((width *= max_height / height));
        // console.log(`Math.round(${width} *= ${max_height} / ${height}) ${Math.round(width *= max_height / height)}` )
        height = max_height;
      }
    }
    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);
    var blobBin = atob(canvas.toDataURL("image/jpeg", 0.7).split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {type: "image/png"});

    return file; // get the data from canvas as 70% JPG (can be also PNG, etc.)
  }

  const createPost = async () => {
    let formData = new FormData();
    formData.append("file", await resizeMe(file));
    formData.append("caption", caption);
    const res = await axios.post("/post/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": sessionStorage.getItem("userToken"),
      },
    });
    if (res.data.status) {
      setFile(null);
      setCaption("");
      setNewPost(res.data.post)
    } else {
      alert(res.data.msg);
    }
  };
  return (
    <div className="postupload">
      <Input
        id="fileinput"
        style={{marginTop: "30px"}}
        className="child"
        type="file"
        name="upload-file"
        onChange={chooseFile}
      />
      {/* <progress className="child" max={100} value={progress}/> */}
      <Input
        className="child"
        type="text"
        name="upload-caption"
        placeholder="write your caption here"
        value={caption}
        onChange={e => setCaption(e.target.value)}
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: "#228B22",
          padding: "10px 15px",
          marginBottom: "30px",
          color: "white",
        }}
        className="child"
        onClick={createPost}
      >
        Upload
      </Button>
      <div id="preview"></div>
    </div>
  );
}

export default PostUpload;
