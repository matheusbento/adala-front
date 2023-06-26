/* eslint-disable react/no-array-index-key */
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SelectCell } from '@components/Baslake/BaslakeTableCells';
import Accordion from '@components/Library/Accordion';
import ModalConfirm from '@components/Library/ModalConfirm';
import Segment from '@components/Library/Segment';
import SortableTableHeader from '@components/Library/SortableTableHeader';
import SvgIcon from '@components/Library/SvgIcon';
import { loading as BaslakeLoading } from '@constants/baslakeTableConstants';
import TypeOf from '@constants/typeOfConstants';
import { colors, display, fontSizes, padding, tables, utils, fontWeight } from '@utils/theme';
import { css } from 'glamor';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { Else, If, Then, When } from 'react-if';
import { Dropdown, Loader } from 'semantic-ui-react';

import BaslakeTableActionItem from './BaslakeTableActionItem';

const styleSegment = css(display.block, utils.w100, padding.bottomMd);
const styleResponsiveContainer = css({
  minWidth: '100%',
  overflowX: 'auto',
  display: 'block',
  whiteSpace: 'nowrap',
  paddingBottom: 50,
});

const styleTableDefault = css(tables.baslake, tables.default, tables.paddingSm, {
  overflow: 'visible',
});

const styleTableLoading = css({
  '& > tbody': { opacity: 0.5 },
});

const styleTableDisabled = css({
  '&': { opacity: 0.5 },
});

const styleTableDataLoading = css({ opacity: 0.5 });

const styleTableHeader = css(padding.ySm, {
  '& > thead > tr > th': {
    verticalAlign: 'middle !important',
  },
});

const styleTableFooter = css(padding.yXxs, {
  '& > tbody > tr > td': {
    verticalAlign: 'middle !important',
    ...padding.yXs,
    ...fontSizes.xs,
  },
});

const styleHeaders = css({
  ...fontSizes.sm,
  lineHeight: '28px',
});

const styleDropdown = css({
  marginLeft: 'auto',
  '& .dropdown.icon': {
    ...display.none,
  },
});

const styleCondensed = css({
  '& > table > thead > tr > th, & > table > tbody > tr > td': {
    ...padding.xXs,
  },
  '& > table > thead > tr > th': {
    ...fontSizes.xs,
    fontWeight: fontWeight.w600,
  },
});

const styleDragging = css({ paddingBottom: 60 });

const useDraggableInPortal = () => {
  const self: any = useRef({}).current;

  useEffect(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    div.style.top = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.zIndex = '10000';
    self.elt = div;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, [self]);

  return (render: any) =>
    (provided: any, ...args: any) => {
      const element = render(provided, ...args);
      if (provided.draggableProps.style.position === 'fixed') {
        return createPortal(element, self.elt);
      }
      return element;
    };
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  background: isDragging ? colors.greyLightest : 'auto',
  ...draggableStyle,
});

export interface BaslakeTableProps {
  headers?: {
    label?: string;
    style?: string;
    key?: string;
    sortable?: boolean;
  }[];
  actions?: any;
  data?: Record<string, any>;
  order?: {
    field: string;
    direction: string;
  };
  nested?: any;
  alignNested?: string;
  alwaysDisplayNested?: boolean;
  selectedRows?: any;
  selectedChildrenRows?: number[];
  rows?: any;
  className?: string;
  noDataMsg?: string | ReactNode;
  dataSortHandler?: any;
  bulk?: boolean;
  bulkDisabled?: boolean;
  highlightNested?: boolean;
  highlightParentRow?: boolean;
  responsive?: boolean;
  condensed?: boolean;
  bulkActionsHandler?: any;
  bulkChildrenActionsHandler?: any;
  loading?: string;
  footer?: ReactNode;
  activeRow?: number;
  onRowClick?: any;
  readyOnlyNest?: boolean;
  disabled?: boolean;
  allCollapsed?: boolean;
  enableDragAndDrop?: boolean;
  onCallBackDragEnd?: any;
  droppableId?: string;
  hideBulkForValues?: string[];
}

function BaslakeTable({
  headers = [],
  selectedRows = [],
  hideBulkForValues = [],
  selectedChildrenRows = undefined,
  data = undefined,
  actions = undefined,
  rows = undefined,
  className = '',
  dataSortHandler = undefined,
  bulk = false,
  bulkDisabled = false,
  responsive = false,
  condensed = false,
  bulkActionsHandler = undefined,
  bulkChildrenActionsHandler = undefined,
  order = undefined,
  noDataMsg = 'No data found',
  loading = undefined,
  nested = undefined,
  alwaysDisplayNested = true,
  highlightParentRow = false,
  highlightNested = false,
  alignNested = 'right',
  footer = undefined,
  activeRow = undefined,
  onRowClick = undefined,
  disabled = false,
  readyOnlyNest = false,
  allCollapsed = false,
  enableDragAndDrop = false,
  onCallBackDragEnd = undefined,
  droppableId = undefined,
}: BaslakeTableProps) {
  const [activeConfirm, setActiveConfirm] = useState<any>(null);
  const [collapsed, setCollapsed] = useState<any>([]);
  const [activeActionRow, setActiveActionRow] = useState<any>(0);
  const [listData, setListData] = useState<any>(rows);
  const [dragging, setDragging] = useState<boolean>(false);
  const setDraggingTrue = useCallback(() => setDragging(true), []);
  const styleDroppable = css(dragging && styleDragging);
  const renderDraggable = useDraggableInPortal();

  useEffect(() => {
    setListData(rows);
  }, [rows]);

  const onDragEnd = useCallback(
    (result: any) => {
      const listSteps = Array.from(listData);
      const [removed] = listSteps.splice(result.source.index, 1);
      listSteps.splice(result.destination.index, 0, removed);

      if (onCallBackDragEnd && result.source.index !== result.destination.index) {
        onCallBackDragEnd(
          data?.[result.source.index] ?? listData?.[result.source.index][0],
          result.destination.index,
          result.source.index,
        );
      }

      setListData(listSteps);
      setDragging(false);
    },
    [listData, onCallBackDragEnd, data],
  );

  const setActiveConfirmFalse = useCallback(() => {
    setActiveConfirm(false);
  }, [setActiveConfirm]);

  const alignmentOn = useCallback((align: string) => alignNested === align, [alignNested]);

  const styleTable = useMemo(
    () =>
      css(
        styleTableDefault,
        loading === BaslakeLoading.pagination && styleTableLoading,
        loading === BaslakeLoading.data && styleTableDataLoading,
        disabled && styleTableDisabled,
      ),
    [disabled, loading],
  );

  const styleActiveRow = useMemo(
    () =>
      css({
        '& td:first-child': {
          borderLeft: `solid 8px ${colors.primary}`,
        },
        cursor: onRowClick ? 'pointer' : 'default',
      }),
    [onRowClick],
  );

  const styleContainer = useMemo(
    () => css(styleSegment, responsive && styleResponsiveContainer, condensed && styleCondensed),
    [condensed, responsive],
  );

  const styleNoActiveRow = useMemo(
    () =>
      css({
        cursor: onRowClick ? 'pointer' : 'default',
      }),
    [onRowClick],
  );

  const styleHighlightParentRow = css({
    '& > td': {
      fontWeight: '600',
    },
  });

  const styleIsDragging = useMemo(() => {
    const childrenIndex = `& > td:first-child, td:nth-child(2) ${
      nested ? ', td:nth-child(3)' : ''
    }`;
    return css({
      '& > td': {
        display: 'none',
      },
      [childrenIndex]: {
        display: 'table-cell',
        verticalAlign: 'middle !important',
        lineHeight: '66px',
        ...padding.xXs,
      },
    });
  }, [nested]);

  const styleHighlightNested = css({
    '& > td:first-child': {
      borderLeft: `solid 4px ${colors.primary}`,
    },
  });

  const styleInactiveRow = useMemo(
    () =>
      css({
        '& > tbody > tr > td:first-child': {
          borderLeft: 'solid 8px white',
        },
        cursor: onRowClick ? 'pointer' : 'default',
      }),
    [onRowClick],
  );

  const styleName = css(padding.topXxs);

  useEffect(() => {
    if (!loading) setActiveActionRow(0);
  }, [loading]);

  const isActionItemActive = useCallback(
    (id: string | number) =>
      loading === BaslakeLoading.actions &&
      (id === activeActionRow || (!activeActionRow && selectedRows.includes(id))),
    [selectedRows, loading, activeActionRow],
  );

  const isSelectedAll = useMemo(
    () => selectedRows && selectedRows?.length === listData?.length && listData?.length !== 0,
    [listData, selectedRows],
  );

  const getRowClass = useCallback(
    (key: string | number, isParent: boolean, isDragging: boolean) => {
      if (isParent) {
        if (activeRow && activeRow === key)
          return isDragging
            ? `active ${styleActiveRow} ${styleIsDragging}`
            : `active ${styleActiveRow}`;
        if (highlightParentRow && nested && key && !!nested[key] && !activeRow)
          return isDragging
            ? `highlighted ${styleHighlightParentRow} ${styleIsDragging}`
            : `highlighted ${styleHighlightParentRow}`;
      }
      if (highlightNested && !isParent)
        return isDragging
          ? `highlight-nested ${styleHighlightNested} ${styleIsDragging}`
          : `highlight-nested ${styleHighlightNested}`;
      if (activeRow === undefined)
        return isDragging ? `${styleNoActiveRow} ${styleIsDragging}` : `${styleNoActiveRow}`;
      return isDragging ? `${styleInactiveRow} ${styleIsDragging}` : `${styleInactiveRow}`;
    },
    [
      activeRow,
      highlightNested,
      highlightParentRow,
      nested,
      styleActiveRow,
      styleHighlightNested,
      styleHighlightParentRow,
      styleInactiveRow,
      styleNoActiveRow,
      styleIsDragging,
    ],
  );

  const handleDataSorting = useCallback(
    (field: string) => {
      dataSortHandler({
        order_by: field,
        direction: order?.direction === 'asc' ? 'desc' : 'asc',
      });
    },
    [dataSortHandler, order],
  );

  const handleBulkActions = useCallback(
    (id: number | string) => {
      bulkActionsHandler(id);
    },
    [bulkActionsHandler],
  );

  const handleBulkChildrenActions = useCallback(
    (id: number | string) => {
      bulkChildrenActionsHandler(id);
    },
    [bulkChildrenActionsHandler],
  );

  const handleSelectAll = useCallback(() => {
    let bulkArray = [];
    if (!isSelectedAll) {
      if (Array.isArray(data)) {
        bulkArray = data.map((i) => i.id);
      }

      if (Array.isArray(listData)) {
        bulkArray = listData.map((i) => {
          if (Array.isArray(i) && i.length > 0 && typeof i[0] === TypeOf.object) {
            return i[0].id;
          }
          return null;
        });
      }
    }

    bulkActionsHandler(bulkArray);
  }, [isSelectedAll, bulkActionsHandler, data, listData]);

  const handleCreateKey = useCallback(
    (item: any, i: number) => {
      let key = data ? data[i]?.id : i + 1;
      key = item[0]?.id ? item[0]?.id : key; // TO-DO: remove the data from BaslakeTable usage

      return key;
    },
    [data],
  );

  const handleSetCollapse = useCallback(
    (item: any) => {
      setCollapsed(
        collapsed.includes(item)
          ? collapsed.filter((i: any) => i !== item)
          : collapsed.concat(item),
      );
    },
    [collapsed, setCollapsed],
  );

  const handleColapseAll = useCallback(() => {
    const arr: any = [];
    listData.forEach((item: any, i: any) => {
      arr.push(handleCreateKey(item, i));
    });
    setCollapsed(arr);
  }, [handleCreateKey, listData]);

  const getItemGroupActions = useCallback(
    (item: any) => {
      if (Array.isArray(actions)) return actions;
      if (
        typeof actions === TypeOf.object &&
        Array.isArray(item) &&
        item.length > 0 &&
        typeof item[0] === TypeOf.object &&
        Array.isArray(actions[item[0].actionKey])
      )
        return actions[item[0].actionKey];

      return [];
    },
    [actions],
  );

  const mapActions = useCallback(
    (item: any, isParent: boolean) =>
      getItemGroupActions(item).filter(
        (action: any) =>
          (action.shouldShow ? action.shouldShow(item[0]) : true) &&
          (!isParent && action.showOnNested ? action.showOnNested(item[0]) : true) &&
          !(!isParent && readyOnlyNest),
      ),
    [getItemGroupActions, readyOnlyNest],
  );

  const clickAction = useCallback(async (id: any, handler: any, params: any, index?: any) => {
    setActiveActionRow(id);
    await handler(params, index);
  }, []);

  const renderCollapsibleButton = useCallback(
    (key: any, isParent: boolean) => (
      <When condition={isParent && (alwaysDisplayNested || nested[key])}>
        {() => (
          <Accordion
            token={key}
            size="md"
            accordionHandler={() => handleSetCollapse(key)}
            disabled={!nested[key] || disabled}
            active={!collapsed.includes(key)}
          />
        )}
      </When>
    ),
    [alwaysDisplayNested, collapsed, disabled, handleSetCollapse, nested],
  );

  const handleRowClick = useCallback(
    (item: any) => {
      if (onRowClick) onRowClick(item);
    },
    [onRowClick],
  );

  const getItemData = useCallback(
    (item: any, index: any) => {
      if (Array.isArray(data)) return data[index];
      if (Array.isArray(item) && item[0]?.id) return item[0];
      if (item) return item;
      return index;
    },
    [data],
  );

  const renderHeaderActions = useCallback(
    (item: any) => (
      <Dropdown
        trigger={<SvgIcon path="icon-more-vertical" color={colors.default} size="lg" />}
        direction="left"
        className={`${styleDropdown}`}
        disabled={item.disabled}
      >
        <Dropdown.Menu>
          {item.actions.map((action: any) => (
            <BaslakeTableActionItem
              key={`header-action-item-${item.key}-${action.label}`}
              item={false}
              label={action.label}
              icon={action.icon}
              clickHandler={
                action.confirm
                  ? () => setActiveConfirm(`${item.key}-${action.label}`)
                  : (params: any) => clickAction(item.key, action.action, params)
              }
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    ),
    [clickAction],
  );

  // eslint-disable-next-line no-console
  // console.log({ selectedRows });/

  const renderRows = useCallback(
    (item: any, i: any, isParent = true) => {
      const key = handleCreateKey(item, i);
      // eslint-disable-next-line no-console
      // console.log({
      //   key,
      //   selectedRows,
      //   cond: selectedRows && selectedRows.includes(key),
      //   isParent,
      // });
      const fragmentKey = isParent ? `parent-${key}` : key;

      return (
        <Draggable
          key={`baslake-table-${fragmentKey}`}
          draggableId={`baslake-table-${fragmentKey}`}
          index={i}
          isDragDisabled={!isParent || !enableDragAndDrop}
        >
          {renderDraggable((provided: any, snapshot: any) => (
            <>
              <tr
                ref={provided.innerRef}
                className={getRowClass(key, isParent, snapshot.isDragging)}
                onClick={() => handleRowClick(item)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
              >
                <When condition={bulk}>
                  {() => (
                    <td>
                      <When condition={!hideBulkForValues.includes(key)}>
                        {() => (
                          <If condition={isParent}>
                            <Then>
                              {() => (
                                <SelectCell
                                  input={{
                                    value: selectedRows && selectedRows.includes(key),
                                    onChange: () => handleBulkActions(key),
                                    name: `check${i}`,
                                    id: `check${i}`,
                                  }}
                                  name={`check${i}`}
                                  disabled={
                                    loading === BaslakeLoading.actions || bulkDisabled || disabled
                                  }
                                  indeterminate={
                                    nested &&
                                    nested[key] &&
                                    selectedChildrenRows?.some((row) =>
                                      nested[key].map((c: any) => c[0]?.id).includes(row),
                                    )
                                  }
                                />
                              )}
                            </Then>
                            <Else>
                              <When condition={!isParent && !readyOnlyNest}>
                                {() => (
                                  <SelectCell
                                    input={{
                                      value:
                                        selectedChildrenRows && selectedChildrenRows.includes(key),
                                      onChange: () => handleBulkChildrenActions(key),
                                      name: `check${i}`,
                                      id: `check${i}`,
                                    }}
                                    name={`check${i}`}
                                    disabled={loading === BaslakeLoading.actions || disabled}
                                  />
                                )}
                              </When>
                            </Else>
                          </If>
                        )}
                      </When>
                    </td>
                  )}
                </When>
                <When condition={enableDragAndDrop}>
                  <If condition={isParent}>
                    <Then>
                      {() => (
                        <td width="30">
                          <SvgIcon
                            className={`${styleName}`}
                            path="icon-move"
                            size="md"
                            color={colors.greyIcon}
                          />
                        </td>
                      )}
                    </Then>
                    <Else>{() => <td width="30" />}</Else>
                  </If>
                </When>
                <When condition={alignmentOn('left') && nested}>
                  {() => <td width="60">{renderCollapsibleButton(key, isParent)}</td>}
                </When>
                {item
                  ?.filter((obj: any) => obj?.id === null || obj?.id === undefined)
                  .map((field: any, index: any) => (
                    <td
                      className={`${headers[index]?.style ? headers[index]?.style : ''}`}
                      key={`${headers[index]?.key}-${index}-${i}`}
                    >
                      {field}
                    </td>
                  ))}
                <When condition={alignmentOn('right') && nested && isParent}>
                  {() => <td width="60">{renderCollapsibleButton(key, isParent)}</td>}
                </When>
                <When condition={actions}>
                  {() => (
                    <td width="60">
                      <Loader inline="centered" size="small" active={isActionItemActive(key)} />
                      <When condition={!isActionItemActive(key)}>
                        {() => (
                          <>
                            <Dropdown
                              trigger={
                                <SvgIcon
                                  path="icon-more-vertical"
                                  color={colors.default}
                                  size="lg"
                                />
                              }
                              direction="left"
                              className={`${styleDropdown}`}
                              disabled={mapActions(item, isParent).length === 0 || disabled}
                            >
                              <Dropdown.Menu>
                                {mapActions(item, isParent).map((action: any) => (
                                  <BaslakeTableActionItem
                                    key={`action-item-${key}-${action.label}`}
                                    item={getItemData(item, i)}
                                    label={action.label}
                                    icon={action.icon}
                                    disabled={
                                      action?.shouldDisable && item[0]
                                        ? action?.shouldDisable(item[0])
                                        : null
                                    }
                                    clickHandler={
                                      action.confirm
                                        ? () => setActiveConfirm(`${key}-${action.label}`)
                                        : (params: any) =>
                                            clickAction(key, action.action, params, i)
                                    }
                                  />
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                            {mapActions(item, isParent)
                              .filter((action: any) => action.confirm)
                              .map((action: any) => (
                                <ModalConfirm
                                  key={`action-item-${key}-${action.label}-confirm`}
                                  open={activeConfirm === `${key}-${action.label}`}
                                  size={action.confirmationSize}
                                  onDismiss={setActiveConfirmFalse}
                                  onConfirm={() => {
                                    clickAction(key, action.action, getItemData(item, i), i);
                                    setActiveConfirmFalse();
                                  }}
                                  confirmText={action.confirmationText}
                                  captchaText={action.confirmationCaptcha}
                                  loadingActions={action?.isLoading}
                                />
                              ))}
                          </>
                        )}
                      </When>
                    </td>
                  )}
                </When>
              </tr>
              <When
                condition={
                  nested &&
                  isParent &&
                  nested[key] &&
                  !collapsed.includes(key) &&
                  !snapshot.isDragging
                }
              >
                {() => nested[key].map((child: any, i2: any) => renderRows(child, i2, false))}
              </When>
            </>
          ))}
        </Draggable>
      );
    },
    [
      handleCreateKey,
      getRowClass,
      bulk,
      alignmentOn,
      nested,
      actions,
      collapsed,
      handleRowClick,
      readyOnlyNest,
      selectedRows,
      loading,
      bulkDisabled,
      disabled,
      selectedChildrenRows,
      handleBulkActions,
      handleBulkChildrenActions,
      renderCollapsibleButton,
      headers,
      isActionItemActive,
      mapActions,
      getItemData,
      clickAction,
      activeConfirm,
      setActiveConfirmFalse,
      enableDragAndDrop,
      renderDraggable,
      styleName,
    ],
  );

  useEffect(() => {
    if (allCollapsed) handleColapseAll();
  }, [allCollapsed, handleColapseAll]);

  return (
    <Segment className={`${styleContainer} ${className}`}>
      <div className={`${styleDroppable}`}>
        <DragDropContext onDragStart={setDraggingTrue} onDragEnd={onDragEnd}>
          <Droppable droppableId={`${droppableId}`}>
            {(provided: any) => (
              <table ref={provided.innerRef} className={`${styleTable}`}>
                <thead className={`${styleTableHeader}`}>
                  <tr>
                    <When condition={bulk}>
                      <td width="50">
                        <SelectCell
                          input={{
                            value: isSelectedAll,
                            onChange: handleSelectAll,
                            name: 'selectAll',
                            id: 'selectAll',
                          }}
                          name="selectAll"
                          disabled={loading === BaslakeLoading.actions || bulkDisabled || disabled}
                        />
                      </td>
                    </When>
                    <When condition={enableDragAndDrop}>
                      <td width="30">&nbsp;</td>
                    </When>
                    {headers.map((item: any) => (
                      <th key={item.key || item.label}>
                        <If condition={(item.sortable || item.actions) && !disabled}>
                          <Then>
                            <When condition={item.sortable}>
                              {() => (
                                <SortableTableHeader
                                  className={`${styleHeaders}`}
                                  label={item.label}
                                  field={item.key}
                                  onSort={handleDataSorting}
                                  isActive={order?.field === item.key}
                                  isLoading={
                                    order?.field === item.key && loading === BaslakeLoading.sorting
                                  }
                                  direction={order?.direction}
                                />
                              )}
                            </When>
                            <When condition={item.actions}>{() => renderHeaderActions(item)}</When>
                          </Then>
                          <Else>{item.label}</Else>
                        </If>
                        {item?.actions &&
                          item.actions
                            .filter((action: any) => action.confirm)
                            .map((action: any) => (
                              <ModalConfirm
                                key={`action-item-${item.key}-${action.label}-confirm`}
                                open={activeConfirm === `${item.key}-${action.label}`}
                                size={action.confirmationSize}
                                onDismiss={setActiveConfirmFalse}
                                onConfirm={() => {
                                  action.action?.();
                                  setActiveConfirmFalse();
                                }}
                                confirmText={action.confirmationText}
                                captchaText={action.confirmationCaptcha}
                                loadingActions={action?.isLoading}
                              />
                            ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody {...provided.droppableProps}>
                  <If condition={listData?.length > 0}>
                    <Then>{() => listData.map((row: any, i: any) => renderRows(row, i))}</Then>
                    <Else>
                      <tr>
                        <td colSpan={100}>{noDataMsg}</td>
                      </tr>
                    </Else>
                  </If>
                  {provided.placeholder}
                </tbody>
                <When condition={!!footer}>
                  <tfoot className={`${styleTableFooter}`}>{footer}</tfoot>
                </When>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Segment>
  );
}

export default BaslakeTable;
