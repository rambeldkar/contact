import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import List from "./components/contacts/ListContact";
import Add from "./components/contacts/AddContact";
import Edit from "./components/contacts/EditContact";
import "./App.css";
const { Header, Content, Sider } = Layout;
function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} style={{minHeight: '91vh'}} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item icon={<UserOutlined />} title="Contact" key="1"><Link  to="/">Contact</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item ><Link  to="/">Contacts</Link></Breadcrumb.Item>
              <Breadcrumb.Item>Lists</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}>
              <Switch>
                <Route exact path="/">
                  <List />
                </Route>
                <Route path="/add">
                  <Add />
                </Route>
                <Route path="/edit/:id">
                  <Edit />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}
export default App;