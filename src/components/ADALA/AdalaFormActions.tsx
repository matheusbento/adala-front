import { useMemo } from 'react';
import { css } from 'glamor';

import { If, Then, Else } from 'react-if';
import { Popup } from 'semantic-ui-react';
import { padding } from '../../utils/theme';
import Button from '../Library/Button';
import Segment from '../Library/Segment';
import { useTranslation } from 'react-i18next';

const styleSegment = css({
  ...padding.xNone,
  ...padding.topXs,
  ...padding.bottomXs,
});
const stylePopup = css({
  zIndex: '9999999 !important',
});

function AdalaFormActions({
  cancelHandler,
  pristine,
  deleteHandler = null,
  loading = false,
  submitHandler = null,
  button = false,
  action = null,
  disabled = false,
  size = 'xs',
  className = null,
  actionButtonText = 'Save',
  cancelButtonText = 'Cancel',
  actionButtonPopupContent = null,
}: any) {
  const { t } = useTranslation();
  const ActionButton = useMemo(() => {
    return (
      <Button
        pill
        size={size}
        color="success"
        type={loading || pristine || button ? 'button' : 'submit'}
        loading={loading}
        disabled={loading || pristine || disabled}
        onClick={submitHandler}
      >
        {t(actionButtonText)}
      </Button>
    );
  }, [actionButtonText, button, disabled, loading, pristine, size, submitHandler, t]);

  return (
    <Segment className={`${styleSegment} ${className}`}>
      {action !== 'delete' && (
        <If condition={actionButtonPopupContent}>
          <Then>
            {() => (
              <Popup
                className={`${stylePopup}`}
                content={actionButtonPopupContent}
                trigger={<span>{ActionButton}</span>}
              />
            )}
          </Then>
          <Else>{() => <>{ActionButton}</>}</Else>
        </If>
      )}
      {action === 'delete' && (
        <Button
          pill
          size={size}
          color="danger"
          type="button"
          disabled={loading}
          loading={loading}
          onClick={deleteHandler}
        >
          {t('Delete')}
        </Button>
      )}
      <Button
        pill
        size={size}
        color="default"
        type="button"
        outline
        disabled={loading}
        onClick={cancelHandler}
      >
        {t(cancelButtonText)}
      </Button>
    </Segment>
  );
}

export default AdalaFormActions;
