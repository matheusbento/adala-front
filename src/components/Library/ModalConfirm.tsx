import { useState, useCallback, useMemo, ReactNode } from 'react';

import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import { When } from 'react-if';
import { Loader, Input } from 'semantic-ui-react';

import Button from './Button';
import Text from './Text';

export interface ModalConfirmProps {
  open?: boolean;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
  header?: string;
  confirmText?: string;
  captchaText?: string;
  labelConfirm?: string;
  labelDismiss?: string;
  loadingActions?: boolean;
  canSubmit?: boolean;
  onConfirm: any;
  onDismiss: any;
  children?: ReactNode;
}

const ModalConfirm = ({
  onConfirm,
  onDismiss,
  open = false,
  size = 'mini',
  header = 'Confirm',
  confirmText = 'Are you sure?',
  captchaText = undefined,
  labelConfirm = 'Confirm',
  labelDismiss = 'Cancel',
  loadingActions = false,
  canSubmit = true,
  children = null,
}: ModalConfirmProps) => {
  const [currentCaptcha, setCurrentCaptcha] = useState('');

  const handleDismiss = useCallback(() => {
    setCurrentCaptcha('');
    onDismiss();
  }, [onDismiss]);

  const handleConfirm = useCallback(() => {
    setCurrentCaptcha('');
    onConfirm();
  }, [onConfirm]);

  const isDisabled = useMemo(
    () =>
      !canSubmit ||
      (!!captchaText &&
        `${captchaText}`.toLocaleLowerCase() !==
          currentCaptcha.toLocaleLowerCase()),
    [canSubmit, captchaText, currentCaptcha]
  );

  return (
    <BaslakeModal
      open={open}
      closeHandler={onDismiss}
      size={size}
      title={header}
    >
      <BaslakeModal.Content>
        <When condition={!!confirmText}>{() => <p>{confirmText}</p>}</When>
        {children}
        <When condition={!!captchaText}>
          {() => (
            <>
              <Text weight="medium">{`Please type ${captchaText} to confirm your action`}</Text>
              <Input
                fluid
                placeholder={`Type ${captchaText} here`}
                value={currentCaptcha}
                onChange={(e) => setCurrentCaptcha(e.target.value)}
              />
            </>
          )}
        </When>
      </BaslakeModal.Content>
      <BaslakeModal.Actions>
        <Loader active={loadingActions} inline />
        <When condition={!loadingActions}>
          {() => (
            <>
              <Button pill color="default" outline onClick={handleDismiss}>
                {labelDismiss}
              </Button>
              <Button
                pill
                color="danger"
                onClick={handleConfirm}
                disabled={isDisabled}
              >
                {labelConfirm}
              </Button>
            </>
          )}
        </When>
      </BaslakeModal.Actions>
    </BaslakeModal>
  );
};

export default ModalConfirm;
