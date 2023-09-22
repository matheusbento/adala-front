import { useCallback, useEffect } from 'react';

import InputCheckbox from '@/components/Library/InputCheckbox';
import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import { useSilo } from '@hooks/Silos';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { Form as SemanticForm } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import { siloActionLabel } from 'constants/silosConstants';

import { fontWeight, margin } from 'utils/themeConstants';

import { useCategory } from '@/hooks/Category';
import InputDropdown from '@/components/Library/InputDropdown';

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

function SilosForm() {
  const { t } = useTranslation();
  const { showModal, setFormState, isLoadingSave, formState } = useSilo();

  const { fetchAllCategoriesHandler, categories } = useCategory();

  useEffect(() => {
    fetchAllCategoriesHandler();
  }, [fetchAllCategoriesHandler]);

  const valid = true;

  useEffect(() => {
    document.getElementsByClassName('dimmer')[0].id = 'dimmer';
    animateScroll.scrollTo(0, { containerId: 'dimmer' });
  }, [formState]);

  const setFormSiloFolderState = useCallback(() => {
    setFormState('form');
  }, [setFormState]);

  const submitAndDontSaveTemplate = useCallback(() => {
    // change('should_save_template', false);
    setFormState('preview');
  }, [setFormState]);

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

        <InputText name="name" placeholder="Enter Name" />
      </SemanticForm.Field>
      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Description')}
        </Header>

        <InputTextArea name="description" placeholder="Enter Description" />
      </SemanticForm.Field>

      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <InputCheckbox name="is_dataflow" text={t('Is dataflow?')} />
      </SemanticForm.Field>

      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Data Category')}
        </Header>

        <InputDropdown
          name="category_id"
          key="category_id"
          laravelOptions={categories}
          placeholder="Category"
          disabled={false}
          fluid
          selection
          required
          search
        />
      </SemanticForm.Field>
      <SemanticForm.Group>
        <Button
          color="success"
          fluid
          pill
          loading={isLoadingSave}
          // onClick={!valid ? null : submitAndDontSaveTemplate}
          disabled={isLoadingSave}
          type="submit"
        >
          {t(showModal ? `${siloActionLabel[showModal]} Silo` : 'Loading')}
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

export default SilosForm;
