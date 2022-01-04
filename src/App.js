import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Chat } from './components/Chat';
import { Account } from './components/Account';



class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Routes>
                        <Route exact path='/home' componant={Home} />
                        <Route path='/login' componant={Login} />
                        <Route path='/register' componant={Register} />
                        <Route path='/chat' componant={Chat} />
                        <Route path='/account' componant={Account} />
                    </Routes>
                </Router>

            </React.Fragment>
        )
    }
}


export default App;
