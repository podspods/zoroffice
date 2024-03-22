'use client';

import { useState } from 'react';
import TableDefault from './components/TableDefault';
import { statCategory } from './components/statisticsType';
import TableUserView from './components/TableUserView';
import TableGroupView from './components/TableGroupView';

/**
 *
 * 1) select a statistic type one of statCategory: string[] = ['User', 'Group', 'Profil', 'Session', 'Global'];
 * 2) loop over statCategory. if category = category select => then display the table
 * where to put data for each category
 *
 *
 */

export default function AdministrationStatisticsUser() {
  const [typeStat, setTypeStat] = useState<number>(0);

  const onChangeTypeStat = (typeStat: string) => {

    setTypeStat(statCategory.indexOf(typeStat));
  };

  return <>{displayTable(typeStat, onChangeTypeStat)}</>;
}

function displayTable(typeStat: number, onChange: (statName: string) => void) {
  switch (typeStat) {
    case 0:
      return (
        <TableUserView
          name={`Table UserView : ${typeStat}`}
          onChangeTypeStat={onChange}
        />
      );
    case 1:
      return (
        <TableGroupView
          name={`Table Group : ${typeStat}`}
          onChangeTypeStat={onChange}
        />
      );
    default:
      return (
        <TableDefault
          name={`Table Default : ${typeStat}`}
          onChangeTypeStat={onChange}
        />
      );
  }
}
