import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//Actions:
import {
  Button,
  Form,
  Dropdown,
  Input,
  Label
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
        
        const getProductName = () => {
            if (this.props.selectedMail){
                return this.props.selectedMail.mailroom_template_name + ' (' + this.props.selectedMail.product_name + ')';
            }
            return ' ';
        }
        const mail = this.props.selectedMail;
        return (
            <div className="height-100"> 
                <h2> {getProductName()}</h2>
                <Form className="form-edit">
                    <div>
                        <Button primary onClick={this.props.saveMail}>Guardar</Button>
                        <Link className="ui secondary button" to="/">Cancelar</Link>
                        
                        <Dropdown placeholder='Seleccione lenguaje' fluid selection options={languages} onChange={this.props.changeMailLanguage} value={mail?mail.selectedLanguage:''}/>
                        <h3>Asunto</h3>
                        <Form.Field inline>
                          <Input fluid placeholder='Subject' value={mail?mail.mailroom_template_language[mail.selectedLanguage].subject: ''}/>
                        </Form.Field>
                        <h3>Contenido</h3>
                    </div>
                    <CodeMirror
                          value={mail?mail.mailroom_template_language[mail.selectedLanguage].content:''}
                          options={{
                            mode: 'xml',
                            lineNumbers: true,
                            theme: 'material'
                          }}
                          onChange={(editor, data, value) => {
                            this.props.handleAreaChange({value});
                          }}
                          
                        />
                </Form>
            </div>
            
        )
    }
}

export default newComponent;
