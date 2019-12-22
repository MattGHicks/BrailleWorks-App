import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';




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
                
                <Typography variant="h5" color="primary" align="center" style={{fontWeight: 900}}>Edit Work Order</Typography>
                <form width="50%" onSubmit={this.onSubmit}>

                    <Grid container justify="center">
                        <TextField style = {{width: 100}} margin="normal" required label="Job ID" value={this.state.workorder_po} onChange={this.onChangeWorkOrderPO} />
                        <TextField style = {{width: 300}} margin="normal" label="Name" value={this.state.workorder_name} onChange={this.onChangeWorkOrderName} />           
                    </Grid> <br/><br/>

                    <Grid container justify="center">
                        <FormControl style = {{width: 400}}>
                            <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                                <Select
                                native
                                value={this.state.workorder_status}
                                onChange={this.onChangeWorkOrderStatus}
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
                            <InputLabel>Shipping</InputLabel>
                                <Select
                                    native
                                    value={this.state.workorder_shippingFrom}
                                    onChange={this.onChangeWorkOrderShippingFrom}
                                >
                                    <option value={"No Shipping"} >No Shipping</option>
                                    <option value={"MMP"}>Minuteman Press</option>
                                    <option value={"Braille Works"}>Braille Works</option>
                                </Select>
                        </FormControl>
                    </Grid> <br/><br/>
                    
                    <Grid container justify="center">
                        <TextField style = {{width: 400}}
                            label="Completion / Ship Date"
                            type="date"
                            value={this.state.workorder_completionDate}
                            onChange={this.onChangeWorkOrderCompletionDate}
                            InputLabelProps={{
                            shrink: true                        
                            }}
                            >
                        </TextField>
                    </Grid>

                    <Grid container justify="center">
                        <TextField style = {{width: 400}} margin="normal" id="standard-basic" label="Tracking #" value={this.state.workorder_tracking} onChange={this.onChangeWorkOrderTracking} />
                    </Grid> <br/><br/>
                    
                    <Grid container justify="center">
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Completed"
                            labelPlacement="start"
                            id="completedCheckbox"
                            name="completedCheckbox"
                            onChange={this.onChangeWorkOrderCompleted}
                            checked={this.state.workorder_completed}
                            value={this.state.workorder_completed}
                        />
                    </Grid> <br/><br/>

                    <Grid container justify="center">
                        <Button size="large" variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
                    </Grid>
                </form>
            </div>
        )
    }
}
