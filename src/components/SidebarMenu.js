import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SidebarMenu = (props) => {
    return (
        <Sidebar as={Menu} animation={props.animation} width='thin' visible={props.visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
                <Link to={`/`}>
                    <Icon name='home' />
                    Dashboard
                </Link>
            </Menu.Item>
            <Menu.Item name='gamepad'>
                <Link to={`/secondary`}>
                    <Icon name='gamepad' />
                    Secundaria
                </Link>
            </Menu.Item>
        </Sidebar>
    )       
}
export default SidebarMenu;
    