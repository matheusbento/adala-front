import { useCallback } from 'react';

import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import { Else, If, Then, When } from 'react-if';
import { Segment as SemanticSegment } from 'semantic-ui-react';

import LayoutLoader from '../../../components/Layout/Loader';
import { padding } from '../../../utils/themeConstants';
import SiloFileFormContainer from './_Form/SiloFileFormContainer';

const styleSegment = css(padding.topNone, padding.xNone);

const SiloFileModal = () => {
  const { showModalFile, isLoadingSave } = useSilos();

  return (
    <SemanticSegment basic className={`${styleSegment}`}>
      <If condition={isLoadingSave}>
        <Then>{() => <LayoutLoader />}</Then>
        <Else>
          {() => (
            <When condition={showModalFile}>
              {() => <SiloFileFormContainer />}
            </When>
          )}
        </Else>
      </If>
    </SemanticSegment>
  );
};

export default SiloFileModal;
