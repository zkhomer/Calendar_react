import React from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

export function MonthSwitcher({ lastDayOfCurrentMonth,updateDate }) {
  const currentMonth = format(lastDayOfCurrentMonth, 'MMMM');
  const currentYear = lastDayOfCurrentMonth.getFullYear();

  const switchMonth = (direction) => {
    let newLastDay = lastDayOfCurrentMonth;
    if (direction === 'previous') {
      newLastDay = new Date(newLastDay.getFullYear(), newLastDay.getMonth(), 0);
    }else if (direction === 'next') {
      newLastDay = new Date(newLastDay.getFullYear(), newLastDay.getMonth() + 2, 0);
    }
    updateDate(newLastDay);
  }

  return (
    <div className="month-switcher">
      <button className="month-switcher__btn" onClick={() => switchMonth('previous')}>
        ←
      </button>
      <span className="month-switcher__month">{ currentMonth } { currentYear }</span>
      <button className="month-switcher__btn" onClick={() => switchMonth('next')}>
        →
      </button>
    </div>
  );
}
MonthSwitcher.propTypes = {
  lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
  updateDate: PropTypes.func.isRequired
}
