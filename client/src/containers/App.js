import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import PopularDevicesPage from './PopularDevicesPage';
import DevicesOverviewPage from './DevicesOverviewPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trend reports @ Kiwi</h1>
          <nav>
            <ul>
              <li><Link to='/'>#1 View: Popular Devices</Link></li>
              <li><Link to='/devices'>#2 View: Devices Overview</Link></li>
            </ul>
          </nav>
        </header>
        <div className="App-content">
          <Switch>
            <Route exact path='/' component={PopularDevicesPage}/>
            <Route path='/devices' component={DevicesOverviewPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
