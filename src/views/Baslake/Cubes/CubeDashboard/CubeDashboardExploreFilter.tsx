/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';

import Button from '@components/Library/Button';
import FieldArray from '@components/Library/FieldArray';
import InputText from '@components/Library/InputText';
import { useCubes } from '@hooks/Cubes';
import { useExplore } from '@hooks/Explore';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Accordion, Dimmer, Icon, Loader, Form as SemanticForm } from 'semantic-ui-react';
import CubeDashboardExploreFilterItemBulkForm from './CubeDashboardExploreFilterItemBulkForm';

function CubeDashboardExploreFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const { cube } = useCubes();
  const { isLoadingExplore, fetchColumnsHandler } = useExplore();
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

  return (
    <Dimmer.Dimmable as={Accordion} blurring dimmed={isLoadingExplore}>
      <Dimmer active={isLoadingExplore}>
        <Loader inline="centered" />
      </Dimmer>

      <Accordion fluid styled>
        <Accordion.Title active={open} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          {t('Update')}
        </Accordion.Title>
        <Accordion.Content active={open} className={`${css(margin.sm)}`}>
          <SemanticForm.Field>
            <InputText
              name="resolution"
              key="resolution"
              label="Data Resolution"
              placeholder="Resolution"
              disabled={false}
              fluid
            />
          </SemanticForm.Field>
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
        </Accordion.Content>
      </Accordion>
    </Dimmer.Dimmable>
  );
}

export default CubeDashboardExploreFilter;
