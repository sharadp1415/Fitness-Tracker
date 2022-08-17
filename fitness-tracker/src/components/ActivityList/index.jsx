import React from 'react';
import { withFirebase } from  '../Firebase';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function ActivityList(props) {
    const {loading, activities, setOpenSnackbar, setSnackbarMsg} = props;
    
    return (
        <>
            { 
                loading === true 
                    ? <p>Loading</p> 
                    : ''
            }
            
            {
                activities === 'not set' || activities === null
                    ? <p>No activities added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(activities).map((activity, i) => {
                                    let {name, type, duration} = activity;
                                    switch(activity.type) {
                                        case 1:
                                            type = "Lifting weights";
                                            break;
                                        case 2:
                                            type = "Running";
                                            break;
                                        case 3:
                                            type = "Cycling";
                                            break;
                                        default:
                                            type = "Not set";
                                    };
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{type}</TableCell>
                                            <TableCell>{duration}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);