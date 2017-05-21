import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import PCHeader from './pcHeader.js';
import PCFooter from './pcFooter.js';
import PCContainer from './pcContainer.js';

class PCIndex extends React.Component{
    render() {
        return (
                <div>
                    <PCHeader></PCHeader>
                    <PCContainer></PCContainer>
                    <PCFooter></PCFooter>
                </div>
        )
    }
}

export default PCIndex;






