import React from 'react';
import PropertyLine from '@systran/react-components/lib/atoms/PropertyLine';
import {displayDate, displayExpiration} from '@systran/react-components/lib/atoms/utils';
import {License} from './LicensesTable';
import TextField from '@mui/material/TextField';

export default function LicenseBox(props: License) {
  return (
    <div>
      <div>
        <PropertyLine label='Product'>
          {props.product}
        </PropertyLine>
      </div>

      {props.coresLimit && <PropertyLine label='Cores Limit'>{props.coresLimit}</PropertyLine>}
      {props.edition && <PropertyLine label='Edition'>{props.edition}</PropertyLine>}

      {props.customerType && <PropertyLine label='Customer Type'>{props.customerType}</PropertyLine>}
      {props.usage && <PropertyLine label='Usage'>{props.usage}</PropertyLine>}
      {props.upgrade && <PropertyLine label='Upgrade'>{props.upgrade}</PropertyLine>}
      {props.hosted && <PropertyLine label='Is Hosted'>{props.hosted}</PropertyLine>}
      {props.activation && <PropertyLine label='Activation Mode'>{props.activation}</PropertyLine>}

      {props.item && <PropertyLine label='Items'>{props.item.join(', ')}</PropertyLine>}
      {props.expiration && <PropertyLine label='Expiration'>{displayExpiration(props.expiration)}</PropertyLine>}
      {props.expireAt && <PropertyLine label='Expires At'>{displayDate(props.expireAt)}</PropertyLine> || null}

      {props.productKey && (
        <PropertyLine label='Product Key'>
          <TextField variant='outlined' multiline disabled fullWidth value={props.productKey} />
        </PropertyLine>
      )
      }
    </div>
  );
}
