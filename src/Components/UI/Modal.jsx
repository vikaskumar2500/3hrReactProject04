import React, {Fragment, useContext} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import MyContext from "../../MyContext/MyContext";

const Backdrops = (props) => {
  // console.log(props.isHidden);
  let backdrops = props.isHidden?classes.backdrops:'';
  return <div className={backdrops}></div>;
};

const ModalOverlay = (props) => {
  return <div className={classes["modal-overlays"]}>{props.children}</div>;
};

const Modal = (props) => {

  const myCtx = useContext(MyContext);
  return (
    <Fragment>
      {myCtx.isHidden && ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <Backdrops isHidden={myCtx.isHidden} />,
        document.getElementById("backdrops")
      )}
    </Fragment>
  );
};

export default Modal;
