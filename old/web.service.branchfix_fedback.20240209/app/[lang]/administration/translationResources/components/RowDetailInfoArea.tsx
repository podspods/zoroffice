import {useTranslation} from 'react-i18next';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {LinkInternal} from '@systran/react-components/lib/atoms/Link';
import InternalRoutes from '@/utils/internalRoutes';
import {displayBytes, displayDate} from '@systran/react-components/lib/atoms/utils';
import {TTranslationResource} from './types';

export default function RowDetailInfoArea({
  id,
  name,
  description,
  version,
  size,
  updatedAt,
  insertedAt,
  role,
  service,
  type,
  runnable,
  distrib,
  architecture,
  nbInstances,
  nbInstancesRequested,
  store
}: Omit<TTranslationResource, 'packageDependencies' | 'modelOptions'>) {
  const {t} = useTranslation();
  return (
    <>
      <PropertyLine label='Id'>
        <LinkInternal href={InternalRoutes.translationResource(id)}>{id}</LinkInternal>
      </PropertyLine>
      {name && <PropertyLine label={t('Name')}>{name}</PropertyLine>}
      {description && <PropertyLine label={t('Description')}>{description}</PropertyLine>}
      {version && <PropertyLine label={t('Version')}>{version}</PropertyLine>}
      {size && <PropertyLine label={t('Size')}>{displayBytes(size)}</PropertyLine>}
      {updatedAt && <PropertyLine label={t('Updated At')}>{displayDate(updatedAt)}</PropertyLine>}
      {insertedAt && <PropertyLine label={t('Inserted At')}>{displayDate(insertedAt)}</PropertyLine>}
      {role && <PropertyLine label={t('Role')}>{role}</PropertyLine>}
      {service && <PropertyLine label={t('Service')}>{service}</PropertyLine>}
      {type && <PropertyLine label={t('Type')}>{type}</PropertyLine>}
      <PropertyLine label={t('Runnable')}>{t(runnable ? 'Yes' : 'No')}</PropertyLine>
      {distrib && <PropertyLine label={t('Distribution')}>{distrib}</PropertyLine>}
      {architecture && <PropertyLine label={t('Architecture')}>{architecture}</PropertyLine>}
      {!store && runnable && <PropertyLine label={t('Number of instances')}>{nbInstances}</PropertyLine>}
      {!store && runnable && <PropertyLine label={t('Number of Instances Requested')}>{nbInstancesRequested}</PropertyLine>}
    </>
  );
}
