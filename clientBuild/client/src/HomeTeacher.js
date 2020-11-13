import React from 'react';

class HomeTeacher extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
    return <p>Hello, Teacher {this.props.userName}</p>
    }
}

export default HomeTeacher