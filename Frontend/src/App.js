import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./axios";
import AuthModal from "./components/Auth";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";

function App() {
  const IG_LOGO =
    "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png";
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [morePost, setMorePost] = useState(true);
  const [newPost, setNewPost] = useState({});
  const [posts_r, setPosts_r] = useState([]);
  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    if (userToken) {
      setUser(jwt(userToken));
    }
  }, []);
  const setSession = (userToken) => {
    setUser(jwt(userToken));
  }
  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem("userToken");
  };
  const fetchData = async () => {
    const res = await axios.get("/post/fetchPost");
    setPosts(res.data);
    setMorePost(false);
  };
  useEffect(() => {
    setPosts_r(posts.slice(0).reverse());
  }, [posts]);
  useEffect(() => {
    if (Object.keys(newPost).length === 0) return;
    setPosts((posts) => [...posts, newPost]);
  }, [newPost]);
  const checkBottom = (e) => {
    const bottom =
      (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) &
      (fetching === false) &
      (morePost === true);
    if (bottom) {
      setFetching(true);
    }
  };
  const deletePost = async (postID) => {
    let result = await axios.delete("/post/deletePost/" + postID, {
      headers: { "x-access-token": sessionStorage.getItem("userToken") },
    });
    if (result.data.status) {
      setPosts(posts.filter((e) => e._id !== postID));
    }
  };

  useEffect(() => {
    if (fetching === false) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);
  return (
    <div className="app" onScroll={checkBottom}>
      <AuthModal
        igLogo={IG_LOGO}
        openModal={openModal}
        setOpenModal={setOpenModal}
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
        setUser={setUser}
        setSession={setSession}
      />
      <div className="app__header">
        <img className="app__headerImage" src={IG_LOGO} alt="instagram logo" />
        <div>
          {user ? (
            <>
              <Button>{user.username}</Button>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setOpenModal(true)}>SignUp</Button>
              <Button onClick={() => setOpenModalLogin(true)}>SignIn</Button>
            </>
          )}
        </div>
      </div>
      <div className="contents">
        {user ? (
          <PostUpload username={user.displayName} setNewPost={setNewPost} />
        ) : (
          <h4 className="app__notify">
            <Button onClick={() => setOpenModalLogin(true)}>
              Login to post
            </Button>
          </h4>
        )}
        <div className="app__post_view">
          <div className="app__post_wrapper">
            {posts_r.map(({ _id, owner_id, username, caption, like_count, imagePath }) => (
              <Post
                key={_id}
                postID={_id}
                post_owner_id={owner_id}
                user={user}
                username={username}
                caption={caption}
                like_count={like_count}
                imageURL={imagePath}
                deletePost={deletePost}
              />
            ))}
            {morePost ? (
              <div className="app__loading">
                <CircularProgress />
              </div>
            ) : (
              <h5 className="app__bottom">No more post!</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
