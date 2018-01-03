import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMailList, logout } from '../../actions';
import { 
        Button,
        Container, 
        Form, 
        Grid, 
        Icon,
        Table, 
        TextArea 
    } from 'semantic-ui-react';
import UserModal from '../UserModal.js';
import MailTable from '../MailTable';
import PreviewMail from '../PreviewMail';
import CodeEditor from '../CodeEditor';

//Actions:
//......
class mainSection extends Component {
    constructor(props){ 
        super(props); 
        this.logout = this.logout.bind(this);
        this.state = {};
        this.selectMail = this.selectMail.bind(this);
        

    }

    componentWillMount(){
        this.props.getMailList((response) =>{
            console.log(response.data.data);
            this.setState({
                mailList: response.data.data
            })
        });
    }

    componentDidMount(){
        // this.setState({
        //     selectedMail: this.state.mailList[0],
        //     selectedMailContent: this.state.mailList[0].content
        // });
    }
    selectMail(mail){
        console.log('selectedMail');
        this.setState({
            selectedMail: mail,
            selectedMailContent: mail.content
        });
    }
    logout(){
        this.props.logout((response) => {
            this.props.history.push('/login');
        });
    }
    render(){
        const { activeUser } = this.props;
        //const { meta: { touched, error } } = field;
        const previewMail = () =>{
            if (this.state && this.state.selectedMailContent){
                return (<PreviewMail mail={this.state.selectedMailContent} />)
            }
        }

        const handleAreaChange = (event) => {
            var newState = event.value;
            //var newState = this.state.selectedMail;
            //newState.content = event.target.value;
            this.setState({
                selectedMailContent: newState,
                //selectedMail: newState
            })
            
        }
        const saveMail = () => {
            var newState = this.state.selectedMail;
            newState.content = this.state.selectedMailContent;
            this.setState({
                selectedMail: newState
            })
        }
        const changeMailLanguage = (event, value) => {
            console.log(event.target.value);
        }
        var selectedMail = this.state.selectedMail;
        if (selectedMail && !selectedMail.selectedLanguage){
            selectedMail.selectedLanguage = 0;
        }
        return (
                <div className="App height-100">
                    <Container className="height-100 auto-flow" style={{maxHeight: '100vh'}}> 
                        <Grid columns={2} divided className="height-50">
                            <Grid.Row className="height-100" style={{maxHeight: '500px'}}>
                                <Grid.Column className="auto-flow">
                                    <MailTable selectMail={this.selectMail} saveMail={saveMail} mailList={this.state.mailList}/>
                                </Grid.Column>
                                <Grid.Column className="auto-flow">
                                    <CodeEditor selectedMail={selectedMail} changeMailLanguage={changeMailLanguage} handleAreaChange={handleAreaChange} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={1} divided className="height-50 auto-flow">
                            <Grid.Column>
                                {/*previewMail() */}
                                <h2> Vista previa </h2>
                                <PreviewMail content={this.state.selectedMailContent?this.state.selectedMailContent:''}/>
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Button secondary className="logout-button" onClick={logout}>Logout</Button> 
                </div>
        );
    }
}
function mapStateToProps(state){
    return { mailList: state.mailList }
}
//export default connect(mapStateToProps)(mainSection);
//export default connect(mapStateToProps, { fetchPosts  })(mainSection);
//    export default reduxForm({
//    validate,
//    form: 'PostsNewForm'
//})(
//    connect(null, { createPost })(PostsNew)
//);

export default connect(mapStateToProps, { getMailList, logout })(mainSection);
    