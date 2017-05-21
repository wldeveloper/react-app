import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Carousel, Card} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const TabPane = Tabs.TabPane;

class MBList extends React.Component{
    constructor() {
        super();
        this.state = {
            news:''
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method:'GET'
        }

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+ this.props.type +"&count="+ this.props.count,myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news:json}))

    }

    render() {
        const {news} = this.state;
        const newsList = news.length ? news.map((item,index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${item.uniquekey}`} target="_blank">
                        <div className="m_article_img">
                            <img src={item.thumbnail_pic_s} alt={item.title} />
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{item.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{item.realtype}</span>
                                    <span className="m_article_time">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>               
            )) : '没有加载任何新闻！';

        return (
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
        )
    }
}


export default MBList;