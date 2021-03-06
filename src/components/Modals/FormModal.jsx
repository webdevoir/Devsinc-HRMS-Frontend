import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';
import * as types from '../../actions/actionTypes';
import { Close } from 'material-ui-icons';

class FormModal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={'md'}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullScreen={this.props.fullscreen ? true : false}
          {...this.props}
        >
          <DialogTitle id="alert-dialog-title">{this.props.title ? this.props.title : "Title"}<Close onClick={this.props.handleClose} style={{float: 'right', cursor: 'pointer'}} /></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.subtitle}
            </DialogContentText>
            {this.props.form}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return({
    handleClose: () => { dispatch({type: types.HIDE_MODAL}) }
  })
}

function mapStateToProps(state) {
  return state.modals.modalProps;
}

export default connect(mapStateToProps,mapDispatchToProps)(FormModal);
