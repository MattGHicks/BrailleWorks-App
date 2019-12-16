import React, {Component} from 'react';
import axios from 'axios';

export default class EditWorkOrder extends Component {

    constructor(props) {
        super(props);

        this.onChangeWorkOrderPO = this.onChangeWorkOrderPO.bind(this);
        this.onChangeWorkOrderName = this.onChangeWorkOrderName.bind(this);
        this.onChangeWorkOrderStatus = this.onChangeWorkOrderStatus.bind(this);
        this.onChangeWorkOrderShippingFrom = this.onChangeWorkOrderShippingFrom.bind(this);
        this.onChangeWorkOrderCompletionDate = this.onChangeWorkOrderCompletionDate.bind(this);
        this.onChangeWorkOrderCompleted = this.onChangeWorkOrderCompleted.bind(this);
        this.onChangeWorkOrderTracking = this.onChangeWorkOrderTracking.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            workorder_po: '',
            workorder_name: '',
            workorder_status: '',
            workorder_shippingFrom: '',
            workorder_completionDate: '',
            workorder_tracking: '',
            workorder_completed: false
            
        }
    }

    componentDidMount() {
        axios.get('http://matthicksdev.com:4000/workorders/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    workorder_po: response.data.workorder_po,
                    workorder_name: response.data.workorder_name,
                    workorder_status: response.data.workorder_status,
                    workorder_shippingFrom: response.data.workorder_shippingFrom,
                    workorder_completionDate: response.data.workorder_completionDate,
                    workorder_completed: response.data.workorder_completed,
                    workorder_tracking: response.data.workorder_tracking
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeWorkOrderPO(e) {
        this.setState({
            workorder_po: e.target.value
        });
    }

    onChangeWorkOrderName(e) {
        this.setState({
            workorder_name: e.target.value
        });
    }

    onChangeWorkOrderStatus(e) {
        this.setState({
            workorder_status: e.target.value
        });
    }

    onChangeWorkOrderShippingFrom(e) {
        this.setState({
            workorder_shippingFrom: e.target.value
        });
    }

    onChangeWorkOrderCompletionDate(e) {
        this.setState({
            workorder_completionDate: e.target.value
        });
    }

    onChangeWorkOrderCompleted(e) {
        this.setState({
            workorder_completed: !this.state.workorder_completed
        });
    }

    onChangeWorkOrderTracking(e) {
        this.setState({
            workorder_tracking: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            workorder_po: this.state.workorder_po,
            workorder_name: this.state.workorder_name,
            workorder_status: this.state.workorder_status,
            workorder_shippingFrom: this.state.workorder_shippingFrom,
            workorder_completionDate: this.state.workorder_completionDate,
            workorder_completed: this.state.workorder_completed,
            workorder_tracking: this.state.workorder_tracking
        };
        axios.post('http://matthicksdev.com:4000/workorders/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update WorkOrder</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job ID: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_po}
                                onChange={this.onChangeWorkOrderPO}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_name}
                                onChange={this.onChangeWorkOrderName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_status}
                                onChange={this.onChangeWorkOrderStatus}
                                />
                    </div>
                    <div className="form-group">
                        <label>Shipping From:</label><br/>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="shippingFromOptions"
                                    id="shippingFromMinuteMan"
                                    value="MMP"
                                    checked={this.state.workorder_shippingFrom==='MMP'}
                                    onChange={this.onChangeWorkOrderShippingFrom}
                                    />
                            <label className="form-check-label">MMP</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="shippingFromOptions"
                                    id="shippingFromBrailleworks"
                                    value="Brailleworks"
                                    checked={this.state.workorder_shippingFrom==='Brailleworks'}
                                    onChange={this.onChangeWorkOrderShippingFrom}
                                    />
                            <label className="form-check-label">Brailleworks</label>
                        </div>

                        <br/><br/>
                        <div className="form-group">
                        <label>Completion / Ship Date: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_completionDate}
                                onChange={this.onChangeWorkOrderCompletionDate}
                                />
                        </div>

                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeWorkOrderCompleted}
                                    checked={this.state.workorder_completed}
                                    value={this.state.workorder_completed}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                        <label>Tracking ID: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_tracking}
                                onChange={this.onChangeWorkOrderTracking}
                                />
                        </div>

                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update WorkOrder" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
