import * as React from "react";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              width: "300px",
              color: "rgba(52, 49, 76, 1)"
            }}
          >
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()}>取消</Button>
          <Button onClick={() => props.handleConfim()}>确定</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSlide;
