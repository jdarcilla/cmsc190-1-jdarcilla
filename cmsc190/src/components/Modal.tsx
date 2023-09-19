import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  onDismiss: Function;
};

const Modal = ({ children, onDismiss }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  });

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <BottomSheetModal
      onDismiss={() => onDismiss()}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDismissOnClose={true}
      onChange={handleSheetChanges}>
      <BottomSheetScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default observer(Modal);
