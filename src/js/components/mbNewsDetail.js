import React,{ Component } from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Carousel, Card, BackTop} from 'antd';
import MBHeader from './mbHeader.js';
import MBFooter from './mbFooter.js';
import CommonComments from './commonComments.js';

class MBNewsDetail extends Component{
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
            <div id="mobileDetailsContainer">
                <MBHeader></MBHeader>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                        </Col>
                    </Row>
                    <MBFooter></MBFooter>
                    <BackTop />
                </div>
            </div>
        )
    }
}

export default MBNewsDetail;