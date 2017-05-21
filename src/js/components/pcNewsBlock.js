import React from 'react';
import { Row, Col, Menu, Icon, message, Tabs, Form, Input, Button, CheckBox, Modal, Carousel, Card} from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const TabPane = Tabs.TabPane;

class PCNewsBlock extends React.Component{
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
                <li key={index}>
                    <Link to={`/details/${item.uniquekey}`} target="_blank">
                        {item.title}
                    </Link>
                </li>
            )) : '没有加载任何新闻！';

        return (
                <div className="topNewsList">
                    <Card>
                        <ul>
                            {newsList}
                        </ul>
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

export default PCNewsBlock;