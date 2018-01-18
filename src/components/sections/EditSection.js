import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//Actions:
import {
    saveMail,
    updateMailList,
    setLoader
} from '../../actions';
import { 
        Container, 
        Grid,
        Confirm 
    } from 'semantic-ui-react';
import CodeEditor from '../CodeEditor';
import PreviewMail from '../PreviewMail';
import { ToastContainer, toast } from 'react-toastify';

class editSection extends Component {
    constructor(props){ 
        super(props);
        this.state = props;
        this.toastId = null;
    }
    componentWillMount() {
        this.setState({
            confirm: {
                open: false,
                content: ''        
            }
        });
    }
    componentDidMount() {
        this.setState({
            selectedLanguage: 0
        });
        this.onSubjectChange = this.onSubjectChange.bind(this);
    }
    onSubjectChange(subject){
        var mailAux = this.props.selectedMail;
        mailAux.mailroom_template_language[this.state.selectedLanguage].subject = subject
        this.setState({
            selectedMail: mailAux
        });
    }
    finishUpdateProcess() {
        toast("Mail actualizado", {
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
            closeButton: true,
            hideProgressBar: true
            // className: css({
            //     transform: "rotateY(360deg)",
            //     transition: "transform 0.6s"
            // })
        })
    }
    failedUpdateNotification(){
        this.toastId = toast("No hay cambios", {
            type: toast.TYPE.WARNING,
            autoClose: 3000,
            closeButton: true,
            hideProgressBar: true
        })
    }

    render(){
        const contentChanged = () => {

            return (this.props.selectedMail.mailroom_template_language[this.state.selectedLanguage].content != this.state.selectedMailContent)
        }
        const confirmLanguageChange = (event, target) => {
            if (contentChanged()){
                this.setState({
                    confirm: {
                        open:true,
                        content: 'Se descartarán los cambios no guardados. ¿Está seguro que desea cambiar el idioma?',
                        type: 'languageChange',
                        event, target
                    }
                })
            }
            else{
                changeMailLanguage(event, target); 
            }
                
        }
        const handleCancel = () => {
            this.setState({
                confirm: {
                    open:false
                }
            });
        }
        const handleConfirm = () => {
            switch(this.state.confirm.type){
                case 'languageChange': 
                    changeMailLanguage(this.state.confirm.event, this.state.confirm.target); 
                    this.setState({
                        confirm: {
                            open:false
                        }
                    })
                break;
            }
        }
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
                if (contentChanged()){
                    const mail = this.props.selectedMail.mailroom_template_language[this.state.selectedLanguage];
                    mail.content = this.state.selectedMailContent;
                    const req = {
                        content: this.state.selectedMailContent,
                        language_id: mail.language_id,
                        mailroom_template_id: mail.mailroom_template_id,
                        subject: mail.subject,
                    }
                    this.props.setLoader(true);
                    this.props.saveMail(req, (response) => {
                        this.props.updateMailList(this.props.mailList);
                        this.finishUpdateProcess();
                        this.props.setLoader(false);
                    }, (response) => {
                        console.log(response);
                    });
                }
                else{
                    this.failedUpdateNotification();
                }    
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
                    <ToastContainer/>
                    <Confirm
                      open={this.state.confirm.open}
                      onCancel={handleCancel}
                      onConfirm={handleConfirm}
                      content={this.state.confirm.content}
                    />
                    <Container className="height-100 auto-flow" style={{height: '100vh', overflowX: 'hidden'}}> 
                        <Grid columns={1} divided className="height-50">
                            <Grid.Row className="height-100">
                                <Grid.Column className="auto-flow">
                                    <CodeEditor selectedMail={this.props.selectedMail} confirmLanguageChange={confirmLanguageChange} handleAreaChange={handleAreaChange} onSubjectChange={this.onSubjectChange} className="code-editor" saveMail={saveMail}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={1} divided className="height-50">
                            <Grid.Row className="height-100">
                                <Grid.Column>
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

export default connect(mapStateToProps, { saveMail, updateMailList, setLoader })(editSection);
    