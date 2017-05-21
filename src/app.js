import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import PCIndex from './js/components/pcIndex.js';
import MBIndex from './js/components/mbIndex.js';
import PCNewsDetail from './js/components/pcNewsDetail.js';
import MBNewsDetail from './js/components/mbNewsDetail.js';
import PCUserCenter from './js/components/pcUserCenter.js';
import MBUserCenter from './js/components/mbUserCenter.js';
import MediaQuery from 'react-responsive';

// pc样式
import './css/pc.scss';
import './css/mb.scss';

class App extends React.Component{
    render() {
        return (
            <div>
               <MediaQuery query='(min-device-width:1224px)'>
                 <Router>
                    <div>
                      <Route exact path="/" component={PCIndex}></Route>
                      <Route path="/details/:uniquekey" component={PCNewsDetail}></Route>
                      <Route path="/usercenter" component={PCUserCenter}></Route>
                    </div>
                 </Router>
               </MediaQuery>
               <MediaQuery query='(max-device-width:1224px)'>
                 <Router>
                    <div>
                      <Route exact path="/" component={MBIndex}></Route>
                      <Route path="/details/:uniquekey" component={MBNewsDetail}></Route>
                      <Route path="/usercenter" component={MBUserCenter}></Route>
                    </div>
                 </Router>
               </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(<App></App>,document.getElementById('root'))




