import React, { useContext, useEffect } from 'react';
import uniqid from "uniqid";
import isWeekend from "date-fns/isWeekend";
import classNames from 'classnames';
import PropTypes from "prop-types";
import StatisticContext from "../../context/footerContext";

export const DayCells = ({filteredVacationsForCurrentMonth,lastDayOfCurrentMonth,userId})=> {
  const { teamStatisticList ,setTeamStatisticList } = useContext(StatisticContext)
  let vacationSum = 0;
  const currentUserVacationIndexes = new Set();
  useEffect(() => {
    setTeamStatisticList(teamStatisticList);
  }, [teamStatisticList ,setTeamStatisticList]);

  const createDayCells = (filteredVacationsForCurrentMonth, lastDayOfCurrentMonth) => {
    const dayCells = [];
    [...Array(lastDayOfCurrentMonth.getDate()).keys()].forEach((indexElem) => {
      const iDate = new Date(
        lastDayOfCurrentMonth.getFullYear(),
        lastDayOfCurrentMonth.getMonth(),
        indexElem + 1
      );
      const cellInfo = getCellInfo(iDate, filteredVacationsForCurrentMonth);
      if (cellInfo.isVacation && !cellInfo.isWeekend) {
        currentUserVacationIndexes.add(indexElem);
        ++vacationSum;
      }
      dayCells.push(cellInfo);
    })
    if (currentUserVacationIndexes.size !== 0) {
      teamStatisticList.set(userId, currentUserVacationIndexes);
    }
    addVacationInfoText(dayCells);
    return dayCells;
  };
  const getCellInfo = (date, vacationsFiltered) => {
    const cellDate = date.toISOString();
    const cellInfo = {
      isWeekend: isWeekend(date),
      isVacation: false,
      isUiStart: false,
      isUiEnd: false,
      isPaid: false,
      isTypeText: false,
      isLeftL: false,
      isLeftS: false
    };
    for (const vacationItem of vacationsFiltered) {
      const vacationItemEntries = [...vacationItem.availableDatesList];
      const vacationUiStart = vacationItemEntries[0];
      const vacationUiEnd = vacationItemEntries[vacationItemEntries.length - 1];
      if (vacationItem.availableDatesList.has(cellDate)) {
        cellInfo.isVacation = true;
        if (cellDate === vacationUiStart) {
          cellInfo.isUiStart = true;
        }
        if (cellDate === vacationUiEnd) {
          cellInfo.isUiEnd = true;
        }
        if (!!vacationItem.isPaid) {
          cellInfo.isPaid = true;
        }
      }
    }
    return cellInfo;
  }
  const addVacationInfoText = (dayCells) => {
    let startUiCellIndex;
    let vacationUILength;
    let shift;
    for (let index = 0; index < dayCells.length; ++index) {
      if (!!dayCells[index].isUiStart) {
        startUiCellIndex = index;
      }
      if (!!dayCells[index].isUiEnd) {
        vacationUILength = index - startUiCellIndex;
        if (vacationUILength % 2 === 0) {
          shift = vacationUILength / 2;
          dayCells[startUiCellIndex + shift].isTypeText = true;
          dayCells[startUiCellIndex + shift].isLeftS = true;
        } else {
          shift = (vacationUILength - 1) / 2;
          dayCells[startUiCellIndex + shift].isTypeText = true;
          dayCells[startUiCellIndex + shift].isLeftL = true;
        }
      }
    }
  }
  const calculateVacationClasses = (cellInfo) => {
    return classNames(
      'dayCell',
      {
        weekend: cellInfo.isWeekend,
        'vacation-cell_paid': cellInfo.isVacation  && cellInfo.isPaid,
        'vacation-cell_unpaid': cellInfo.isVacation  && !cellInfo.isPaid,
        'vacation-cell_ui-start': cellInfo.isUiStart,
        'vacation-cell_ui-end': cellInfo.isUiEnd,
        'vacation-cell_type-text': cellInfo.isTypeText,
        'vacation-cell_type-text_left_s': cellInfo.isLeftS,
        'vacation-cell_type-text_left_l': cellInfo.isLeftL
      }
    );
  }

  const dayCells = createDayCells(filteredVacationsForCurrentMonth, lastDayOfCurrentMonth);

  return (
    <>
      { dayCells.map((cellInfo) => {
        const vacationCellClass = calculateVacationClasses(cellInfo);
        return <td className={vacationCellClass} key={uniqid()}/>
      }) }
      <td className="sumOfDaysOff">{ vacationSum }</td>
    </>
  );
}
DayCells.propTypes = {
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
  filteredVacationsForCurrentMonth: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired
}
