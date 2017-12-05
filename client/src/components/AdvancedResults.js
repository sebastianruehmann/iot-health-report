import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import gateway from '../images/gateway.svg';
import sensor from '../images/sensor.svg';
import propTypes from 'prop-types';

const AdvancedResults = ({ data, errors }) => {
  const columns = [{
    Header: '',
    id: 'type',
    accessor: acc => acc.items[0].type,
    Cell: props => {
      if(props.value === "gateway") {
        return <img src={gateway} width="50px" />;
      }
      if(props.value === "sensor") {
        return <img src={sensor} width="50px" />;
      }
    }
  }, {
    Header: 'Popularity count',
    accessor: 'count'
  }, {
    Header: 'ID',
    accessor: 'id',
    Cell: props => <h3>{props.value}</h3>
  }, {
    Header: 'Last week popularity',
    accessor: 'popularityComparison'
  }];

  return (
    <div className="Results">
      {!errors &&
        <ReactTable
          data={data}
          columns={columns}
        />
      }
      {errors}
    </div>
  );
}

AdvancedResults.propTypes = {
  data: propTypes.array,
  errors: propTypes.string
};

export default AdvancedResults;
