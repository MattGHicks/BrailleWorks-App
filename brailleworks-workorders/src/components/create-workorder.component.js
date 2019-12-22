import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

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
            <div>
                <Typography variant="h5" color="primary" align="center" style={{fontWeight: 900}}>Create Work Order</Typography>


                <form width="50%" onSubmit={this.onSubmit}>
                <Grid container justify="center">
                        <TextField style = {{width: 100}} margin="normal" required label="Job ID" value={this.state.workorder_po} onChange={this.onChangeWorkOrderPO} />
                        <TextField style = {{width: 300}} margin="normal" required label="Name" value={this.state.workorder_name} onChange={this.onChangeWorkOrderName} />           
                    </Grid> <br/><br/>

                    <Grid container justify="center">
                        <FormControl style = {{width: 400}}>
                            <InputLabel required>Status</InputLabel>
                                <Select
                                native
                                value={this.state.workorder_status}
                                onChange={this.onChangeWorkOrderStatus}
                                required
                                >
                            <option value="" />
                            <option value={"On Hold"}>On Hold</option>
                            <option value={"Proofing"}>Proofing</option>
                            <option value={"Print Production"}>Print Production</option>
                            <option value={"Embossing"}>Embossing</option>
                            <option value={"Finishing"}>Finishing</option>
                            <option value={"Shipped"}>Shipped</option>
                            <option value={"Delivered to BW"}>Delivered to BW</option>
                            </Select>
                        </FormControl>
                    </Grid> <br/><br/>

                    <Grid container justify="center">




                        <FormControl style = {{width: 400}}>
                            <InputLabel required>Shipping From</InputLabel>
                                <Select
                                    native
                                    value={this.state.workorder_shippingFrom}
                                    onChange={this.onChangeWorkOrderShippingFrom}
                                    required
                                >
                                    <option value="" />
                                    <option value={"No Shipping"}>No Shipping</option>
                                    <option value={"MMP"}>Minuteman Press</option>
                                    <option value={"Brailleworks"}>Braille Works</option>
                                </Select>
                        </FormControl>



                    </Grid> <br/><br/>
                    
                    <Grid container justify="center">
                        <TextField style = {{width: 400}}
                            label="Completion / Ship Date"
                            type="date"
                            value={this.state.workorder_completionDate}
                            onChange={this.onChangeWorkOrderCompletionDate}
                            required
                            InputLabelProps={{
                            shrink: true                        
                            }}
                            >
                        </TextField>
                    </Grid><br/><br/>
                    
                   <Grid container justify="center">
                        <Button size="large" variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
                    </Grid>
                </form>
            </div>
        )
    }
}