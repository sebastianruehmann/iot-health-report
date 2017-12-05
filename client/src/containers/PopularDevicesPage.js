import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { fetchDevices } from '../api';
import moment from 'moment';
import Results from '../components/AdvancedResults';

class PopularDevicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      devices: [],
      fetching: false
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if(this.state.selectedDay !== nextState.selectedDay) {
      this.fetchDevicesWithOptions(nextState);
    }
  }
  async fetchDevicesWithOptions(options) {
    let devices = [];
    let lastDevices = [];
    this.setState({ fetching: true });

    devices = await fetchDevices({
      end_date: moment(options.selectedDay).toISOString(),
      start_date: moment(options.selectedDay).toISOString(),
      sort: 'popular',
      limit: 10
    });

    lastDevices = await fetchDevices({
      end_date: moment(options.selectedDay).subtract(7, "days").toISOString(),
      start_date: moment(options.selectedDay).subtract(7, "days").toISOString(),
      sort: 'popular'
    });

    this.setDevices(devices, lastDevices);
  }
  setDevices(devices, lastDevices) {
    devices.map(device => {
      device.oldCount = 0;
      lastDevices.forEach(lastDevice => {
        if(device.id === lastDevice.id) {
          device.oldCount = lastDevice.count;
        }
      });
      device.popularityComparison = this.calculatePopularityComparison(device.oldCount, device.count) + '%';

      return device;
    });

    this.setState({ fetching: false, devices });
  }
  calculatePopularityComparison(oldCount, count) {
    return (oldCount / count * 100).toFixed(2);
  }
  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }
  message() {
    if(!this.state.selectedDay) {
      return "Please select a day to show popular devices";
    }
    if(this.state.devices.length === 0 && !this.state.fetching) {
      return "There seems to be no occurrence changes on the selected day";
    }
    if(this.state.fetching) {
      return "Fetching devices..."
    }
    return false;
  }
  render() {
    return (
      <div className="PopularDevicesPage">
        <h2>Popular Devices</h2>
        <DayPicker
          month={new Date(2017, 4)}
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        {!this.message() &&
          <div>
            <h3>{ moment(this.state.selectedDay).format('L') }</h3>
          </div>
        }

        <Results data={this.state.devices} errors={this.message()} />
      </div>
    );
  }
}

export default PopularDevicesPage;
