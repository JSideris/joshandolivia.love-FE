import React from 'react';
import './DateWidget.css';

const DateWidget: React.FC = () => {
  return (
    <table className="date-widget-table">
      <tbody>
        <tr>
          <td className="td1">3:45 PM</td>
          <td className="td2">Jan 13</td>
          <td className="td3">2024</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DateWidget;
