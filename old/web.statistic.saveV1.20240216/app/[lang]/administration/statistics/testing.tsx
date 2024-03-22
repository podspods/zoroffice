import PageTitle from '@/components/PageTitle';
import FileEditor from '@systran/react-components/lib/molecules/FileEditor';
export type testingProps = {
  arg1: string;
};
export default function testing({ ...props }: testingProps) {
  return (
    <>
      <table style={{ background: 'red' }}>
        <thead>
          <td width={'300px'}>Name</td>
          <td width={'300px'}>Status</td>
          <td>Number of instance</td>
        </thead>
        <tr>
          <td>PTE Data Generic (L) fren</td>
          <td>downloaded</td>
          <td>0</td>
        </tr>
        <tr>
          <td>PTE Data Generic (L) fren</td>
          <td>downloaded</td>
          <td>0</td>
        </tr>
        <tr>
          <td>PTE Data Generic (L) fren</td>
          <td>downloaded</td>
          <td>0</td>
        </tr>
      </table>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '50rem'
          }}
        >
          <div>Name</div>
          <div>Status</div>
          <div>Number of instance</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '50rem'
          }}
        >
          <div>PTE Data Generic (L) fren</div>
          <div>downloaded</div>
          <div>0</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '50rem'
          }}
        >
          <div>PTE Data Generic (L) fren</div>
          <div>downloaded</div>
          <div>0</div>
        </div>
      </div>
    </>
  );
}
