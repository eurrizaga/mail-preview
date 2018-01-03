import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
//import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './sections/LoginForm';
import MainSection from './sections/MainSection';
import SecondarySection from './sections/SecondarySection';
import PrivateRoute from '../route/PrivateRoute';
import { getActiveUser } from '../actions';

//Actions:
//......
class newComponent extends Component {
    constructor(props){
        super(props);
        this.state = { loading: false }
    }
    componentWillMount(){
        this.setState({loading: true});
        this.props.getActiveUser((response) => {
            this.setState({loading: false});
        });
    }
        
    render(){
        const renderFields = () => {
            console.log(this.props.activeUser)
            if (!this.props.activeUser && (this.props.activeUser !== false))
                return (
                    <div>Loading...</div>
                )
            else
                return(
                    
                        <Switch>
                            <Route path="/login" component={LoginForm} activeUser={this.props.activeUser}/>
                            <PrivateRoute path="/secondary" component={SecondarySection} activeUser={this.props.activeUser}/>
                            <PrivateRoute path="/" component={MainSection} activeUser={this.props.activeUser}/>

                        </Switch>
                    
                )
        }
        return (
            <div> 
                <BrowserRouter>
                    { renderFields() }
                </BrowserRouter>
            </div>
            
        )
    }
}
function mapStateToProps(state){
    return { activeUser: state.activeUser }
}
//export default connect(mapStateToProps)(newComponent);
//export default connect(mapStateToProps, { fetchPosts  })(newComponent);
//    export default reduxForm({
//    validate,
//    form: 'PostsNewForm'
//})(
//    connect(null, { createPost })(PostsNew)
//);
export default connect(mapStateToProps, { getActiveUser })(newComponent);
    /*
    
    
     */