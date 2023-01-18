import { useCallback } from 'react';

import { css } from 'glamor';
import { Else, If, Then, When } from 'react-if';
import {
  Segment as SemanticSegment,
  Header,
  Grid,
  Dropdown,
  Divider,
} from 'semantic-ui-react';

import { CubeTemplateType } from 'types/CubeTemplateType';

import { useCubes } from '@hooks/Cubes';
import { useCubesTemplate } from '@hooks/CubesTemplate';

import LayoutLoader from '../../../components/Layout/Loader';
import Button from '../../../components/Library/Button';
import Segment from '../../../components/Library/Segment';
import SvgIcon from '../../../components/Library/SvgIcon';
import { styles } from '../../../utils/theme';
import { colors, margin, padding } from '../../../utils/themeConstants';
import CubesDetailsHeader from './CubesDetailsHeader';
import CubesFormContainer from './_Form/CubesFormContainer';

const styleHeader = css({
  '&.ui.header': { fontWeight: '500' },
});

const styleButton = css({
  '&.ui.basic.blue.button': { boxShadow: 'none !important' },
});

const styleTemplates = css({
  color: '#2360A9',
});

const styleSegment = css(padding.topNone, padding.xNone);
const styleTemplate = css(styles.pointer, padding.bottomSm);

const CubesModal = () => {
  const { showModal, isLoadingSave, formState } = useCubes();
  const { selectedTemplate, setSelectedTemplate, cubesTemplates } =
    useCubesTemplate();

  const isNewCube = useCallback(() => showModal === 'new', [showModal]);

  const title = 'TEEST';

  return (
    <SemanticSegment basic className={`${styleSegment}`}>
      <If condition={isLoadingSave}>
        <Then>{() => <LayoutLoader />}</Then>
        <Else>
          {() => (
            <>
              <When
                condition={
                  cubesTemplates?.length > 0 &&
                  selectedTemplate === null &&
                  isNewCube()
                }
              >
                {() => (
                  <Segment box>
                    <Dropdown
                      className="selection"
                      fluid
                      text="What do you want to post?"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Header>New</Dropdown.Header>
                        <Dropdown.Item
                          text="Create Posting - Not from a Saved Template"
                          onClick={() => setSelectedTemplate(true)}
                        />
                        <Dropdown.Divider />
                        <Dropdown.Header>Saved Template</Dropdown.Header>
                        {cubesTemplates.map((item: CubeTemplateType) => (
                          <Dropdown.Item
                            key={item.hash}
                            text={item.title}
                            onClick={() => {
                              setSelectedTemplate(item);
                            }}
                          />
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Header as="h5" className={`${styleHeader}`}>
                      <SvgIcon
                        className={`${css({ verticalAlign: 'bottom' })}`}
                        path="icon-star-line"
                        color={colors.grey}
                        size="md"
                        display="inline"
                      />{' '}
                      Select a Favorite Template
                    </Header>

                    <Grid>
                      <Grid.Row>
                        {cubesTemplates.map((item: CubeTemplateType) => (
                          <Grid.Column
                            key={item.hash}
                            width={8}
                            onClick={() => {
                              setSelectedTemplate(item);
                            }}
                            className={`${styleTemplate}`}
                          >
                            <p>
                              <strong className={`${styleTemplates}`}>
                                {item.title}
                              </strong>
                              <br />
                              {/* {item?.department?.location?.name} <br />
                              {jobOrderTypesEn[item.order_type]} */}
                            </p>
                          </Grid.Column>
                        ))}
                      </Grid.Row>
                    </Grid>
                  </Segment>
                )}
              </When>

              <When condition={showModal}>
                {() => (
                  <>
                    <When condition={selectedTemplate && formState === 'form'}>
                      {() => (
                        <>
                          <Segment borders className={`${styleTemplate}`}>
                            <Button
                              color="blue"
                              basic
                              floated="right"
                              onClick={() => setSelectedTemplate(null)}
                              className={`${styleButton}`}
                            >
                              select another template
                            </Button>
                            <CubesDetailsHeader title={title} />
                          </Segment>
                          <Divider className={`${css(margin.topNone)}`} />
                        </>
                      )}
                    </When>
                    <CubesFormContainer />
                  </>
                )}
              </When>
            </>
          )}
        </Else>
      </If>
    </SemanticSegment>
  );
};

export default CubesModal;
