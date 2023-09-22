import { useCallback, useEffect, useMemo, useState } from 'react';

import { useOrganization } from '@/hooks/Organization';
import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import FileIcon from '@components/Library/FileIcon';
import Header from '@components/Library/Header';
import InputDatepicker from '@components/Library/InputDatepicker';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { fileStatus } from '@constants/silosConstants';
import { useCubes } from '@hooks/Cubes';
import { useSilo } from '@hooks/Silos';
import { display } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { map } from 'lodash';
import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Else, If, Then, When } from 'react-if';
import { animateScroll } from 'react-scroll';
import { Divider, Dropdown, Form as SemanticForm, Step } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import TextEllipsis from 'components/Library/TextEllipsis';

import { cubeActionLabel, filterAttributes, lastStep, steps } from 'constants/cubesConstants';

import { parseFileSize, toggleValueInArray } from 'helpers/index';

import FileType from 'types/FileType';
import SiloFileAttributeType, { SiloFileInnerAttributeType } from 'types/SiloFileAttributeType';
import SiloFileType from 'types/SiloFileType';
import { SiloType } from 'types/SiloType';
import TagType from 'types/TagType';

import { fontWeight, margin, padding } from 'utils/themeConstants';

import { colors } from '../../../../utils/themeConstants';
import CubesFormReviewContainer from './CubesFormReviewContainer';
import CubeMetadataItemBulkForm from './Metadatas/CubeMetadataItemBulkForm';
import InputCheckbox from '@/components/Library/InputCheckbox';
import InputDropdown from '@/components/Library/InputDropdown';
import { useCategory } from '@/hooks/Category';

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

function CubesForm() {
  const { cube, showModal, setFormState, isLoadingSave, formState } = useCubes();

  const { organization } = useOrganization();

  const {
    fetchSilosHandler,
    silos,
    files,
    fetchSiloHandler,
    fetchSiloFilesAttributesHandler,
    siloFilesAttributes,
    selectedColumns,
    handleBulkSelectColumn,
    setFolder,
    folder,
  } = useSilo();

  const { t } = useTranslation();

  const { watch } = useFormContext();

  const isNewOrder = useMemo(() => showModal === 'new', [showModal]);

  const { fetchAllCategoriesHandler, categories } = useCategory();

  // const isEditOrder = useMemo(() => showModal === 'edit', [showModal]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    fetchSiloHandler(silos.find((e: SiloType) => e.id === folder) as unknown as SiloType, {
      all: true,
      status: fileStatus.ready_for_use,
    });
  }, [fetchSiloHandler, folder, silos]);

  useEffect(() => {
    fetchAllCategoriesHandler();
  }, [fetchAllCategoriesHandler]);

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
    [files],
  );

  const [formStep, setFormStep] = useState<number>(0);

  useEffect(() => {
    fetchSilosHandler(null, { all: true });
  }, [fetchSilosHandler, organization]);

  const isDataflow = useMemo(() => watch('is_dataflow'), [watch()]);

  const canNext = useCallback(
    (step: number) => {
      const can = {
        [steps.details]: () => true,
        [steps.files]: () => !!folder && (isDataflow || selectedFiles.length),
        [steps.mapping]: () => true,
        [steps.confirm]: () => true,
      };

      return can[step]();
    },
    [folder, isDataflow, selectedFiles.length],
  );

  const foldersOptions = useMemo(
    () =>
      silos.map((e: SiloType) => ({
        text: e.name,
        value: e.id,
      })),
    [silos],
  );

  const setStepHandler = useCallback(
    (s: number) => {
      let step = s;
      if (step === steps.mapping && isDataflow) {
        step = steps.confirm;
      }
      const functions = {
        [steps.details]: () => {},
        [steps.files]: () => {},
        [steps.mapping]: () => {
          fetchSiloFilesAttributesHandler(folder as number, {
            files: selectedFiles,
          });
        },
        [steps.confirm]: () => {},
      };
      console.log({ step });
      functions[step]();
      setFormStep(step);
    },
    [isDataflow, fetchSiloFilesAttributesHandler, folder, selectedFiles],
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

  // const submitAndDontSaveTemplate = useCallback(() => {
  //   // change('should_save_template', false);
  //   setFormState('preview');
  // }, [setFormState]);

  const onCancel = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('äsdasdasdasd');
  }, []);

  // const values = useMemo(() => watch(), [watch()]);

  const getValues = useCallback(
    (file: any, attribute: any) => {
      if (!selectedColumns[file?.id]) {
        return [];
      }
      if (!selectedColumns[file?.id][attribute?.name]) {
        return [];
      }
      return selectedColumns[file?.id][attribute?.name];
    },
    [selectedColumns],
  );

  const headers = useMemo(
    () => [
      {
        label: t('Name'),
        key: 'name',
        sortable: false,
      },
      {
        label: t('Description'),
        key: 'description',
        sortable: false,
        style: `${css({
          minWidth: 150,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: t('Tags'),
        key: 'tags_count',
        sortable: false,
        style: `${css({ minWidth: 150, maxWidth: 0 })}`,
      },
      {
        label: t('Added'),
        key: 'created_at',
        sortable: false,
      },
      { label: '', key: 'actions', sortable: false },
    ],
    [t],
  );

  const headerTableType = useMemo(
    () => [
      {
        label: t('Auto-increment'),
        key: 'auto_increment',
        sortable: false,
        style: `${css({ minWidth: 50 })}`,
      },
      {
        label: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        label: 'Size',
        key: 'size',
        sortable: false,
      },
      {
        label: 'Type',
        key: 'type',
        sortable: false,
      },
    ],
    [t],
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
            // onClick={!valid ? null : submitAndDontSaveTemplate}
            disabled={isLoadingSave && !selectedColumns}
            type={valid ? 'submit' : 'button'}
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
                <SvgIcon path="icon-arrow-circle-right-line" size="md" className={`${styleMr}`} />
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
            onClick={() => setStepHandler(formStep - 1)}
            disabled={isLoadingSave}
            type={!valid ? 'submit' : 'button'}
          >
            {showModal ? `Previous` : 'Loading'}
          </Button>
        </SemanticForm.Group>
      </>
    ),
    [
      isLoadingSave,
      selectedColumns,
      valid,
      showModal,
      isNewOrder,
      submitAndSaveTemplate,
      setStepHandler,
      formStep,
    ],
  );

  const renderControls = useCallback<any>(
    () => (
      <If condition={formStep === steps.confirm}>
        <Then>
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              disabled={isLoadingSave}
              type="submit"
            >
              {t('Submit')}
            </Button>
          </SemanticForm.Group>
        </Then>
        <Else>
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              onClick={() => setStepHandler(formStep + 1)}
              disabled={isLoadingSave || !canNext(formStep)}
              type={!valid ? 'submit' : 'button'}
            >
              {showModal ? t(`Next`) : t('Loading')}
            </Button>
          </SemanticForm.Group>
        </Else>
        <When condition={formStep > 0}>
          <SemanticForm.Group>
            <Button
              color="greyLight"
              fluid
              pill
              loading={isLoadingSave}
              onClick={() => setStepHandler(formStep - 1)}
              disabled={isLoadingSave}
              type={!valid ? 'submit' : 'button'}
            >
              {showModal ? t(`Previous`) : t('Loading')}
            </Button>
          </SemanticForm.Group>
        </When>
      </If>
    ),
    [formStep, isLoadingSave, t, canNext, valid, showModal, setStepHandler],
  );

  const handleBulkAction = useCallback(
    (key: any) => {
      const vals = toggleValueInArray(selectedFiles, key);
      // eslint-disable-next-line no-console
      console.log({ key, selectedFiles, vals });
      setSelectedFiles(Array.isArray(key) ? key : toggleValueInArray(selectedFiles, key));
    },
    [selectedFiles],
  );

  // eslint-disable-next-line no-console
  console.log({ formStep, formState, lastStep });

  return (
    <>
      {formState === 'form' && (
        <>
          <Step.Group ordered stackable="tablet" className={`${styleSteps}`}>
            <Step active={formStep === steps.details} completed={formStep > steps.details}>
              <Step.Content>
                <Step.Title>{t('Details')}</Step.Title>
                <Step.Description>{t('Set your cube details')}</Step.Description>
              </Step.Content>
            </Step>

            <Step
              active={formStep === steps.files}
              completed={formStep > steps.files}
              disabled={formStep < steps.files}
            >
              <Step.Content>
                <Step.Title>{t('Files')}</Step.Title>
                <Step.Description>{t('Choose the files to analyse')}</Step.Description>
              </Step.Content>
            </Step>

            <When condition={!isDataflow}>
              <Step
                active={formStep === steps.mapping}
                completed={formStep > steps.mapping}
                disabled={formStep < steps.mapping}
              >
                <Step.Content>
                  <Step.Title>{t('Mapping')}</Step.Title>
                  <Step.Description>{t('Map your data')}</Step.Description>
                </Step.Content>
              </Step>
            </When>

            <Step
              active={formStep === steps.confirm}
              completed={formStep > steps.confirm}
              disabled={formStep < steps.confirm}
            >
              <Step.Content>
                <Step.Title>{t('Confirm')}</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          <When condition={formStep === steps.details}>
            {() => (
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
                <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
                  <Header as="h5" className={`${styleTitle}`}>
                    {t('Cube Info')}
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
                <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
                  <Header as="h5" className={`${styleTitle}`}>
                    {t('Metadata')}
                  </Header>

                  <FieldArray name="metadata" component={CubeMetadataItemBulkForm} />
                </SemanticForm.Field>
              </>
            )}
          </When>
          <When condition={formStep === steps.files}>
            {() => (
              <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
                <Header as="h5" className={`${styleTitle}`}>
                  {t('Silo')}
                </Header>

                <Dropdown
                  fluid
                  selection
                  name="folders"
                  placeholder={t('Select the silo')}
                  options={foldersOptions}
                  onChange={(_: any, vals: any) => {
                    setSelectedFiles([]);
                    setFolder(vals.value);
                  }}
                  className={`${css(margin.bottomMd)}`}
                />

                <InputCheckbox name="is_dataflow" text={t('Is dataflow?')} />

                <When condition={files?.length && !isDataflow}>
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
          <When condition={formStep === steps.mapping}>
            {() => (
              <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
                <Header as="h5" className={`${styleTitle}`}>
                  {t('Mappings')}
                </Header>

                <When condition={siloFilesAttributes && siloFilesAttributes?.length}>
                  {siloFilesAttributes?.map((file: SiloFileType) => (
                    <>
                      <Header as="h5" className={`${styleFiles}`}>
                        {t('File {{file.name}}', { file })}
                      </Header>
                      {file?.attributes
                        ?.filter((e) => filterAttributes.includes(e.type))
                        .map((attribute: SiloFileAttributeType) => {
                          const body = attribute.attributes?.map(
                            (item: SiloFileInnerAttributeType) => [
                              {
                                id: item.name,
                              },
                              item?.auto_increment ? t('True') : '',
                              item.name,
                              item.size,
                              item.type,
                            ],
                          );
                          const hide = map(
                            attribute.attributes?.filter((e) => e.auto_increment || e.foreign_key),
                            'name',
                          );
                          return (
                            <>
                              <Header as="h5" className={`${styleFiles}`}>
                                {t('Table {{attribute.name}}', { attribute })}
                              </Header>
                              <BaslakeTable
                                bulk
                                key={`${attribute?.name}-${attribute?.type}`}
                                className={`${css(padding.topXs)}`}
                                headers={headerTableType}
                                rows={body}
                                alignNested="left"
                                highlightNested
                                highlightParentRow
                                hideBulkForValues={hide}
                                condensed
                                selectedRows={getValues(file, attribute)}
                                bulkActionsHandler={(items: any) => {
                                  // eslint-disable-next-line no-console
                                  console.log({ items });
                                  handleBulkSelectColumn(file, attribute, items);
                                }}
                              />
                            </>
                          );
                        })}
                      <Divider />
                    </>
                  ))}
                </When>
              </SemanticForm.Field>
            )}
          </When>
          <When condition={formStep === lastStep}>{() => renderSubmitControls()}</When>
          <When condition={formStep !== lastStep}>{() => renderControls()}</When>
        </>
      )}
      <When condition={formStep === lastStep && formState === 'preview'}>
        {() => <CubesFormReviewContainer />}
      </When>
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
}

export default CubesForm;
