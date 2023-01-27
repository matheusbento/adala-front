import { useCallback } from 'react';

import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import { Else, If, Then, When } from 'react-if';
import { Segment as SemanticSegment } from 'semantic-ui-react';

import LayoutLoader from '../../../components/Layout/Loader';
import { padding } from '../../../utils/themeConstants';
import SiloFolderFormContainer from './_Form/SiloFolderFormContainer';

const styleSegment = css(padding.topNone, padding.xNone);

const SiloFolderModal = () => {
  const { showModal, isLoadingSaveSiloFolder } = useSilos();

  return (
    <SemanticSegment basic className={`${styleSegment}`}>
      <If condition={isLoadingSaveSiloFolder}>
        <Then>{() => <LayoutLoader />}</Then>
        <Else>
          {() => (
            <When condition={showModal}>
              {() => <SiloFolderFormContainer />}
            </When>
          )}
        </Else>
      </If>
    </SemanticSegment>
  );
};

export default SiloFolderModal;
