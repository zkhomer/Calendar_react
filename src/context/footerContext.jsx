import React from 'react';
import compareAsc from 'date-fns/compareAsc';
import PropTypes from "prop-types";

const Context = React.createContext();

export class FooterProvider extends React.Component {
    state = {
      teamStatisticList: new Map()
    }

  componentDidUpdate(prevProps) {
    if (compareAsc(this.props.lastDayOfCurrentMonth, prevProps.lastDayOfCurrentMonth) !== 0) {
      this.setState( {
        teamStatisticList: new Map()
      } );
    }
  }
  setTeamStatisticList = (teamStatisticList) => {
    this.setState({
      teamStatisticList
    });
  }
  render() {
    const { children } = this.props;
    const { teamStatisticList } = this.state;
    const { setTeamStatisticList } = this;

    return (
      <Context.Provider value={{
        teamStatisticList,
        setTeamStatisticList
      }}>
        { children }
      </Context.Provider>
    );
  }
}
FooterProvider.propTypes = {
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
export default Context
