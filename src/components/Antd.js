import React from 'react'
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class App extends React.Component {
	state = {
		current: 'mail',
	}
	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}
	render() {
		return (
			<Layout className="asaslayout">
				<Header>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}

						 >
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>

						<Menu.Item key="3" style={{ float: 'right' }}>nav 3</Menu.Item>
						<Menu.Item key="4" style={{ float: 'right' }}>nav 4</Menu.Item>
						<Menu.Item key="5" style={{ float: 'right' }}>nav 5</Menu.Item>
					</Menu>
				</Header>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2016 Created by Ant UED
				</Footer>
			</Layout>
		);
	}
}



export default App
