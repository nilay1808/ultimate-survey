import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Background from '../Media/back.jpeg';
import ForgotCard from '../Components/ForgotCard';

const styles = theme => ({
    background: {
      backgroundImage: 'url(' + Background + ')',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    container: {
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
  });

class Forgot extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={this.props.classes.background} >
                <div className={this.props.classes.container} >
                    <ForgotCard />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Forgot);