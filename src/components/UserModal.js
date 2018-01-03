import React from 'react';
import { Button, Header, Image, Modal, List } from 'semantic-ui-react'
import profilePicture from '../resources/img/a.jpg';
const userModal = ({ user }) => {
    return ( 
        <Modal trigger={<Button>View User info</Button>}>
            <Modal.Header>User Info</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={profilePicture} />
                <Modal.Description>
                    <Header as='h2'>
                        {user.user_name}
                        <Header.Subheader>
                          {user.email}
                        </Header.Subheader>
                    </Header>
                    
                    <h3>Paneles</h3>
                    <List divided verticalAlign='middle'>
                        {
                            user.panels.map((panel) => {
                                return (
                                    <List.Item key={panel.panel_id}>
                                      <Image avatar src='../resources/img/a.jpg' />
                                      <List.Content>
                                        <List.Header as='a' href="http://www.beflick.com" target="_blank">{panel.panel_id} - {panel.panel_name}</List.Header>
                                      </List.Content>
                                    </List.Item>
                                )
                            })
                        }
                                    
                    </List>
                    <p>Teléfono: {user.telephone}</p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
        )
}
export default userModal;
