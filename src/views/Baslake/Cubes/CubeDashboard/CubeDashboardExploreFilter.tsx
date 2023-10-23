/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import InputText from '@components/Library/InputText';
import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import { useExplore } from '@hooks/Explore';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Dimmer, Loader, Segment, Form as SemanticForm } from 'semantic-ui-react';
import CubeDashboardExploreFilterItemBulkForm from './CubeDashboardExploreFilterItemBulkForm';

function CubeDashboardExploreFilter({ item }: any) {
  const [showFilter, setShowFilter] = useState(false);
  const { cube } = useCubes();
  const { isLoadingExplore, fetchColumnsHandler } = useExplore();
  const { isEditing } = useDashboard();
  const { formState } = useFormContext();

  const { isDirty } = formState;
  const { t } = useTranslation();

  useEffect(() => {
    fetchColumnsHandler(cube);
  }, [cube, fetchColumnsHandler]);

  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const showEdit = useMemo(() => !!isEditing?.[Number(item?.id)], [isEditing, item?.id]);

  return (
    <When condition={!!showEdit}>
      <Dimmer.Dimmable as={Segment} blurring dimmed={isLoadingExplore}>
        <Dimmer active={isLoadingExplore}>
          <Loader inline="centered" />
        </Dimmer>
        {/* <SemanticForm.Field>
          <InputText
            name="resolution"
            key="resolution"
            label={t('Data Resolution')}
            placeholder="Resolution"
            disabled={false}
            fluid
          />
        </SemanticForm.Field> */}
        <FieldArray name="filter" component={CubeDashboardExploreFilterItemBulkForm} />
        <div>
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              type="submit"
              disabled={!isDirty}
              className={`${css(margin.bottomSm)}`}
            >
              {t('Update Filters')}
            </Button>
          </SemanticForm.Group>
        </div>
      </Dimmer.Dimmable>
    </When>
  );
}

export default CubeDashboardExploreFilter;
