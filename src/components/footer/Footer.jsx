import React, { useContext } from 'react';
import uniqid from "uniqid";
import PropTypes from "prop-types";
import StatisticContext from "../../context/footerContext";
import isWeekend from "date-fns/isWeekend";

export const Footer = ({lastDayOfCurrentMonth}) =>{
  const { teamStatisticList } = useContext(StatisticContext);
  const fillCurrentMonthStats = (lastDayOfCurrentMonth, statisticList) =>  {
    return [...Array(lastDayOfCurrentMonth.getDate()).keys()].map((elemIndex) => {
      const iDate = new Date(
        lastDayOfCurrentMonth.getFullYear(),
        lastDayOfCurrentMonth.getMonth(),
        elemIndex + 1
      );
      if (isWeekend(iDate)) {
        return '';
      }
      if (statisticList.has(elemIndex)) {
        return statisticList.get(elemIndex);
      }
      return 0;
    });
  }
  const filterStatisticList = (teamStatisticList) => {
    const filteredStatisticList = new Map();
    Array.from(teamStatisticList.values()).forEach((userStat) => {
      Array.from(userStat).forEach((indexElement) => {
        if (filteredStatisticList.has(indexElement)) {
          filteredStatisticList.set(indexElement, filteredStatisticList.get(indexElement) + 1);
        }else {
          filteredStatisticList.set(indexElement, 1);
        }
      })
    });
    return filteredStatisticList;
  }
  const filteredStatisticList = filterStatisticList(teamStatisticList);
  const currentMonthStats = fillCurrentMonthStats(lastDayOfCurrentMonth, filteredStatisticList)

  return (
    <tfoot>
    <tr className="teamsFooter">
      <td className="footerHeader">Day-Person Stats</td>
      { currentMonthStats.map((sum) => {
        return <td className="footerCell" key={ uniqid() }>{ sum }</td>
      }) }
      <td className="footerCell" />
    </tr>
    </tfoot>
  );
}
Footer.propTypes = {
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired
}
