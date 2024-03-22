import React from 'react';
import { DisplayLine, DisplayLineProps } from 'app/[lang]/administration/serverManagement/services/components/DisplayLine';


export type DisplayParagrapheProps = {
  lineList: DisplayLineProps[];
};

export function DisplayParagraphe({ ...props }: DisplayParagrapheProps) {

  return (
    <React.Fragment>
      {props.lineList.map((oneLine, index) => {
        return (
          <DisplayLine
            key={index}
            label={oneLine.label}
            status={oneLine.status}
            innerHtml={oneLine.innerHtml}
            value={oneLine.value}
            column={oneLine.column}
            leading={oneLine.leading}
          />
        );
      })}
    </React.Fragment>
  );
}
