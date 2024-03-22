import TextField from '@systran/react-components/lib/atoms/TextField';

export type StatTextFieldProps = {
  id?: string;
  label?: string;
  value?: string | number;
};
export default function StatTextField({
  id = '0',
  label = '',
  value = '',
  ...props
}: StatTextFieldProps) {
  return (
    <>
      <TextField
        id={id}
        label={label}
        value={value}
        sx={{ width: '8rem', paddingRight: '-2rem' }}
        InputProps={{
          readOnly: true,
          style: {
            // padding: '9px 0 8px 0',
            maxWidth: '100px'
          }
        }}
      />
    </>
  );
}
