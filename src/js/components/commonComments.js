import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Card, notification} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comments:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addUserCollection = this.addUserCollection.bind(this);
    }

    componentDidMount() {
        var myFetchOptions = {
            methods:'GET'
        }

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
        .then(response => response.json())
        .then(json => {
                 
            this.setState({
                comments:json
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            methods:'GET'
        }
        var formdata = this.props.form.getFieldsValue();
        console.log(formdata)
             

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+ localStorage.userid +"&uniquekey="+this.props.uniquekey + "&commnet=" + formdata.remark,myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.componentDidMount();
        })

    }

    addUserCollection() {
        var myFetchOptions = {
            methods:'GET'
        }

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey,myFetchOptions)
        .then(response => response.json())
        .then(json => {
            // 收藏成功做一个全局的提醒
            notification['success']({
                message:'ReactNews提醒',
                description:'收藏此文章成功'
            })        
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldProps } = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ? 
        comments.map((comment,index) => (
            <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        '没有加载到任何评论！';


        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form layout="horizontal" onSubmit = {this.handleSubmit}>
                          <FormItem label="您的评论">
                            {getFieldDecorator('remark', {
                              rules: [{ required: true, message: 'Please input your comments!' }],
                              initialValue:''
                              })
                            (
                                <Input type="textarea" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="随便写"/>
                            )}
                          </FormItem>
                          <Button type="primary" htmlType="submit">提交评论</Button>
                          &nbsp;&nbsp;
                          <Button type="primary" htmlType="button" onClick={this.addUserCollection}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);