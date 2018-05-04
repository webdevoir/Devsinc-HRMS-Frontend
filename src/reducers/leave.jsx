import initialState from "./initialState";
import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

export const leave = (state=initialState.leaves, action) => {
  switch(action.type){
    case types.NEXT_LEAVE_YEAR:
      return {...state, leavesTableYear: parseInt(state.leavesTableYear+1) };
    
    case types.PREV_LEAVE_YEAR:
      return {...state, leavesTableYear: parseInt(state.leavesTableYear-1) };
    
    case types.FETCH_LEAVES_SUCCESS:
      return {...state, allLeaves: action.payload};
    
    case types.FETCH_LEAVES_FAILURE:
      return state;
    
    case types.FETCH_LEAVE_APPROVALS_SUCCESS:
      return {...state, allLeaveApprovals: action.payload};
    
    case types.FETCH_LEAVE_APPROVALS_FAILURE:
      return state;
    
    case types.CREATE_LEAVE_SUCCESS:
      return {...state, allLeaves: [...state.allLeaves, action.payload ]};
    
    case types.CREATE_LEAVE_FAILURE:
      return state;
    
    case types.CREATE_LEAVE_STATUS_SUCCESS:
      let i = 0;
      for( i ; i < state.allLeaveApprovals.length; i++){
        if(state.allLeaveApprovals[i].id == action.payload.leave_id){
          break;
        }
      }
      return update(state,{
        allLeaveApprovals: {
          [i] : {
            status: {$set: action.payload.status},
            comment: {$set: action.payload.comment}
          }
        }
      });
    
    case types.CREATE_LEAVE_STATUS_FAILURE:
      return state;
    
    default:
      return state
  }
};