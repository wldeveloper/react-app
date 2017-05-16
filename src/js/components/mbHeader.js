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

class MBHeader extends React.Component{
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
      this.login = this.login.bind(this);
    }

    setModalVisible(bool) {
      this.setState({
        modalVisible:bool
      })
    }

    login() {
        this.setModalVisible(true);
    }

    handleSubmit(e) {
      // 页面向API提交数据
      e.preventDefault();
      var myFetchOptions = {
        method:'GET'
      }
      var formData = this.props.form.getFieldsValue();
      
      console.log(formData)
           

      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=username&password=password&r_userName=" + formData.r_username + "&r_password="
      + formData.r_password + "&r_confirmPassword="
      + formData.r_confirm, myFetchOptions).then(response => response.json()).then(json => {
        console.log(json)
             
        this.setState({
          userNickName:json.NickUserName,
          userid:json.userid
        })
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

        const userShow = this.state.hasLogined ? 
        <Link to="">
            <Icon type="inbox"></Icon>
        </Link> : 
        <Icon type="setting" onClick={this.login}></Icon>;
        return (
            <div className="mb-header">
                <header>
                    <img src="./src/images/logo.png" alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel = {() => this.setModalVisible(false)} onOk = {() => this.setModalVisible(false)} okText="关闭">
                  <Tabs type="card">
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
            </div>
        )
    }
}

export default MBHeader = Form.create()(MBHeader);






