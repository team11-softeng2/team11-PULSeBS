import React from 'react';
import {Redirect} from 'react-router-dom';
import API from './API';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        // prefilled user pass fields just for convenience for testing purposes
        this.state = { loginSuccess: false, username: 'test', password: 'test' };
    }
    updateField = (name, value) => {
        this.setState({ [name]: value });
    }

    doLoginCall = (username, password) => {
        API.userLogin(username, password).then( (userObj) => {
            if(userObj !== 0) {
                this.props.setLoggedIn(userObj);  // Mettendo setLoggedIn dopo i setState non visualizza /student
                this.setState({loginSuccess: true});       // need to redirect in render
                this.setState({userRole: userObj.role})
            } else {
                this.setState({loginSuccess: false});
                alert("Wrong username or password");
            }
        }).catch(() => {
            console.log("Fail in user login API");
        }
        );
    }

    doLogin = (event) => {
        event.preventDefault();
        if (this.form.checkValidity()) {
            this.doLoginCall(this.state.username, this.state.password);
        } else {
            this.form.reportValidity();
        }
    }
    
    validateForm = (event) => {
        event.preventDefault();
    }

    render() {
        if (this.state.loginSuccess === true && this.state.userRole === "student") {
            console.log("Studente loggato");
            return <Redirect to='/student'/>;
        } else if (this.state.loginSuccess === true && this.state.userRole === "teacher") {
            return <Redirect to='/teacher'/>;
        } else {
            return <div>
                <form className='form' method={'POST'} data-testid="login-form"
                    onSubmit={this.validateForm} ref={form => this.form = form}>
                    <div className={'form-row'}>
                        <div className={'form-group'}>
                            <label htmlFor='username'>Username</label>
                            <input id='username' className={'form-control'} type='text' required={true}
                                name='username'
                                placeholder="Username"
                                value={this.state.username}
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                            />
                        </div>
                        &nbsp;
                        <div className={'form-group'}>
                            <label htmlFor='password'>Password</label>
                            <input id='password' className={'form-control'} type='password' required={true}
                                name='password'
                                value={this.state.password}
                                placeholder="Password"
                                onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className={'form-row'}>
                        <button type='button' className='btn btn-primary' disabled={this.props.doingLogin}
                            onClick={this.doLogin}>Login</button>
                    </div>
                </form>
            </div>
        }
}

}

export default LoginForm