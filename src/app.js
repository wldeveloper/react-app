import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './js/components/pcIndex.js';
import MBIndex from './js/components/mbIndex.js';
import MediaQuery from 'react-responsive';

// pc样式
import './css/pc.scss';
import './css/mb.scss';

class App extends React.Component{
    render() {
        return (
            <div>
               <MediaQuery query='(min-device-width:1224px)'>
                 <PCIndex></PCIndex>
               </MediaQuery>
               <MediaQuery query='(max-device-width:1224px)'>
                 <MBIndex></MBIndex>
               </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(<App></App>,document.getElementById('root'))




