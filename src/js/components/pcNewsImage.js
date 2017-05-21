import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Carousel, Card} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const TabPane = Tabs.TabPane;

class PCNewsImage extends React.Component{
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
        const styleImage = {
            display:"block",
            width:this.props.imageWidth,
            height:"90px"
        };
        const styleH3 = {
            width:this.props.imageWidth,
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis"
        };
        const {news} = this.state;
        const newsList = news.length ? news.map((item,index) => (
               <div key={index} className="imageblock">
                    <Link to={`/details/${item.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img src={item.thumbnail_pic_s} style={styleImage} alt="" />
                        </div>
                        <div className="custom-card">
                            <h3 style={styleH3}>{item.title}</h3>
                            <p>{item.author_name}</p>
                        </div>
                    </Link>
                </div>
            )) : '没有加载任何新闻！';

        return (
                <div className="topNewsList">
                    <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
                            {newsList}
                    </Card>
                    <Route path="/details/:id" component={Child}></Route>
                </div>
        )
    }
}

const Child = ({match}) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
)

export default PCNewsImage;