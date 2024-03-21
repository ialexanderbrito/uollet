import { Recurrency } from 'components/Recurrency';

import { MyDialog } from '.';

interface RecurringRevenueProps {
  openModalRecurringRevenue: boolean;
  setOpenModalRecurringRevenue: (value: boolean) => void;
  isAccount: boolean;
  formik: any;
  onClose: () => void;
}

export function RecurringRevenue({
  openModalRecurringRevenue,
  setOpenModalRecurringRevenue,
  isAccount,
  formik,
  onClose,
}: RecurringRevenueProps) {
  return (
    <MyDialog
      isOpen={openModalRecurringRevenue}
      closeModal={onClose}
      title={isAccount ? 'A receita se repete a cada:' : 'Quantas parcelas?'}
    >
      {!isAccount && (
        <Recurrency
          formik={formik}
          setOpenRecurrency={setOpenModalRecurringRevenue}
          isParcel={true}
          onClose={onClose}
        />
      )}
      {isAccount && (
        <Recurrency
          formik={formik}
          setOpenRecurrency={setOpenModalRecurringRevenue}
          isRecurring={true}
          onClose={onClose}
        />
      )}
    </MyDialog>
  );
}
