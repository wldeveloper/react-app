import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import MBHeader from './mbHeader.js';
import MBFooter from './mbFooter.js';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import MBList from './mbList.js';

class MBIndex extends React.Component{
    render() {
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true

        }

        return (
                <div>
                    <MBHeader></MBHeader>
                    <Tabs>
                        <TabPane tab="头条" key="1">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" alt="" /></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt="" /></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt="" /></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt="" /></div>
                                </Carousel>
                            </div>
                            <MBList count={20} type="top"></MBList>
                        </TabPane>
                        <TabPane tab="社会" key="2">
                            <MBList count={20} type="shehui"></MBList>
                        </TabPane>
                        <TabPane tab="国内" key="3">
                            <MBList count={20} type="guonei"></MBList>
                        </TabPane>
                        <TabPane tab="国际" key="4">
                            <MBList count={20} type="guoji"></MBList>
                        </TabPane>
                        <TabPane tab="娱乐" key="5">
                            <MBList count={20} type="yule"></MBList>
                        </TabPane>
                    </Tabs>
                    <MBFooter></MBFooter>
                </div>
        )
    }
}

export default MBIndex;






