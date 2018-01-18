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
import { Dimmer, Loader } from 'semantic-ui-react';
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
    setLoader(value){
        this.setState({loading: value});
    }
    render(){

        const showLoader = () => {
            if (this.state.loading || this.props.loader){
                return (
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                )
            }
                
        }
        const renderRouter = () => {
            return(
                <div>
                    {showLoader()}
                    <Switch>
                        {/*<Route path="/login" component={LoginForm} activeUser={this.props.activeUser}/>*/}
                        <Route path="/mail/:id" component={EditSection} activeUser={this.props.activeUser} setLoader={this.setLoader}/>
                        <Route path="/" component={MainSection} activeUser={this.props.activeUser} setLoader={this.setLoader}/>

                    </Switch>
                </div>
            )
        }
        const renderFields = () => {
            if (this.state.loading)
                return showLoader()
            else
                return renderRouter()
        }
        return (
            <div> 
                <BrowserRouter>
                    { renderRouter() }
                </BrowserRouter>
            </div>
            
        )
    }
}
function mapStateToProps(state){
    return { 
        activeUser: state.activeUser,
        loader: state.loader
    }
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