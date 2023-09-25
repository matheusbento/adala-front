import InputText from '@components/Library/InputText';
import { Grid } from 'semantic-ui-react';

import Header from '../../../../components/Library/Header';

function OrganizationUserInfoForm() {
  return (
    <>
      <Header as="h4" weight="600">
        Basic Info
      </Header>
      <Grid stretched>
        <Grid.Row stretched>
          <Grid.Column mobile={5} tablet={5} computer={5} widescreen={5}>
            <InputText label="First Name" required type="text" name="name" fluid />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column mobile={10} tablet={10} computer={10} widescreen={10}>
            <InputText required name="email" label="Email" placeholder="Email" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default OrganizationUserInfoForm;
