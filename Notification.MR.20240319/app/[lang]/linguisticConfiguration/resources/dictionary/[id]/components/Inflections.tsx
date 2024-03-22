import Typography from '@mui/material/Typography';

export type Props = {
  inflections: string;
}

export default function InflectionsContent({inflections}: Props) {
  return (<>
    {inflections.split('/').map((inflection) =>
      <Typography>{inflection}</Typography>
    )}
  </>);
}
