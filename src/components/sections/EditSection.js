import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//Actions:
import {
    saveMail,
    updateMailList
} from '../../actions';
import { 
        Container, 
        Grid 
    } from 'semantic-ui-react';
import CodeEditor from '../CodeEditor';
import PreviewMail from '../PreviewMail';

class editSection extends Component {
    constructor(props){ 
        super(props);
        this.state = props;
        console.log(props);
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        this.setState({
            selectedLanguage: 0
        });
        //this.onDeleteClick = this.onDeleteClick.bind(this);
    }
    render(){
        
        const handleAreaChange = (event) => {
            var newState = event.value;
            clearTimeout(updateDelay);
            updateDelay = setTimeout(() =>{
                this.setState({
                    selectedMailContent: newState
                });
            }, 300);
        }
        const changeMailLanguage = (event, target) => {
            this.props.selectedMail.selectedLanguage = target.value;
            this.setState({
                selectedLanguage: target.value
            })

        }
        
        const saveMail = () => {
            if (this.props.selectedMail){
                const mail = this.props.selectedMail.mailroom_template_language[this.state.selectedLanguage];
                const req = {
                    content: this.state.selectedMailContent,
                    language_id: mail.language_id,
                    mailroom_template_id: mail.mailroom_template_id,
                    subject: mail.subject,
                }
                this.props.saveMail(req, (response) => {
                    this.props.updateMailList(this.props.selectedMail, this.state.match.params.id);
                }, (response) => {
                    console.log(response);
                });
            }
                
        }
        const deleteMail = () =>{

        }
        var selectedMail = this.props.selectedMail;

        if (selectedMail && !selectedMail.selectedLanguage){
            selectedMail.selectedLanguage = 0;
        }
            return (
                <div className="App height-100">
                    <Container className="height-100 auto-flow" style={{height: '100vh'}}> 
                        <Grid columns={1} divided className="height-50">
                            <Grid.Row className="height-100">
                                <Grid.Column className="auto-flow">
                                    <CodeEditor selectedMail={this.props.selectedMail} changeMailLanguage={changeMailLanguage} handleAreaChange={handleAreaChange} className="code-editor" saveMail={saveMail}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={1} divided className="height-50">
                            <Grid.Row className="height-100">
                                <Grid.Column className="auto-flow">
                                    <PreviewMail content={this.state.selectedMailContent?this.state.selectedMailContent:''}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    {/*<Button secondary className="logout-button" onClick={logout}>Logout</Button> */}
                </div>
            )
        
    }
        
}
var updateDelay;
//function mapStateToProps(state){
//    return { posts: state.value }
//}
//export default connect(mapStateToProps)(editSection);
//export default connect(mapStateToProps, { fetchMails  })(editSection);
//    export default reduxForm({
//    validate,
//    form: 'PostsNewForm'
//})(
//    connect(null, { createPost })(PostsNew)
//);
//
function mapStateToProps(state, ownProps) { //se tome el atributo mailList de state
    //ownProps es el objeto this.props en el punto específico
    if (state.mailList){
        var aux = state.mailList.filter((obj) => {
            return (obj.id === Number(ownProps.match.params.id))
        });
        return { 
            selectedMail: aux[0],
            selectedMailContent: aux[0].mailroom_template_language[0].content,
            mailList: state.mailList
        };
    }
    return {};
}

export default connect(mapStateToProps, { saveMail, updateMailList })(editSection);
    