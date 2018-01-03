import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import { login, setActiveUser } from '../../actions';
//Actions:
//......
class loginForm extends Component {
    constructor(props){ super(props); this.state = {loading: false} }
    componentWillMount(){
        if (this.props.activeUser && this.props.activeUser.id){
            this.props.history.push('/');
        }
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${(touched && error) ? 'has-danger': ''}`
        return (
            <Form.Field className={className}>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    disabled={field.disabled}
                    value={field.input.value} 
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
                
            </Form.Field>
        );
    }
    onSubmit(values){
        this.setState({loading: true});
        this.props.login(values.email, values.password, (response) => {
            this.setState({loading: false});
            this.props.setActiveUser(response);
            this.props.history.push('/');
        }, (error) =>{
            console.log(error);
            this.setState({loading: false});
        });
    }
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="ui container">
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Email"
                        name="email"
                        type="email"
                        value="admin@cinetube.com"
                        disabled={this.state.loading}
                        component={this.renderField} />
                    <Field
                        label="Password"
                        name="password"
                        type="password"
                        value="123456"
                        disabled={this.state.loading}
                        component={this.renderField} />
                    <Form.Field>
                        <Checkbox label='Recordarme' />
                    </Form.Field>
                        
                    <Button primary disabled={this.state.loading}>Submit</Button>
                </Form>
            </div>
        )
    }
}

function validate(values){
  const errors = {};
  //validar los inputs de 'values'
  if (!values.email || values.email.length < 3) {
    errors.email = "Enter a valid email!";
  }
  if (!values.password || values.password.length < 3) {
    errors.password = "Enter a valid category!";
  }
  // Si errors está vacío, el form puede enviarse correctamente
  // Si tiene alguna propiedad, redux-form aume que el form es inválido
  return errors;
    
}

function mapStateToProps(state){
    return { activeUser: state.activeUser }
}


//export default connect(mapStateToProps)(loginForm);
//export default connect(mapStateToProps, { fetchPosts  })(loginForm);


export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(mapStateToProps, { login, setActiveUser })(loginForm)
);
//export default loginForm;