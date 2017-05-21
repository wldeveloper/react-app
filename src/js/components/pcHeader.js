import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        current:'toutiao',
        modalVisible:false,
        action:'login',
        hasLogined:false,
        userNickName:'',
        userid:0
      }
      this.setModalVisible = this.setModalVisible.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.callback = this.callback.bind(this);
      this.logout = this.logout.bind(this);
    }

    componentWillMount() {
      if (localStorage.userid != '') {
        this.setState({
          hasLogined:true,
          userid:localStorage.userid,
          userNickName:localStorage.userNickName
        })
      }
    }

    logout() {
      localStorage.userid = '';
      localStorage.userNickName = '';
      this.setState({
        hasLogined:false
      })
    }

    setModalVisible(bool) {
      this.setState({
        modalVisible:bool
      })
    }

    callback(key) {
      if (key == 1) {
        this.setState({action: 'login'});
      } else if (key == 2) {
        this.setState({action: 'register'});
      }
    }

    handleSubmit(e) {
      // 页面向API提交数据
      e.preventDefault();
      var myFetchOptions = {
        method:'GET'
      }
      var formData = this.props.form.getFieldsValue();
      
      console.log(formData)
           

      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+ this.state.action +"&username="+ formData.username +"&password="+ formData.password +"&r_userName=" + formData.r_username + "&r_password="
      + formData.r_password + "&r_confirmPassword="
      + formData.r_confirm, myFetchOptions).then(response => response.json()).then(json => {
        console.log(json)
        
        this.setState({
          userNickName:json.NickUserName,
          userid:json.UserId
        })
        console.log(localStorage)
             
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;

        if (this.state.action == "login") {
          this.setState({
            hasLogined:true
          })
        }
        console.log(this.state)
             
      })

      message.success('请求成功');
      this.setModalVisible(false);

    }

    handleClick(e) {
      if (e.key === 'register') {
        this.setState({
          current:'register'
        })
        this.setModalVisible(true)
      } else {
        this.setState({
          current:e.key
        })
      }
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const loginedEle = <Menu.Item key="logout" className="logout">
                            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                            &nbsp;&nbsp;
                            <Link to={`#/usercenter`} className="person-center" target="_blank">
                              <Button type="dashed" htmlType="button">个人中心</Button>
                            </Link>
                            &nbsp;&nbsp;
                            <Button type="ghost" htmlType="button" onClick={this.logout}>退出</Button>
                            </Menu.Item>;
        const loginEle = <Menu.Item key="register" className="register">
                           <Icon type="appstore"></Icon>注册/登录
                          </Menu.Item>;
        const userShow = this.state.hasLogined ? loginedEle : loginEle;

        return (
          <Router>
            <header className='header'>
              <Row>
                <Col span={2}></Col>
                <Col span={4}>
                  <a href="" className="logo">
                    <img src="./src/images/logo.png" alt="logo" />
                    <span>ReactNews</span>
                  </a>
                </Col>
                <Col span={16}>
                  <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                    <Menu.Item key="toutiao">
                      <Icon type="appstore"/>头条
                    </Menu.Item>
                    <Menu.Item key="shehui">
                      <Icon type="appstore"/>社会
                    </Menu.Item>
                    <Menu.Item key="guonei">
                      <Icon type="appstore"/>国内
                    </Menu.Item>
                    <Menu.Item key="guoji">
                      <Icon type="appstore"/>国际
                    </Menu.Item>
                    <Menu.Item key="tiyu">
                      <Icon type="appstore"/>体育
                    </Menu.Item>
                    <Menu.Item key="keji">
                      <Icon type="appstore"/>科技
                    </Menu.Item>
                    {userShow}
                  </Menu>
                  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel = {() => this.setModalVisible(false)} onOk = {() => this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={this.callback}>
                      <TabPane tab="登录" key="1">
                        <Form layout="horizontal" onSubmit = {this.handleSubmit}>
                          <FormItem label="账户">
                            {getFieldDecorator('username', {
                              rules: [{ required: true, message: 'Please input your username!' }],
                              })
                            (
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" />
                            )}
                          </FormItem>
                          <FormItem label="密码">
                            {getFieldDecorator('password', {
                              rules: [{ required: true, message: 'Please input your password!' }],
                              })
                            (
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的密码" />
                            )}
                          </FormItem>
                          <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                      </TabPane>
                      <TabPane tab="注册" key="2">
                        <Form layout="horizontal" onSubmit = {this.handleSubmit}>
                          <FormItem label="账户">
                            {getFieldDecorator('r_username', {
                              rules: [{ required: true, message: 'Please input your username!' }],
                              })
                            (
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" />
                            )}
                          </FormItem>
                          <FormItem label="密码">
                            {getFieldDecorator('r_password', {
                              rules: [{ required: true, message: 'Please input your password!' }],
                              })
                            (
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的密码" />
                            )}
                          </FormItem>
                          <FormItem label="确认密码">
                            {getFieldDecorator('r_confirm', {
                              rules: [{ required: true, message: 'Please input your password!' }],
                              })
                            (
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请确认您的密码" />
                            )}
                          </FormItem>
                          <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                      </TabPane>
                    </Tabs>
                  </Modal>
                </Col>
                <Col span={2}></Col>
              </Row>
              
            </header>

          </Router>
        )
    }
}

const Demo = () => (
    <div>
      hello world!!!
    </div>
  )

export default PCHeader = Form.create()(PCHeader);





