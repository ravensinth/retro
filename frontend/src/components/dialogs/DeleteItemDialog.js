import React from "react";
import io from "socket.io-client";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  withMobileDialog
} from "@material-ui/core";

import { LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { DELETE_CARD } from "../../events/event-names";

class DeleteItemDialog extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleClick = () => {
    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { id, boardId } = this.props;

    socket.emit(DELETE_CARD, id, boardId);
    this.setState({ isDelete: false });
  };

  render() {
    const { open } = this.state;
    const { fullScreen } = this.props;

    return (
      <>
        <IconButton color="secondary" onClick={this.handleOpen}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-delete-card-dialog"
          aria-describedby="alert-delete-card-dialog-description"
        >
          <DialogTitle id="alert-delete-card-dialog">
            {"Delete this card?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-card-dialog-description">
              You are about to delete this card. If you are sure, then click on
              the delete button.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withMobileDialog()(DeleteItemDialog);