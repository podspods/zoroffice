import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import countedRawData from '../../data/Counted-sample.json';
import uncountedRawData from '../../data/encounted-sample.json';

type PieData = {
  label: string;
  value: number;
};
const myDataChar: PieData[] = Object.entries(countedRawData.groups).map(
  (target) => ({
    value: target[1].nbCharacters,
    label: target[1].groupName
  })
);

const myDataRequest: PieData[] = Object.entries(countedRawData.groups).map(
  (target) => ({
    value: target[1].request,
    label: target[1].groupName
  })
);


// console.log(' dataTarget1Remap 19==>', myDataChar);

const size = {
  width: 600,
  height: 200
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieGlobal() {
  return (
    <>
      <PieChart series={[{ data: myDataChar, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>nbCharacters</PieCenterLabel>
      </PieChart>

      <PieChart series={[{ data: myDataRequest, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>request</PieCenterLabel>
      </PieChart>
    </>
  );
}
