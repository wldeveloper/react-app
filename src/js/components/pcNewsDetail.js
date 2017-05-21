import React,{ Component } from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Carousel, Card, BackTop} from 'antd';
import PCNewsImage from './pcNewsImage.js';
import PCHeader from './pcHeader.js';
import PCFooter from './pcFooter.js';
import CommonComments from './commonComments.js';


class PCNewsDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newsItem:''
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            methods:'GET'
        }

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.match.params.uniquekey,myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({
                newsItem:json
            })
            document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
        })
    }

    createMarkup() {
        return {__html:this.state.newsItem.pagecontent}
    }

    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImage count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
                <BackTop />
            </div>
        )
    }
}

export default PCNewsDetail;