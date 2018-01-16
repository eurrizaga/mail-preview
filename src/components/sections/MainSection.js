import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
        Container, 
        Grid
    } from 'semantic-ui-react';
import MailTable from '../MailTable';



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
        // this.props.getMailList((response) =>{
        //     console.log(response.data.data);
        //     this.setState({
        //         mailList: response.data.data
        //     })
        // });
    }

    componentDidMount(){
        // this.setState({
        //     selectedMail: this.state.mailList[0],
        //     selectedMailContent: this.state.mailList[0].content
        // });
    }
    selectMail(mail){
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
        var selectedMail = this.state.selectedMail;
        if (selectedMail && !selectedMail.selectedLanguage){
            selectedMail.selectedLanguage = 0;
        }
        return (
                <div className="App height-100">
                    <Container className="height-100 auto-flow" style={{height: '100vh'}}> 
                        <Grid columns={1} divided className="height-50">
                            <Grid.Row className="height-100">
                                <Grid.Column className="auto-flow">
                                    <MailTable selectMail={this.selectMail} mailList={this.props.mailList}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    {/*<Button secondary className="logout-button" onClick={logout}>Logout</Button> */}
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

export default connect(mapStateToProps, { })(mainSection);
    