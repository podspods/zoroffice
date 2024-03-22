import FormEntry from '@systran/react-components/lib/atoms/FormEntry';
import AppAutocomplete from '@systran/react-components/lib/atoms/AppAutocomplete';
import Switch from '@systran/react-components/lib/atoms/ButtonsSpecial/Switch';
import Box from '@mui/material/Box';
import {check} from '@/components/UserAuthorizations';
import {useTranslation} from 'react-i18next';
import useGetGroupListLight from '../hooks/useGetGroupListLight';
import useGetAccountListLight from '../hooks/useGetAccountListLight';
import {ProfileOnChangeOptionsType} from '../context/TranslationProfilesAddContext';
import {actions} from '../../../../../../lib/permissionsList';
import {EleFilters} from 'utils/apis';

type Props = {
  onChange: (event: ProfileOnChangeOptionsType) => void;
  eleFilters?: EleFilters;
  translationResources?: {label: string; value: string}[];
  translationResourceId?: string;
  groups?: string[];
  users?: string[];
  public?: boolean;
};

type UsersGroups = {
  name?: string;
  roles?: string[];
  accounts?: string[];
  id?: string;
  displayName?: string;
  groupIds?: string[];
  current?: boolean;
  value?: string;
  label?: string;
};
function mapIdToName(idArray: string[], groupsArray: UsersGroups[]) {
  return idArray.map((id) => {
    const group = groupsArray.find((group) => group.id === id || group.value === id);
    return {value: id, label: group ? group.name || group.displayName || group.label : 'Unknown'};
  });
}
const typedActions = actions as any; // TODO: Because actions is in js file in lib can not change it to type script now. May be we have to fix this later.

export default function TranslationProfilesManagePermissions({translationResources = [], translationResourceId, groups = [], users = [], public: publicProp = false, ...props}: Props) {
  const {t} = useTranslation();
  const {data: dataGroupListLight} = useGetGroupListLight();
  const {data: dataGroupAccountLight} = useGetAccountListLight({eleFilters: props.eleFilters});

  const hasProfilePublic = check(typedActions.PROFILES_CONFIG_PUBLIC);
  const hasListUsersPermission = check([typedActions.LIST_USERS, typedActions.LIST_SELF_USERS]);
  const hasListGroupsPermission = check([typedActions.LIST_GROUPS, typedActions.LIST_SELF_GROUPS]);

  const usersSelected = mapIdToName(users, dataGroupAccountLight);
  const groupsSelected = mapIdToName(groups, dataGroupListLight);

  return (
    <>
      {translationResources.length > 0 && (
        <FormEntry label='Translation Resource'>
          <AppAutocomplete
            disableClearable
            disabled={translationResources.length <= 1}
            // placeholder={t('Translation Resource')}
            noOptionsText={t('No results found')}
            options={translationResources}
            value={translationResourceId}
            onChange={(translationResource) => props.onChange({translationResourceId: (translationResource as NonNullable<{value: string; label: string | undefined}>).value})}
          />
        </FormEntry>
      )}
      {hasProfilePublic && (
        <FormEntry label='Public'>
          <Box display='flex' alignItems='center'>
            <span style={{fontWeight: 'bold'}}>{t('No')}</span>
            <Switch style={{marginLeft: '10px', marginRight: '10px'}} onChange={(value) => props.onChange({public: value})} value={publicProp} />
            <span style={{fontWeight: 'bold'}}>{t('Yes')}</span>
          </Box>
        </FormEntry>
      )}

      {!publicProp && (
        <>
          <FormEntry label='Users'>
            <AppAutocomplete
              multiple
              disabled={!hasListUsersPermission}
              // placeholder={t('Users')}
              options={dataGroupAccountLight}
              value={usersSelected}
              onChange={(value) => props.onChange({users: (value as NonNullable<{value: string; label: string | undefined}>[]).map((user: UsersGroups) => user.value as string)})}
            />
          </FormEntry>
          <FormEntry label='Groups'>
            <AppAutocomplete
              multiple
              disabled={!hasListGroupsPermission}
              // placeholder={t('Groups')}
              options={dataGroupListLight}
              value={groupsSelected}
              onChange={(value) => props.onChange({groups: (value as NonNullable<{value: string; label: string | undefined}>[]).map((group: UsersGroups) => group.value as string)})}
            />
          </FormEntry>
        </>
      )}
    </>
  );
}
