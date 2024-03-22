
import React from 'react';
import PageTitle from '@/components/PageTitle';
import { PAGE_NAME } from './services.constant';
import SimpleTable from '@systran/react-components/lib/organisms/table/SimpleTable';
import { columnList } from './services.column';
import { styled } from '@mui/material';
import { ExpandService } from './components/ZExpandService';
import jsonData from './data/AdministrationServerManagementServices.json'; // fake data for testing
import {useTranslation} from 'react-i18next';

export default function AdministrationServerManagementServices() {
  const {t} = useTranslation();
  const rowList = jsonData.services;
  // export const statusList = getStatusList( jsonData.services);
  return (
    <PageContainer>
      <PageTitle>{t(PAGE_NAME)}</PageTitle>
      <SimpleTable
        columns={columnList}
        rows={rowList}
        pagination
        showCellVerticalBorder
        showColumnVerticalBorder
        checkboxSelection
        getDetailPanelContent={ExpandService}
      />
    </PageContainer>
  );
}

const PageContainer = styled('div')({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  height: 'fit-content'
});
