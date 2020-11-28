import React from 'react';
import {ListGroup} from 'react-bootstrap';

class TeacherDataSelectionList extends React.Component{
    render(){
        return <>
            <ListGroup>
                {this.props.options.map(o => this.createListItem(o))}
            </ListGroup>
        </>
    }

    createListItem = (option) => {
        return <ListGroup.Item 
                    key={option}
                    action 
                    active={this.props.currentActive === option} 
                    onClick={(event) => { this.props.handleClick(event); }}
                >
                    {option}
                </ListGroup.Item>
    }
}

export default TeacherDataSelectionList;