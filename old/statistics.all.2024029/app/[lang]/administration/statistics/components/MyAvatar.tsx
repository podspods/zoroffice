import { GridRenderCellParams } from '@systran/react-components/lib/organisms/Table/Table';
import { Statistic } from './statisticsType';
import { Avatar } from '@mui/material';

export type MyAvatarProps = {
  username: string;
};
export default function MyAvatar({ ...props }: MyAvatarProps) {

  stringAvatar()

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function nameToColor(name: string): string {
    let colorNumber = 1;
    name.split('').map((char) => {
      colorNumber = colorNumber * (char.charCodeAt(0) + 1);
      console.log('char.charCodeAt(0) ==>', char.charCodeAt(0), colorNumber);
      return char.charCodeAt(0);
    });
    const sanitizedNumber = colorNumber % 0xffffff;

    const hexString = sanitizedNumber.toString(16).padStart(6, '0');
    console.log('name ==>', name);
    console.log('sanitizedNumber ==>', sanitizedNumber);
    console.log('hexString ==>', hexString);
    return `#${hexString.toUpperCase()}`;
  }

  function initial(name: string): string {
    const arrayName = name.toUpperCase().split(' ');
    if (!arrayName) return 'JD'; // john doe
    if (arrayName.length === 1) return arrayName[0][0];

    return `${arrayName[0][0]}${arrayName[1][0]}`;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: nameToColor(name)
      },
      children: initial(name)
    };
  }
  // const name = 'ada lovelace';
  // const toto = {
  //   sx: {
  //     bgcolor: stringToColor(name)
  //   },
  //   children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  // };

  return (
    <>
      <Avatar {...stringAvatar(props.username)} />
    </>
  );
}
