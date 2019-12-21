import React, {Component} from 'react';
import axios from 'axios';

export default class CreateWorkOrder extends Component {

    constructor(props) {
        super(props);
        this.onChangeWorkOrderPO = this.onChangeWorkOrderPO.bind(this);
        this.onChangeWorkOrderName = this.onChangeWorkOrderName.bind(this);
        this.onChangeWorkOrderStatus = this.onChangeWorkOrderStatus.bind(this);
        this.onChangeWorkOrderShippingFrom = this.onChangeWorkOrderShippingFrom.bind(this);
        this.onChangeWorkOrderCompletionDate = this.onChangeWorkOrderCompletionDate.bind(this);
        this.onChangeWorkOrderTracking = this.onChangeWorkOrderTracking.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            workorder_po: '',
            workorder_name: '',
            workorder_status: '',
            workorder_shippingFrom: '',
            workorder_completionDate: '',
            workorder_completed: false,
            workorder_tracking: '',
        }
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
    onChangeWorkOrderTracking(e) {
        this.setState({
            workorder_tracking: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`WorkOrder PO: ${this.state.workorder_po}`);
        console.log(`WorkOrder Name: ${this.state.workorder_name}`);
        console.log(`WorkOrder Status: ${this.state.workorder_status}`);
        console.log(`WorkOrder ShippingFrom: ${this.state.workorder_shippingFrom}`);
        console.log(`WorkOrder CompletionDate: ${this.state.workorder_completionDate}`);
        console.log(`WorkOrder Completed: ${this.state.workorder_completed}`);

        const newWorkOrder = {
            workorder_po: this.state.workorder_po,
            workorder_name: this.state.workorder_name,
            workorder_status: this.state.workorder_status,
            workorder_shippingFrom: this.state.workorder_shippingFrom,
            workorder_completionDate: this.state.workorder_completionDate,
            workorder_completed: this.state.workorder_completed,
            workorder_tracking: this.state.workorder_tracking
        }

        axios.post('http://matthicksdev.com:4000/workorders/add', newWorkOrder)
            .then(res => console.log(res.data));

        this.props.history.push('/');

        this.setState({
            workorder_po: '',
            workorder_name: '',
            workorder_status: '',
            workorder_shippingFrom: '',
            workorder_completionDate: '',
            workorder_completed: false,
            workorder_tracking: 'null',
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New WorkOrder</h3>
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
                        <label>Shipping From: </label><br/>
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
                    </div>
                    <div className="form-group">
                        <label>Completion Date: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.workorder_completionDate}
                                onChange={this.onChangeWorkOrderCompletionDate}
                                />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create WorkOrder" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}