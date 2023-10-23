/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';

import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import InputDropdown from '@components/Library/InputDropdown';
import InputText from '@components/Library/InputText';
import { dataProcessingMethods } from '@constants/cubesConstants';
import { useCubes } from '@hooks/Cubes';
import { useExplore } from '@hooks/Explore';
import { fontWeight, margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Else, If, Then } from 'react-if';
import { Dimmer, Loader, Segment, Form as SemanticForm } from 'semantic-ui-react';
import CubeDashboardExploreFilterItemBulkForm from './CubeDashboardExploreFilterItemBulkForm';

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

function CubeDashboardExplore() {
  const [showFilter, setShowFilter] = useState(false);
  const { cube } = useCubes();
  const { columns, isLoadingColumns, isLoadingExplore, fetchColumnsHandler } = useExplore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchColumnsHandler(cube);
  }, [cube, fetchColumnsHandler]);

  // useEffect(() => {
  //   if (showExplore) {
  //     fetchExploreHandler('silo_11');
  //   }
  // }, [fetchExploreHandler, showExplore]);

  const charts = useMemo(() => ['heatmap', 'line', 'waterfall', 'psd'], []);

  return (
    <Dimmer.Dimmable
      as={Segment}
      blurring
      dimmed={isLoadingExplore}
      className={`${css({ minHeight: 250, overflow: 'initial' })}`}
    >
      <Dimmer active={isLoadingExplore}>
        <Loader inline="centered" />
      </Dimmer>

      <SemanticForm.Group widths="equal">
        <SemanticForm.Field>
          <InputText
            name="name"
            key="name"
            placeholder="name"
            label={t('Name')}
            disabled={false}
            fluid
            required
          />
        </SemanticForm.Field>
        <SemanticForm.Field>
          <InputDropdown
            name="chart"
            key="chart"
            arrayOptions={charts}
            placeholder="chart"
            label={t('Chart')}
            disabled={false}
            fluid
            selection
            required
            search
          />
        </SemanticForm.Field>

        <SemanticForm.Field>
          <InputDropdown
            name="processing_method"
            key="processing_method"
            label={t('Select Processing Method')}
            arrayOptions={dataProcessingMethods}
            placeholder="Operation"
            disabled={false}
            fluid
            selection
            required
            search
          />
        </SemanticForm.Field>

        <SemanticForm.Field>
          <InputDropdown
            name="select"
            key="select"
            label={t('Dimension')}
            arrayOptions={columns ?? []}
            loading={isLoadingColumns}
            placeholder="Dimension"
            disabled={false}
            fluid
            selection
            required
            search
          />
        </SemanticForm.Field>
      </SemanticForm.Group>

      <If condition={showFilter}>
        <Then>
          <FieldArray name="filter" component={CubeDashboardExploreFilterItemBulkForm} />
        </Then>
        <Else>
          <Button
            pill
            color="primary"
            icon="icon-plus"
            className={`${css(margin.bottomSm)}`}
            onClick={() => {
              setShowFilter(true);
            }}
          >
            {t('Filter')}
          </Button>
        </Else>
      </If>
      <div>
        <Button color="success" pill type="submit">
          {t('Add to dashboard')}
        </Button>
      </div>
    </Dimmer.Dimmable>
  );
}

export default CubeDashboardExplore;
