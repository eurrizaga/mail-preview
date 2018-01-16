import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//Actions:
import { 
        Icon,
        Table
    } from 'semantic-ui-react';
class newComponent extends Component {
    constructor(props){ 
    	super(props); 
    	this.state = props; 
    }
    render(){
    	const renderFields = () => {
            if (this.props.mailList){
                return (
                    this.props.mailList.map((mail)=>{
                        return renderRow(mail);
                    })
                )
                       
            }
        }
        const renderRow = (mail) => {
            if (this.props.mailList && this.props.mailList.length)
                return(
                    <Table.Row key={this.props.mailList.indexOf(mail)}>
                        <Table.Cell>{mail.product_name}</Table.Cell>
                        <Table.Cell>{mail.mailroom_template_name}</Table.Cell>
                        <Table.Cell>
                            <Link to={`/mail/${mail.id}`}>
                                <Icon className="edit" link={true}/>
                            </Link>
                            <Icon className="delete" link={true} onClick={this.state.deleteMail}/>
                        </Table.Cell>
                    </Table.Row>
                )
        }
        return (
            <div>
                <h2> Lista de correos </h2>
                <Table basic='very' className="mail-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Template</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {   
                            renderFields()
                        } 
                    </Table.Body>
                </Table>
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
	