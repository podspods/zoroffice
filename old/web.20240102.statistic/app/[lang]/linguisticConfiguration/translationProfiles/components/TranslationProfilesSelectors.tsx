import WarningMessage from '@systran/react-components/lib/atoms/WarningMessage';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {Box} from '@mui/material';
import {Selectors} from '../context/TranslationProfilesAddContext';

type Props = {
  selectors?: Selectors;
  children: React.ReactNode;
  noSelectors?: boolean;
};

export default function TranslationProfilesSelectors(props: Props) {
  if (props.noSelectors || !props.selectors || (!props.selectors.domain && !props.selectors.size && !props.selectors.owner && !props.selectors.tech)) {
    return <WarningMessage text='No selectors' />;
  }

  const {domain, size, owner, tech} = props.selectors;

  return (
    <Box>
      {domain && <PropertyLine label='Domain'>{domain}</PropertyLine>}
      {size && <PropertyLine label='Size'>{size}</PropertyLine>}
      {owner && <PropertyLine label='Owner'>{owner}</PropertyLine>}
      {tech?.name && <PropertyLine label='Technology'>{tech.name}</PropertyLine>}
      {tech?.type && <PropertyLine label='Technology type'>{tech.type}</PropertyLine>}
      {props.children}
    </Box>
  );
}
