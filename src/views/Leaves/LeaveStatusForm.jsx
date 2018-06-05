import React from 'react'
import { connect } from 'react-redux';
import {HIDE_MODAL} from "../../actions/modal";
import {
  CustomInputWrapper,
  ItemGrid,
  Danger,
  Button,
  StatsCard,
} from "components";
import { Grid } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {
  FlightTakeoff,
  LocalHotel,
  SentimentDissatisfied,
  DateRange
} from "material-ui-icons";
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { fetchUserLeavesHistory } from "../../api/leave";
import {fetchUserLeavesHistoryFailure, fetchUserLeavesHistorySuccess} from "../../actions/leave";

class LeaveStatusForm extends React.Component{
  constructor(props){
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      status: 'approved'
    }
  }
  
  componentDidMount(){
    this.props.fetchUserLeavesHistory({user_id: parseInt(this.props.userId)});
  }
  
  handleStatusChange(event){
    this.setState({
      status: event.target.value
    });
    this.props.change("status",event.target.value);
  }
  
  render(){
    const {error, handleSubmit, submitting, closeModal, userLeaves } = this.props;
    
    return(
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Grid container>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={FlightTakeoff}
                  iconColor="green"
                  title={<div>Annual<br/>Leaves</div>}
                  description={ userLeaves ? `${userLeaves.annual}/14` : null }
                  small="used"
                  statIcon={DateRange}
                  statText="This Year"
                />
              </ItemGrid>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={LocalHotel}
                  iconColor="red"
                  title={<div>Sick<br/>Leaves</div>}
                  description={ userLeaves ? `${userLeaves.sick}/60` : null }
                  small="used"
                  statIcon={DateRange}
                  statText="This Year"
                />
              </ItemGrid>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={SentimentDissatisfied}
                  iconColor="purple"
                  title="Compensation Leaves"
                  description={ userLeaves ? userLeaves.compensation : null}
                  statIcon={DateRange}
                  statText="This Year"
                />
              </ItemGrid>
            </Grid>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleStatusChange}
                >
                  <FormControlLabel value="approved" control={<Radio />} label="Approve" />
                  <FormControlLabel value="rejected" control={<Radio />} label="Reject" />
                </RadioGroup>
                
                <Field name="comment" required="required" autoComplete="reason" type="text" custominputprops={{labelText: 'Comment (optional)'}} component={CustomInputWrapper} />
                <Field name="status" required="required" autoComplete="status" type="hidden" component="input" />
                <Field name="leave_id" required="required" autoComplete="leave_id" type="hidden" component="input" />
                <Field name="user_id" required="required" autoComplete="user_id" type="hidden" component="input" />
              </ItemGrid>
            </Grid>
          </ItemGrid>
        </Grid>
        <br/>
        {error
          ? <Danger>{error}</Danger>
          : null
        }
        <div>
          <Button style={{float: 'right'}} disabled={submitting} onClick={() => {handleSubmit();closeModal()}} color="primary">Submit</Button>
          <Button style={{float: 'right'}} onClick={closeModal} disabled={submitting} color="primary">Cancel</Button>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeModal: () => { dispatch(HIDE_MODAL) },
    fetchUserLeavesHistory: (params) => {dispatch(fetchUserLeavesHistory(params,fetchUserLeavesHistorySuccess,fetchUserLeavesHistoryFailure))}
  }
}

function mapStateToProps({leaves}, ownProps){
  return {
    userLeaves: leaves.allUserLeavesHistory[ownProps.userId],
  }
}

LeaveStatusForm = reduxForm({
  form: 'leave_status_form'
})(LeaveStatusForm);

export default connect(mapStateToProps,mapDispatchToProps)(LeaveStatusForm);