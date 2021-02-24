import React, { useState, useEffect } from 'react';
import { data } from "../../context/data";
import { CalendarBody } from '../calendarBody';
import classNames from 'classnames';
import isWeekend from 'date-fns/isWeekend';
import { format } from 'date-fns';
import uniqid from "uniqid";
import PropTypes from "prop-types";
import { FooterProvider } from "../../context/footerContext";
import { Footer } from "../footer";

export function Calendar({ lastDayOfCurrentMonth, toggleLoadingState, toggleFormVisibility }) {
  const [departmentTeams, setDepartmentTeams] = useState({
    teams: [],
    users: [],
    vacations: []
  });

  useEffect(() => {
    const getTeamsData = () => {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify([data]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }
    setTimeout(() => {
      getTeamsData()
        .then((response) => response.json())
        .then((dataObj) => {
          if(Object.keys(dataObj).length !== 0) {
            setDepartmentTeams(dataObj[0]);
            toggleLoadingState();
          }
        })
        .catch(error => console.log(new Error(error.message)));
    }, 3000)
  }, [toggleFormVisibility, toggleLoadingState]);
  const getDepartmentsInfoByName = (dataName) => {
    return departmentTeams[dataName];
  }
  const getTeamsNodeById = (dataName, id) => {
    return departmentTeams[dataName].find((element) => {
      return id === element.id;
    });
  }
  const CalendarHeader = () => {
    return (
      <thead>
      <tr className="outputCalendar">
        <td className="addVacationCell outputItem ">
          <button className="addVacationBtn"
                  onClick={ toggleFormVisibility }><span>+</span>Add Vacation</button>
        </td>
        { [...Array(lastDayOfCurrentMonth.getDate()).keys()].map((element) => {
          const iDate = new Date(
            lastDayOfCurrentMonth.getFullYear(),
            lastDayOfCurrentMonth.getMonth(),
            ++element);
          return <HeaderDayCell cellDate={ iDate } key={ uniqid() }/>
        }) }
        <td className="sumCell outputItem"><span className="calendar__text">Sum</span></td>
      </tr>
      </thead>
    );
  }
  const HeaderDayCell = (props) => {
    const { cellDate } = props;

    const headerDayCellClassName = classNames(
      'outputItem',
      { weekend: isWeekend(cellDate) }
    );
    return (
      <td className={ headerDayCellClassName }>
        <span className="outputDay">{ format(cellDate, 'iiiiii') }</span>
        <br />
        <span className="outputDate">{ cellDate.getDate() }</span>
      </td>
    );
  }

  return (
    <section className="calendar">
      <table className="calendar__table">
        <FooterProvider lastDayOfCurrentMonth={ lastDayOfCurrentMonth }>
          <CalendarHeader/>
          { getDepartmentsInfoByName('teams').map((team) => {

            return <CalendarBody
              teamId={ team.id }
              lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
              getDepartmentsInfoByName={ getDepartmentsInfoByName }
              getTeamsNodeById={ getTeamsNodeById }
              key={ team.id }/>
          }) }
          <Footer lastDayOfCurrentMonth={ lastDayOfCurrentMonth }/>
        </FooterProvider>
      </table>
    </section>
  );
}
Calendar.propTypes = {
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
  toggleLoadingState: PropTypes.func.isRequired
}
