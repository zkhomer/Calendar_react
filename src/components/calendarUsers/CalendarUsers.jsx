import React from 'react';
import PropTypes from "prop-types";
import { formatInputToDate } from '../../utils'
import { DayCells } from '../dayCells';
import classNames from 'classnames';

export const CalendarUser = (props) => {
  const {
    userId,
    lastDayOfCurrentMonth,
    getDepartmentsInfoByName,
    getTeamsNodeById,
    isTeamUsersHide
  } = props;
  const user = getTeamsNodeById('users', userId);
  const userVacations = getDepartmentsInfoByName('vacations').filter((vacation) => {
    return userId === vacation.userId;
  });

  const generateCurrentMonthVacationSets = (userVacations, date) => {
    const filteredVacations = [];
    for (const vacationItem of userVacations) {
      const startDate = formatInputToDate(vacationItem.startDate);
      const endDate = formatInputToDate(vacationItem.endDate);
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth());
      const lastDayOfMonth = date;
      const availableDates = {
        availableDatesList: new Set(),
        isPaid: vacationItem.isPaid,
      };
      if (!(endDate < firstDayOfMonth) && !(startDate > lastDayOfMonth)) {
        let currentVacationDate = new Date(startDate.getTime());
        for (
          let index = currentVacationDate.getDate();
          currentVacationDate <= lastDayOfMonth && currentVacationDate <= endDate;
          ++index
        ) {
          currentVacationDate = new Date(startDate.getFullYear(), startDate.getMonth(), index);
          if (firstDayOfMonth <= currentVacationDate && lastDayOfMonth >= currentVacationDate) {
            availableDates.availableDatesList.add(currentVacationDate.toISOString());
          }
          currentVacationDate = new Date(startDate.getFullYear(), startDate.getMonth(), index + 1);
        }
      }
      filteredVacations.push(availableDates);
    }
    return filteredVacations;
  }

  const filteredVacationsForCurrentMonth = generateCurrentMonthVacationSets(userVacations, lastDayOfCurrentMonth);

  return (
    <tr className={ classNames(
      'employeeКRow',
      { hide: isTeamUsersHide }
    )}>
      <td className="nameCell">{ user.name }</td>
      { <DayCells
        filteredVacationsForCurrentMonth={ filteredVacationsForCurrentMonth }
        lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
        userId={ userId }/>
      }
    </tr>
  );
}
CalendarUser.propTypes = {
  userId: PropTypes.number.isRequired,
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
  getDepartmentsInfoByName: PropTypes.func.isRequired,
  getTeamsNodeById: PropTypes.func.isRequired,
  isTeamUsersHide: PropTypes.bool.isRequired
}
