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
  Label,
  Grid
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
                <h2> 
                    {getProductName()} 
                    <Button primary onClick={this.props.saveMail}>Guardar</Button>
                    <Link className="ui secondary button" to="/">Cancelar</Link>  
                </h2>
                <Form className="form-edit">
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <label>Idioma</label>
                                <Dropdown placeholder='Seleccione lenguaje' selection options={languages} onChange={this.props.changeMailLanguage} value={mail?mail.selectedLanguage:''}/>
                            </Grid.Column>
                            <Grid.Column>
                                <label>Asunto</label>
                                <Input placeholder='Subject' value={mail?mail.mailroom_template_language[mail.selectedLanguage].subject: ''}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
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
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                        

                                
                </Form>
            </div>
            
        )
    }
}

export default newComponent;
