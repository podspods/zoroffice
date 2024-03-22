import {useTranslation} from 'react-i18next';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {TComputingNodeDependency} from './types';
import ComputingNodeDepsList from './ComputingNodeDepsList';

export default function ComputingNodeFlow({dependencies}: {dependencies: TComputingNodeDependency[]}) {
  const {t} = useTranslation();
  return (
    <div>
      {dependencies && (
        <PropertyLine label={t('Dependencies')}>
          <ComputingNodeDepsList dependencies={dependencies} />
        </PropertyLine>
      )}
    </div>
  );
}
