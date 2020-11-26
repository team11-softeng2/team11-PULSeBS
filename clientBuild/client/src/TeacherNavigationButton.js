import React from 'react';
import {Link} from 'react-router-dom';

class TeacherNavigationButton extends React.Component{
    constructor(props){
        super(props);

        this.state = { onCalendar: true };
    }

    render(){
        return <>
            {
                this.state.onCalendar &&
                <Link className='mr-4' to='/teacher/historicalData' onClick={this.handleClick}>
                    Historical data page
                </Link>
            }

            {
                !this.state.onCalendar &&
                <Link className='mr-4' to='/teacher' onClick={this.handleClick}>
                    Calendar page
                </Link>
            }
        </>
    }

    handleClick = () => {
        this.setState({ onCalendar: !this.state.onCalendar });
    }
}

export default TeacherNavigationButton;