import {React, useState, useEffect} from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import AddActivity from '../AddActivity';
import ActivityList from '../ActivityList';

import { ref, set, child, push, onValue, equalTo, orderByChild , query} from "firebase/database";

export default function Calendar(props) {

    const {firebase, authUser} = props;

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };

    /* HOOKS */
    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);

    /* CALENDAR HEAD */
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }

    /*** CALENDAR BODY ***/
    const setSelectedDay = day => {
        setSelected({
                day,
                month: currentMonthNum()
        });
         // Later refresh data
    };

    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");

    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    /*** ADDING AN ACTIVITY ***/
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState(null);

    /*** ACTIVITY LIST ***/
    const [activities, setActivities] = useState(true);
    const [loading, setLoading] = useState([]);
    const [activeDays, setActiveDays] = useState([]);

    // const retrieveData = () => {

    //     let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
    //     let reference = child(ref(firebase.db), `users/${authUser.uid}/activities`);

    //     onValue(reference, (snapshot) => {
    //         let data = snapshot.val();
    //         setActivities(data);
    //         setLoading(false);
    //     })
    // };

    useEffect(() => {

        let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
        let reference = child(ref(firebase.db), `users/${authUser.uid}/activities`);

        let filteredRef = query(reference, orderByChild("date"), equalTo(queryDate));

        onValue(filteredRef, (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            setActivities(data);
            setLoading(false);
        })

    }, [selectedDay]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody 
                        firstDayOfMonth={firstDayOfMonth}
                        daysInMonth={daysInMonth}
                        currentDay={currentDay}
                        currentMonth={currentMonth}
                        currentMonthNum={currentMonthNum}
                        actualMonth={actualMonth}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        weekdays={moment.weekdays()} 
                    />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className="paper">
                    {/* { editing
                        ?
                            <>
                                <h3>Edit activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        : */}
                            <>
                                <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                    {/* } */}
                </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
                <Paper className="paper">
                <h3>Activities on {selectedDay.day}-{selectedDay.month + 1}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                />
                </Paper>
            </Grid>
        </Grid>
    )
};