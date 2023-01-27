import { useCallback, useEffect, useMemo } from 'react';

import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import { animateScroll } from 'react-scroll';
import { Form as SemanticForm } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import { siloActionLabel } from 'constants/silosConstants';

import { fontWeight, margin } from 'utils/themeConstants';

import SiloFormReviewContainer from './SiloFormReviewContainer';

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

const SilosForm = () => {
  const { showModal, setFormState, isLoadingSave, formState } = useSilos();

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
      {formState === 'form' ? (
        <>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Name
            </Header>

            <InputText name="name" placeholder="Enter Name" />
          </SemanticForm.Field>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Description
            </Header>

            <InputTextArea name="description" placeholder="Enter Description" />
          </SemanticForm.Field>

          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              onClick={!valid ? null : submitAndDontSaveTemplate}
              disabled={isLoadingSave}
              type={!valid ? 'submit' : 'button'}
            >
              {showModal ? `${siloActionLabel[showModal]} Folder` : 'Loading'}
            </Button>
          </SemanticForm.Group>
        </>
      ) : (
        <>
          <SiloFormReviewContainer />
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              type="submit"
            >
              Confirm and Create Silo Folder
            </Button>
          </SemanticForm.Group>
          <SemanticForm.Group>
            <Button
              outline
              color="primary"
              fluid
              pill
              loading={isLoadingSave}
              onClick={setFormSiloFolderState}
              type="button"
            >
              Edit
            </Button>
          </SemanticForm.Group>
        </>
      )}
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
          Cancel
        </Button>
      </SemanticForm.Group>
    </>
  );
};

export default SilosForm;
