import React, { Component } from "react";
import { Form } from "react-bootstrap";
import StateQuestions from "./StateQuestions";
import SurveyCreateButton from "../Components/SurveyCreateButton";

export class SurveyState extends Component {
    render() {
        let itemList = this.props.items;
        console.log("item List-");
        console.log(itemList);
        if (itemList.length === 0) {
            return (
                <div style={margin}>
                    <h3>The survey is currently empty!</h3>
                </div>
            );
        } else if (itemList.length === 1) {
            return (
                <div style={margin}>
                    <h3>
                        The survey currently has {itemList.length} question-
                    </h3>
                    <Form style={formStyle}>
                        <StateQuestions
                            items={this.props.items}
                            removeItem={this.props.removeItem}
                        />
                        <SurveyCreateButton items={this.props.items} />
                    </Form>
                </div>
            );
        } else {
            return (
                <div style={margin}>
                    <h3>
                        The survey currently has {itemList.length} questions-
                    </h3>
                    <Form style={formStyle}>
                        <StateQuestions
                            items={this.props.items}
                            removeItem={this.props.removeItem}
                        />
                        <SurveyCreateButton items={this.props.items} />
                    </Form>
                </div>
            );
        }
    }
}

const margin = {
    marginTop: "4em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default SurveyState;
