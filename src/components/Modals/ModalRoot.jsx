import React from 'react';
import * as types from '../../actions/actionTypes';
import DeleteModal from './DeleteModal';
import FormModal from './FormModal';
import { connect } from 'react-redux';
import ContentModal from "./ContentModal";


const MODAL_COMPONENTS = {
  [types.DELETE_MODAL] : DeleteModal,
  [types.FORM_MODAL] : FormModal,
  [types.CONTENT_MODAL] : ContentModal

};

class ModalRoot extends React.Component{

  render(){
    if(!this.props.modalType){
      return null
    }
    else{
      const Modal = MODAL_COMPONENTS[this.props.modalType];
      return(
        <Modal key="1" {...this.props.modalProps}/>
      );
    }
  }
}

export default connect(state => state.modals)(ModalRoot);
