import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
//import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
//import LoginForm from './sections/LoginForm';
import MainSection from './sections/MainSection';
import EditSection from './sections/EditSection';
//import PrivateRoute from './PrivateRoute';
import { getMailList } from '../actions';

//Actions:
//......
class newComponent extends Component {
    constructor(props){
        super(props);
        this.state = { loading: false }
    }
    componentWillMount(){
        // this.setState({loading: true});
        // this.props.getActiveUser((response) => {
        //     this.setState({loading: false});
        // });
        this.setState({loading: true});
        this.props.getMailList((response) =>{
            this.setState({loading: false});
        });
    }
    render(){
        const renderRouter = () => {
            return(
                    <Switch>
                        {/*<Route path="/login" component={LoginForm} activeUser={this.props.activeUser}/>*/}
                        <Route path="/mail/:id" component={EditSection} activeUser={this.props.activeUser}/>
                        <Route path="/" component={MainSection} activeUser={this.props.activeUser}/>

                    </Switch>
            )
        }
        const renderFields = () => {
            if (this.state.loading)
                return (
                    <div>Loading...</div>
                )
            else
                return renderRouter()
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
export default connect(mapStateToProps, { getMailList })(newComponent);
    /*
    
    
     */