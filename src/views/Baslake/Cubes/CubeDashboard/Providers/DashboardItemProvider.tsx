/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { css } from 'glamor';
import Button from '@/components/Library/Button';
import SvgIcon from '@/components/Library/SvgIcon';
import { display, flex, padding } from '@/utils/themeConstants';
import { Link } from 'react-router-dom';
import { Card, Menu } from 'semantic-ui-react';

function DashboardItemProviderDropdown({ itemId }: any) {
  // console.log({ itemId });
  const dashboardItemProviderDropdownMenu = useMemo(() => {
    console.log({ itemId });
    return (
      <Menu>
        <Menu.Item>
          <Link to={`/explore?itemId=${itemId}`}>Edit</Link>
        </Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    );
  }, [itemId]);

  return (
    <div className={`${css(display.flex, flex.justifyContentEnd, padding.xxs)}`}>
      <Button link color="default">
        <SvgIcon path="icon-close" />
      </Button>
    </div>
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
      <DashboardItemProviderDropdown itemId={itemId} />
      {children}
    </Card>
  );
}
export default DashboardItemProvider;
