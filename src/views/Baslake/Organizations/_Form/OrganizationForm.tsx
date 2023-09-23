import { useCallback } from 'react';

import Button from '@components/Library/Button';
// import DragAndDropUploader from '@components/Library/DragAndDropUploader';
import Header from '@components/Library/Header';
import InputFile from '@components/Library/InputFile';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { useOrganization } from '@hooks/Organization';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Form as SemanticForm } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import { fontWeight, margin } from 'utils/themeConstants';

const styleMr = css(margin.rightSm);

const styleButton = css({
  '&.ui.basic.blue.button': { boxShadow: 'none !important' },
});

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

function OrganizationForm() {
  const { t } = useTranslation();
  const { isLoadingSave } = useOrganization();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('äsdasdasdasd');
  }, []);

  return (
    <>
      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Name')}
        </Header>

        <InputText name="name" placeholder="Enter name" />
      </SemanticForm.Field>
      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Description')}
        </Header>

        <InputTextArea name="description" placeholder="Enter description" />
      </SemanticForm.Field>

      <SemanticForm.Group>
        <Button outline color="primary" fluid pill loading={isLoadingSave} type="submit">
          <SvgIcon path="icon-arrow-circle-right-line" size="md" className={`${styleMr}`} />
          {t('Create')}
        </Button>
      </SemanticForm.Group>

      <SemanticForm.Group>
        <Button
          outline
          color="default"
          fluid
          pill
          loading={isLoadingSave}
          onClick={onCancel}
          type="button"
          className={`${styleButton}`}
        >
          {t('Cancel')}
        </Button>
      </SemanticForm.Group>
    </>
  );
}

export default OrganizationForm;
