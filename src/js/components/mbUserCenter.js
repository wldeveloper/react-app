import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Card, notification,Upload } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import MBHeader from './mbHeader.js';
import MBFooter from './mbFooter.js';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MBUserCenter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            previewImage:'',
            previewVisible:false,
            usercollection:'',
            usercomments:''
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({usercollection:json});
             document.title = "个人中心";
        });

         fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
        .then(response => response.json())
        .then( json =>{
                 
            this.setState({usercomments:json});
        });
    }

    render() {
        const props = {
            action:'http://newsapi.gugujiankong.com/handler.ashx',
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:'picture-card',
            defaultFileList:[
                {
                    uid:-1,
                    name:'xxx.png',
                    state:'done',
                    url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview:(file) => {
                this.setState({
                    previewImage:file.url,
                    previewVisible:true
                })
            }
        }

        const {usercollection} = this.state;
        const usercollectionList = usercollection.length ? 
        usercollection.map((item,index) => (
            <Card key={index} title={item.uniquekey} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
                <p>{item.Title}</p>
            </Card>
        ))
        :
        '您还没有收藏任何的新闻，快去收藏一些新闻吧！';

        const {usercomments} = this.state;
        const usercommentsList = usercomments.length ? 
        usercomments.map((item,index) => (
            <Card key={index} title={`于${item.datetime} 评论了文章 ${item.uniquekey}`} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
                <p>{item.Comments}</p>
            </Card>
        ))
        :
        '您还没有发表过任何评论！';


        return (
            <div>
                <MBHeader />
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus">
                                            <div className="ant-upload-text">
                                                上传照片
                                            </div>
                                        </Icon>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img src={this.state.previewImage} alt="" />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MBFooter />
            </div>
        )
    }
}

export default MBUserCenter;