import React, { Component } from 'react';
import './App.css';
import { 
        Container, 
        Form, 
        Grid, 
        Table, 
        TextArea 
    } from 'semantic-ui-react'
import PreviewMail from './PreviewMail';
import {UnControlled as CodeMirror} from 'react-codemirror2';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        this.setState({
            mailList: [
                {
                    name: 'mail 1',
                    content: '# Heading<br/>Some **bold** and _italic_ text<br/>By [Jed Watson](https://github.com/JedWatson)'
                },
                {
                    name: 'mail 2',
                    content: '<h1>asasasasasasa</h1>'
                }
            ]
        })
    }
    componentDidMount(){
        this.setState({
            selectedMail: this.state.mailList[0],
            selectedMailContent: this.state.mailList[0].content
        });
    }

    render() {
        const previewMail = () =>{
            if (this.state && this.state.selectedMailContent){
                return (<PreviewMail mail={this.state.selectedMailContent} />)
            }
        }
        const selectMail = (mail) => {

            this.setState({
                selectedMail: mail,
                selectedMailContent: mail.content
            });
        }
        const renderRow = (mail) => {
            return(
                <Table.Row key={this.state.mailList.indexOf(mail)}>
                    <Table.Cell>{mail.name}</Table.Cell>
                    <Table.Cell selectable>
                        <a href="#" onClick={() => { selectMail(mail) }}> Editar </a>
                    </Table.Cell>
                </Table.Row>
            )
        }
        const handleAreaChange = (event) => {
            var newState = this.state.selectedMail;
            newState.content = event.value;
            this.setState({
                selectedMailContent: newState
            })
            
        }
        return (
                <div className="App">
                    <Container> 
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Table basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            { this.state.mailList.map((mail)=>{
                                                return renderRow(mail);
                                            })} 
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form>
                                        <CodeMirror
                                              value={this.state.selectedMail?this.state.selectedMail.content:''}
                                              options={{
                                                mode: 'xml',
                                                lineNumbers: true
                                              }}
                                              onChange={(editor, data, value) => {
                                                handleAreaChange({value});
                                              }}
                                            />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns={1} divided>
                            <Grid.Column>
                                { previewMail() }
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
        );
    }
}

export default App;



    