import React, {Component} from 'react';
import axios from 'axios';
import TableRows from './TableRows';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class WorkOrdersList extends Component {
    
    constructor(props) { 
        super(props);
        this.state = {workorders: []};
        
    }

    componentDidMount() {
        axios.get('http://matthicksdev.com:4000/workorders/')
            .then(response => {
                this.setState({workorders: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://matthicksdev.com:4000/workorders/')
        .then(response => {
            this.setState({workorders: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    workorderList() {
        return this.state.workorders.map(function(currentWorkOrder, i) {
            return <TableRows workorder={currentWorkOrder} key={i} />;
        });
    }
    
    
    render() {
            
        return (
            <div>
                <Typography variant="h5" color="primary" align="center" style={{fontWeight: 900}}>Work Order Status List</Typography>
                <Grid style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 10 }}>    
                    <TableContainer component={Paper}>
                        <Table stickyHeader size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                        <TableCell style={{fontWeight: 800}}>Job ID</TableCell>
                                        <TableCell style={{fontWeight: 800}}>Name</TableCell>
                                        <TableCell style={{fontWeight: 800}} align="right">Status</TableCell>
                                        <TableCell style={{fontWeight: 800}} align="right">Shipping From</TableCell>
                                        <TableCell style={{fontWeight: 800}} align="right">YYYY-MM-DD</TableCell>
                                        <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                { this.workorderList() }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>  
            </div>
        )
    }
};