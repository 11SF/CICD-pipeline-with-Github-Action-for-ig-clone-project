import {Button, Input, Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import axios from "../axios";
import "../css/Auth.css";

function Auth({
  igLogo,
  openModal,
  setOpenModal,
  openModalLogin,
  setOpenModalLogin,
  setUser,
}) {
  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      marginTop: 8,
    },
  }));

  const getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const registerUser = async () => {
    const payload = {
      username,
      password,
      email,
    };
    const res = await axios.post("/user/register", payload);
    if (res.data.status) {
      refreshPage();
      setOpenModal(false);
    } else {
      setErrorMsg(res.data.msg);
    }
  };

  const loginUser = async () => {
    const payload = {
      email,
      password,
    };
    const res = await axios.post("/user/login", payload);
    if (res.data.status) {
      sessionStorage.setItem("userToken", res.data.token);
      refreshPage();
      setOpenModalLogin(false);
    } else {
      setErrorMsg(res.data.msg);
    }
  };
  const refreshPage = () => {
    window.location.reload(false);
  };
  // const guestButtonPress = () => {
  //     let randomName = "guest-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  //     auth.signInAnonymously()
  //     .then((user) => {
  //         user.user.updateProfile({
  //             displayName: randomName
  //         }).then((user)=> setUser(user))
  //         setOpenModalLogin(false);
  //     })
  // }
  const handleButtonPress = () => {
    if (openModalLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleButtonPress();
    }
  };
  return (
    <Modal
      open={openModal || openModalLogin}
      onClose={() => {
        setOpenModal(false);
        setOpenModalLogin(false);
      }}
    >
      <div style={modalStyle} className={classes.paper}>
        <form className="auth__form">
          <center>
            <img src={igLogo} alt="instagram-logo" />
          </center>
          <Input
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />

          {openModalLogin ? null : (
            <Input
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              onKeyPress={handleKeyPress}
            />
          )}

          <Input
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            onKeyPress={handleKeyPress}
          />
          {errorMsg ? <p>{errorMsg}</p> : null}
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={handleButtonPress}
          >
            {openModalLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default Auth;
