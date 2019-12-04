import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";
import { getDynamicStyles } from "jss";
import SurveyTakeButton from "../Components/SurveyTakeButton";
class ManagerBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            surveyIds:[],
            surveyOwners: [],
            surveyDueDates: [],
            surveyOver: []
        }
    }
    state1 = {
        surveys: [{
            name: "Survey1",
            dueDate: "3/07"
        }, 
        {
            name: "Survey2",
            dueDate: "2/10"
        },
        {
            name: "Survey3",
            dueDate: "5/30"
        }]
    };
    componentDidMount() {
        console.log("hello")
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(response => response.json())
        .then(data => {
            this.setState({surveys: JSON.parse(data)})
            console.log(this.state)
        });
    }
    render() {
        const surveyIds = []
        const surveyOwners = []
        const surveyDueDates = []
        const surveyOver = []
        const json = []
        var date = new Date()
        for(let i = 0; i < this.state.surveys.length; i++){
            surveyIds.push(this.state.surveys[i]._id.$oid)
            surveyOwners.push(this.state.surveys[i].manager.$oid)
            surveyDueDates.push("12/10/19")
            if(date.toString().localeCompare(surveyDueDates[i])==0||date.toString().localeCompare(surveyDueDates[i])>0){
                surveyOver.push(true)
            }
            else{
                surveyOver.push(false)
            }
        }
        return (
            <div className={"SurveyMenu"}>
                <Paper className={"Survey Menu"}>
                    <Table
                        className={"Surveys"}
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                            
                            {this.state.surveys.map(survey => (
                                <TableCell>
                                    <SurveyTakeButton json = {survey.json}></SurveyTakeButton>
                                </TableCell>                   
                            ))}
                            {surveyOwners.map(owner => (
                                <TableCell align = "left">{owner}</TableCell>                        
                             ))}
                                <TableCell>{"12/4/19"}</TableCell>                        
                            {surveyDueDates.map(due => (
                                <TableCell>{due}</TableCell>                        
                            ))}
                            {surveyOver.map(over => (
                                <TableCell align = "right">{over.toString()}</TableCell>                        
                            ))}
                            
                            </TableRow>
                        </TableHead>
                                       
                    </Table>
                </Paper>
            </div>
        );
    }
}
export default ManagerBoard;