import { useCallback, useEffect, useMemo, useState, ReactNode } from 'react';

import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import FileIcon from '@components/Library/FileIcon';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import InputDatepicker from '@components/Library/InputDatepicker';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import Segment from '@components/Library/Segment';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import {
  fileStatus,
  statusColor,
  statusLabel,
} from '@constants/silosConstants';
import { useCubes } from '@hooks/Cubes';
import { useOrganizations } from '@hooks/Organizations';
import { useSilos } from '@hooks/Silos';
import { beautifyJson } from '@utils/formatting';
import { display } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Else, When, Then, If } from 'react-if';
import { animateScroll } from 'react-scroll';
import { Dropdown, Form as SemanticForm, Step } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import TextEllipsis from 'components/Library/TextEllipsis';

import { cubeActionLabel, lastStep, steps } from 'constants/cubesConstants';

import { parseFileSize, toggleValueInArray } from 'helpers/index';

import FileType from 'types/FileType';
import SiloFileType from 'types/SiloFileType';
import { SiloType } from 'types/SiloType';
import TagType from 'types/TagType';

import { fontWeight, margin, padding } from 'utils/themeConstants';

import { statusIcon } from '../../../../constants/silosConstants';
import { colors } from '../../../../utils/themeConstants';
import CubesFormReviewContainer from './CubesFormReviewContainer';
import CubeMetadataItemBulkForm from './Metadatas/CubeMetadataItemBulkForm';

// import CubesNotesForm from 'views/Vms/Cubes/CubesNotesForm';

const styleMr = css(margin.rightSm);

const styleSteps = css({ width: '100% !important' });

const styleButton = css({
  '&.ui.basic.blue.button': { boxShadow: 'none !important' },
});

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

const styleFiles = css(margin.topMd, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

const CubesForm = () => {
  const { cube, showModal, setFormState, isLoadingSave, formState } =
    useCubes();

  const { organization } = useOrganizations();

  const { fetchSilosHandler, silos, files, fetchSiloHandler } = useSilos();

  const { t } = useTranslation();

  const { watch, setValue } = useFormContext();

  const isNewOrder = useMemo(() => showModal === 'new', [showModal]);

  const isEditOrder = useMemo(() => showModal === 'edit', [showModal]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [folder, setFolder] = useState(null);

  useEffect(() => {
    fetchSiloHandler(
      silos.find((e: SiloType) => e.id === folder) as unknown as SiloType,
      { all: true, status: fileStatus.ready_for_use }
    );
  }, [folder]);

  const rows = useMemo(
    () =>
      files?.map((item: SiloFileType) => {
        const file = item.file as FileType;
        return [
          {
            id: item.id,
            status: item.status,
          },
          <div className={`${css(display.flex)}`} key={item.id}>
            <FileIcon mimeType={file.mime} size={40} />

            <div className={`${css(margin.leftXs)}`}>
              <div className={`${css({ fontWeight: 600 })}`}>{item.name}</div>
              <div className={`${css({ color: colors.greyLabel })}`}>
                {parseFileSize(file?.size)}
              </div>
            </div>
          </div>,
          item.description,
          <TextEllipsis count={item.tags?.length} key={`${item.id}-tags`}>
            {item.tags?.map((tag: TagType) => tag.name).join(', ')}
          </TextEllipsis>,
          <div key={`${item.id}-owner`}>
            <div>{item.owner?.name}</div>
            <div>{moment(item?.created_at).format('MMMM D, YYYY')}</div>
          </div>,
        ];
      }),
    [files]
  );

  const [formStep, setFormStep] = useState<number>(0);

  useEffect(() => {
    fetchSilosHandler(null, { all: true });
  }, [organization]);

  const foldersOptions = useMemo(
    () =>
      silos.map((e: SiloType) => ({
        text: e.name,
        value: e.id,
      })),
    [silos]
  );

  // todo

  const valid = true;

  useEffect(() => {
    document.getElementsByClassName('dimmer')[0].id = 'dimmer';
    animateScroll.scrollTo(0, { containerId: 'dimmer' });
  }, [formState]);

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

  const headers = useMemo(
    () => [
      {
        label: 'Name',
        key: 'name',
        sortable: false,
        // style: `${css({
        //   minWidth: 300,
        //   maxWidth: 0,
        //   wordBreak: 'break-word',
        // })}`,
      },
      {
        label: 'Description',
        key: 'description',
        sortable: false,
        style: `${css({
          minWidth: 150,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: 'Tags',
        key: 'tags_count',
        sortable: false,
        style: `${css({ minWidth: 150, maxWidth: 0 })}`,
      },
      {
        label: 'Added',
        key: 'created_at',
        sortable: false,
      },
      { label: '', key: 'actions', sortable: false },
    ],
    []
  );

  const onChangeJson = useCallback(
    (model: string) => {
      if (model) {
        setValue('model', beautifyJson(model));
      }
    },
    [values, watch('model')]
  );

  const renderSubmitControls = useCallback<any>(
    () => (
      <>
        {/* <SemanticForm.Group>
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
                </SemanticForm.Group> */}
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
            {showModal ? `${cubeActionLabel[showModal]} Cube` : 'Loading'}
          </Button>
        </SemanticForm.Group>
        <When condition={isNewOrder}>
          {() => (
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
                Create Cube and Save as Template
              </Button>
            </SemanticForm.Group>
          )}
        </When>
        <SemanticForm.Group>
          <Button
            color="greyLight"
            fluid
            pill
            loading={isLoadingSave}
            onClick={() => setFormStep(formStep - 1)}
            disabled={isLoadingSave}
            type={!valid ? 'submit' : 'button'}
          >
            {showModal ? `Previous` : 'Loading'}
          </Button>
        </SemanticForm.Group>
      </>
    ),
    [isLoadingSave, valid, showModal, isNewOrder]
  );

  const renderControls = useCallback<any>(
    () => (
      <>
        <SemanticForm.Group>
          <Button
            color="success"
            fluid
            pill
            loading={isLoadingSave}
            onClick={() => setFormStep(formStep + 1)}
            disabled={isLoadingSave}
            type={!valid ? 'submit' : 'button'}
          >
            {showModal ? `Next` : 'Loading'}
          </Button>
        </SemanticForm.Group>
        <When condition={formStep > 0}>
          <SemanticForm.Group>
            <Button
              color="greyLight"
              fluid
              pill
              loading={isLoadingSave}
              onClick={() => setFormStep(formStep - 1)}
              disabled={isLoadingSave}
              type={!valid ? 'submit' : 'button'}
            >
              {showModal ? `Previous` : 'Loading'}
            </Button>
          </SemanticForm.Group>
        </When>
      </>
    ),
    [isLoadingSave, valid, formStep, showModal]
  );

  const handleBulkAction = useCallback((key: any) => {
    setSelectedFiles(
      Array.isArray(key) ? key : toggleValueInArray(selectedFiles, key)
    );
  }, []);

  // eslint-disable-next-line no-console
  console.log(selectedFiles);

  return (
    <>
      {formState === 'form' && (
        <>
          <Step.Group ordered stackable="tablet" className={`${styleSteps}`}>
            <Step
              active={formStep === steps.details}
              completed={formStep > steps.details}
            >
              <Step.Content>
                <Step.Title>Details</Step.Title>
                <Step.Description>Set your cube details</Step.Description>
              </Step.Content>
            </Step>

            <Step
              active={formStep === steps.files}
              completed={formStep > steps.files}
              disabled={formStep < steps.files}
            >
              <Step.Content>
                <Step.Title>Files</Step.Title>
                <Step.Description>Choose the files to analyse</Step.Description>
              </Step.Content>
            </Step>

            <Step
              active={formStep === steps.mapping}
              completed={formStep > steps.mapping}
              disabled={formStep < steps.mapping}
            >
              <Step.Content>
                <Step.Title>{t('Mapping')}</Step.Title>
                <Step.Description>Map your data</Step.Description>
              </Step.Content>
            </Step>

            <Step
              active={formStep === steps.confirm}
              completed={formStep > steps.confirm}
              disabled={formStep < steps.confirm}
            >
              <Step.Content>
                <Step.Title>Confirm</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          <When condition={formStep === steps.details}>
            {() => (
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

                  <InputTextArea
                    name="description"
                    placeholder="Enter Description"
                  />
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
                    Metadata
                  </Header>

                  <FieldArray
                    name="metadata"
                    component={CubeMetadataItemBulkForm}
                  />
                </SemanticForm.Field>
              </>
            )}
          </When>
          <When condition={formStep === steps.files}>
            {() => (
              <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
                <Header as="h5" className={`${styleTitle}`}>
                  {t('Folders')}
                </Header>

                <Dropdown
                  fluid
                  selection
                  name="folders"
                  placeholder="Select folders name"
                  options={foldersOptions}
                  onChange={(_: any, vals: any) => {
                    setFolder(vals.value);
                  }}
                />

                <When condition={files?.length}>
                  {() => (
                    <>
                      <Header as="h5" className={`${styleFiles}`}>
                        {t('Files')}
                      </Header>
                      <BaslakeTable
                        bulk
                        className={`${css(padding.topXs)}`}
                        headers={headers}
                        data={rows}
                        rows={rows}
                        alignNested="left"
                        highlightNested
                        highlightParentRow
                        selectedRows={selectedFiles}
                        bulkActionsHandler={handleBulkAction}
                        condensed
                      />
                    </>
                  )}
                </When>
              </SemanticForm.Field>
            )}
          </When>
          <When condition={formStep === lastStep}>
            {() => <CubesFormReviewContainer />}
          </When>
          <When condition={formStep === lastStep}>
            {() => renderSubmitControls()}
          </When>
          <When condition={formStep !== lastStep}>
            {() => renderControls()}
          </When>
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
