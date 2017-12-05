import React, { Component } from 'react';
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import {fetchEvents, fetchDeviceTypes, fetchDeviceStatus} from '../api';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import gateway from '../images/gateway.svg';
import sensor from '../images/sensor.svg';
import NormalResults from '../components/NormalResults';

const initialState = {
  status: "",
  type: "",
  availableTypes: [],
  availableStatus: [],
  selectedDay: null,
  devices: [],
  fetching: false
}
class DevicesOverviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillMount() {
    this.fetchOptions();
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.type !== this.state.type || nextState.status !== this.state.status || nextState.selectedDay !== this.state.selectedDay) {
      this.fetchEventsWithOptions(nextState);
    }
  }
  async fetchEventsWithOptions(options) {
    let devices = initialState.devices;
    this.setState({ fetching: true });

    devices = await fetchEvents({
      filter: {
        type: options.type,
        status: options.status
      },
      end_date: moment(options.selectedDay).toISOString(),
      start_date: moment(options.selectedDay).subtract(30, 'days').toISOString(),
      group: 'day',
      sort: 'timestamp'
    });
    this.setState({
      devices,
      fetching: false
    });
  }
  async fetchOptions() {
    this.setState({
      availableTypes: await this.formatOptions(fetchDeviceTypes()),
      availableStatus: await this.formatOptions(fetchDeviceStatus())
    });
  }
  formatOptions = async fetchData => {
    let data = [];
    try {
      data = await fetchData;
      return data.map(item => {
        return {
          value: item,
          label: item
        };
      });
    } catch(e) {
      return [];
    }
  }
  onChangeType = (type) => {
    this.setState({
      type: type.value
    });
  }
  onChangeStatus = (status) => {
    this.setState({
      status: status.value
    });
  }
  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }
  message() {
    if(this.state.fetching) {
      return "Fetching devices..."
    }
    return false;
  }
  render() {
    return (
      <div className="DevicesOverviewPage">
        <h2>Devices Overview</h2>
        <DayPicker month={new Date(2017, 4)} selectedDays={this.state.selectedDay} onDayClick={this.handleDayClick} />
        <Select name="types" value={this.state.type} onChange={this.onChangeType} options={this.state.availableTypes} />
        <Select name="status" value={this.state.status} onChange={this.onChangeStatus} options={this.state.availableStatus} />
        {this.message()}
        {Object.keys(this.state.devices).map(date => (
          <div className="DevicesOverviewPage-day" key={date}>
            <h3>{ moment(date).format('L') }</h3>
            <NormalResults data={this.state.devices[date]} />
          </div>
        ))}
      </div>
    );
  }
}

export default DevicesOverviewPage;
