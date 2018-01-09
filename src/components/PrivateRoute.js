import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    constructor(props){
        super(props);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.state = { 
            visible: false, 
            animation: 'overlay'
           
        };
    }
    isAuthenticated(){
        console.log(this.props.activeUser)
        if (this.props.activeUser){
            return true;
        }
        return false;
    }
    
    toggleVisibility = () =>{ 
        this.setState({ visible: !this.state.visible })
    }
    changeMenuType = (event) =>{
        this.setState({animation: event.target.value, visible:false});
    }

    render() {
        //const { visible } = this.state;
        const {component: Component, ...rest} = this.props;
        const renderRoute = props => {
            if (this.isAuthenticated()) {
                return (
                    <Component {...props} activeUser={this.props.activeUser}/>
                );
            }

            const to = {
                pathname: '/login', 
                state: {from: props.location}
            };

            return (
                <Redirect to={to} />
            );
       }

        return (
            <Route {...rest} render={renderRoute}/>
        );
    }
}
function mapStateToProps(state){
    return { activeUser: state.activeUser }
}
export default connect(mapStateToProps)(PrivateRoute);