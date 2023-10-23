/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@components/Library/Button';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { useDashboard } from '@hooks/Dashboard';
import { display, flex, padding } from '@utils/themeConstants';
import { css } from 'glamor';
import { Card, Grid } from 'semantic-ui-react';
import CubeDashboardItemDownload from '../CubeDashboardItemDownload';

function DashboardItemProviderDropdown({ itemId, title }: any) {
  const { deleteDashboardItem, setIsDraggable, setIsEditing } = useDashboard();
  const [showDownloadFormats, setShowDownloadFormats] = useState<number | null>(null);

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
          <div />
        </Grid.Column>
        <Grid.Column className={`${css(display.flex, flex.justifyContentCenter)}`}>
          <Text>{title}</Text>
        </Grid.Column>
        <Grid.Column
          className={`${css(display.flex, flex.justifyContentEnd, padding.xxs, padding.rightSm)}`}
        >
          <CubeDashboardItemDownload
            itemId={itemId}
            open={showDownloadFormats === itemId}
            closeHandler={() => {
              setShowDownloadFormats(null);
            }}
            title={title}
          />
          <Button
            link
            color="default"
            onClick={() => {
              setShowDownloadFormats(itemId);
            }}
          >
            <SvgIcon path="icon-download" />
          </Button>
          <Button
            link
            color="default"
            onClick={() => {
              setIsEditing((prev: any) => ({
                ...prev,
                [itemId]: !prev?.[itemId] ?? false,
              }));
            }}
          >
            <SvgIcon path="icon-edit-line" />
          </Button>
          <Button
            link
            color="default"
            onClick={() => {
              setIsDraggable((prev: any) => ({
                ...prev,
                [itemId]: prev?.[itemId] ?? false,
              }));
            }}
          >
            <SvgIcon path="icon-lock" />
          </Button>
          <Button
            link
            color="default"
            onClick={() => {
              deleteDashboardItem(itemId);
            }}
          >
            <SvgIcon path="icon-close" />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
function DashboardItemProvider({ itemId, children, title }: any) {
  return (
    <Card
      title={title}
      style={{
        height: '100%',
        width: '100%',
        border: '0px !important',
      }}
    >
      <DashboardItemProviderDropdown itemId={`${itemId}`} title={title} />
      {children}
    </Card>
  );
}
export default DashboardItemProvider;
