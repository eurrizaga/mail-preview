import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//Actions:
import {
  Button,
  Form,
  Dropdown
} from 'semantic-ui-react';
import {UnControlled as CodeMirror} from 'react-codemirror2';

class newComponent extends Component {
    
    render(){
        var languages;
        if (this.props.selectedMail && this.props.selectedMail.mailroom_template_language){
            languages = this.props.selectedMail.mailroom_template_language.map((language) => {
                return {
                    key: language.language_id,
                    value: this.props.selectedMail.mailroom_template_language.indexOf(language),
                    text: language.language_name
                }
            });
        }
        else
            languages = [];
        console.log(this.props.selectedMail);
        return (
            <div className="height-100"> 
                <h2> Código fuente </h2>
                <Form className="height-100">
                    <div>
                        <Button primary>Guardar</Button>
                        <Dropdown placeholder='Seleccione lenguaje' fluid selection options={languages} onChange={this.props.changeMailLanguage}/>
                    </div>
                    <CodeMirror
                          value={this.props.selectedMail?this.props.selectedMail.mailroom_template_language[this.props.selectedMail.selectedLanguage].content:''}
                          options={{
                            mode: 'xml',
                            lineNumbers: true,
                            theme: 'material'
                          }}
                          onChange={(editor, data, value) => {
                            this.props.handleAreaChange({value});
                          }}
                          className="height-100"
                        />
                </Form>
            </div>
            
        )
    }
}


//function mapStateToProps(state){
//    return { posts: state.value }
//}


//export default connect(mapStateToProps)(newComponent);
//export default connect(mapStateToProps, { fetchPosts  })(newComponent);


//    export default reduxForm({
//    validate,
//    form: 'PostsNewForm'
//})(
//    connect(null, { createPost })(PostsNew)
//);
export default newComponent;
