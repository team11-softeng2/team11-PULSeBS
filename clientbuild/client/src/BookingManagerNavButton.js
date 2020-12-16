import React from 'react';
import {Link} from 'react-router-dom';

class BookingManagerNavButton extends React.Component{
    constructor(props){
        super(props);

        this.state = { onStatisticsPage: true };
    }

    render(){
        return <>
            {
                this.state.onStatisticsPage &&
                <Link className='mr-4 text-light' to='/booking-manager/contact-tracing' onClick={this.handleClick}>
                    Generate contact tracing report
                </Link>
            }

            {
                !this.state.onStatisticsPage &&
                <Link className='mr-4 text-light' to='/booking-manager' onClick={this.handleClick}>
                    Statistics page
                </Link>
            }
        </>
    }

    handleClick = () => {
        this.setState({ onStatisticsPage: !this.state.onStatisticsPage });
    }
}

export default BookingManagerNavButton;