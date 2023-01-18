import { useCallback, useEffect, useMemo } from 'react';

import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import Header from '@components/Library/Header';
import InputDatepicker from '@components/Library/InputDatepicker';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { useCubes } from '@hooks/Cubes';
import { beautifyJson } from '@utils/formatting';
import { css } from 'glamor';
import { useFormContext } from 'react-hook-form';
import { animateScroll } from 'react-scroll';
import { Form as SemanticForm } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import { cubeActionLabel } from 'constants/cubesConstants';

import { fontWeight, margin, padding } from 'utils/themeConstants';

import CubesFormReviewContainer from './CubesFormReviewContainer';
import CubeMetadataItemBulkForm from './Metadatas/CubeMetadataItemBulkForm';
// import CubesNotesForm from 'views/Vms/Cubes/CubesNotesForm';

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

const CubesForm = () => {
  const { cube, showModal, setFormState, isLoadingSave, formState } =
    useCubes();

  const { watch, setValue } = useFormContext();

  const isNewOrder = useMemo(() => showModal === 'new', [showModal]);

  const isEditOrder = useMemo(() => showModal === 'edit', [showModal]);

  // todo

  const valid = true;

  useEffect(() => {
    document.getElementsByClassName('dimmer')[0].id = 'dimmer';
    animateScroll.scrollTo(0, { containerId: 'dimmer' });
  }, [formState]);

  const setFormJobOrderState = useCallback(() => {
    setFormState('form');
  }, [setFormState]);

  const submitAndSaveTemplate = useCallback(() => {
    // change('should_save_template', true);
    setFormState('preview');
  }, [setFormState]);

  const submitAndDontSaveTemplate = useCallback(() => {
    // change('should_save_template', false);
    setFormState('preview');
  }, [setFormState]);

  const onCancel = useCallback(() => {
    console.log('äsdasdasdasd');
  }, []);

  const values = useMemo(() => watch(), [watch()]);

  const onChangeJson = useCallback(
    (model: string) => {
      if (model) {
        setValue('model', beautifyJson(model));
      }
    },
    [values, watch('model')]
  );

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
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Cube Info
            </Header>
            <SemanticForm.Group widths="equal">
              <SemanticForm.Field>
                <InputDatepicker
                  label="Start Date"
                  name="start_date"
                  // onChange={setSelectedStartDate}
                  // isOutsideRange={ousideRangeHandle}
                  required
                />
              </SemanticForm.Field>

              <SemanticForm.Field>
                <InputDatepicker
                  label="End Date"
                  name="end_date"
                  placeholder="-"
                  // isOutsideRange={(day) =>
                  //   moment(selectedStartDate).add('days', 1) > day
                  // }
                  // onChange={setSelectedEndDate}
                  // disabled={selectedContractLengthId !== -1}
                  // required={selectedContractLengthId === -1}
                  // {...(selectedContractLengthId !== -1 && {
                  //   input: { value: endDate },
                  // })}
                />
              </SemanticForm.Field>
            </SemanticForm.Group>
          </SemanticForm.Field>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              JSON Model
            </Header>

            <InputTextArea
              name="model"
              placeholder="Enter JSON Model"
              onChange={onChangeJson}
            />
          </SemanticForm.Field>
          {/* <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Aggregations
            </Header>

            <FieldArray
              name="aggregations"
              component={CubeAggregationItemBulkForm}
            />
          </SemanticForm.Field> */}
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Metadata
            </Header>

            <FieldArray name="metadata" component={CubeMetadataItemBulkForm} />
          </SemanticForm.Field>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Requirements
            </Header>

            {/* <SemanticForm.Field>
              <ReduxInputDropdown
                label="Licenses"
                name="job_licenses"
                loading={cube.loadingQualifications}
                fluid
                multiple
                selection
                search
                laravelOptions={cube.licenses}
              />
            </SemanticForm.Field>
            <SemanticForm.Field>
              <ReduxInputDropdown
                label="Certifications"
                name="job_certifications"
                loading={cube.loadingQualifications}
                fluid
                multiple
                selection
                search
                laravelOptions={cube.certifications}
              />
            </SemanticForm.Field>
            <SemanticForm.Field>
              <ReduxInputDropdown
                label="Skills / Experience"
                name="job_skills"
                loading={cube.loadingQualifications}
                fluid
                multiple
                selection
                search
                laravelOptions={cube.skills}
              />
            </SemanticForm.Field>
            <SemanticForm.Field>
              <ReduxInputDropdown
                label="Preferred Qualifications - Certifications"
                name="preferred_qualifications.certifications"
                loading={cube.loadingQualifications}
                fluid
                multiple
                selection
                search
                laravelOptions={cube.certifications}
              />
            </SemanticForm.Field>
            <SemanticForm.Field>
              <ReduxInputDropdown
                label="Preferred Qualifications - Skills / Experience"
                name="preferred_qualifications.skills"
                loading={cube.loadingQualifications}
                fluid
                multiple
                selection
                search
                laravelOptions={cube.skills}
              />
            </SemanticForm.Field> */}
          </SemanticForm.Field>
          {/* <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Order Description
            </Header>
            <SemanticForm.Field className={`${styleBox}`}>
              <InputTextArea
                name="description"
                placeholder="Enter Description"
              />
            </SemanticForm.Field>
          </SemanticForm.Field> */}
          {/* {!isEditOrder && ( */}
          {/* <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
              <Header as="h5" className={`${styleTitle}`}>
                Order Notes
              </Header>
              <div className={`${styleBox}`}>
                Notes/....[TODO]
                <FieldArray name="notes" component={CubesNotesSemanticForm} />
              </div>
            </SemanticForm.Field> */}
          {/* )} */}
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
              {showModal ? `${cubeActionLabel[showModal]} Order` : 'Loading'}
            </Button>
          </SemanticForm.Group>
          {isNewOrder && (
            <SemanticForm.Group>
              <Button
                outline
                color="primary"
                fluid
                pill
                loading={isLoadingSave}
                onClick={!valid ? null : submitAndSaveTemplate}
                type={!valid ? 'submit' : 'button'}
              >
                <SvgIcon
                  path="icon-arrow-circle-right-line"
                  size="md"
                  className={`${styleMr}`}
                />
                Post Order and Save as Template
              </Button>
            </SemanticForm.Group>
          )}
        </>
      ) : (
        <>
          <CubesFormReviewContainer />
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              type="submit"
            >
              Confirm and Create Cube
            </Button>
          </SemanticForm.Group>
          <SemanticForm.Group>
            <Button
              outline
              color="primary"
              fluid
              pill
              loading={isLoadingSave}
              onClick={setFormJobOrderState}
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

export default CubesForm;
