import { observer } from 'mobx-react-lite';
import { modalApi } from '../providers/modalApi';
import Modal from './Modal';

const ModalContainer = () => {
  return (
    <>
      {modalApi.modals.map(modal => {
        return (
          <Modal key={modal.id} onDismiss={modal.dismiss}>
            {modal.component}
          </Modal>
        );
      })}
    </>
  );
};

export default observer(ModalContainer);
