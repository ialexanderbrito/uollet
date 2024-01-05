import emptyImg from 'assets/empty.svg';

import { Alert } from 'components/Alert';
import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';

import { cn } from 'utils';
import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useWallet } from 'hooks/useWallet';

export function Wallet() {
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const { loading, wallets } = useWallet();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header
        user={user}
        variant="secondary"
        visible={areValueVisible}
        setVisible={toggleValueVisibility}
      />

      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 p-4">
        <div className="flex w-full flex-col">
          <Alert
            title="Atenção!"
            description="Carteiras com saldo zerado ou negativo não serão exibidas."
            variant="warning"
            alertName="wallet"
          />

          {wallets.length === 0 && (
            <div className="mt-4 flex flex-col items-center justify-center">
              <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
              <p className="text-center text-lg font-medium text-black dark:text-text-dark">
                Não encontramos nenhuma carteira
              </p>
            </div>
          )}
        </div>

        <div className="mb-10 grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wallets.length > 0 &&
            wallets.map((wallet, index) => (
              <div
                key={index}
                className="flex h-[200px] w-full flex-col justify-between rounded-2xl border-b-4 bg-background-card p-4 text-left shadow-md dark:bg-background-card-dark"
                style={{
                  borderBottomColor: Array.isArray(wallet.color)
                    ? wallet.color[0]
                    : wallet.color,
                }}
              >
                <header>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: Array.isArray(wallet.color)
                        ? wallet.color[0]
                        : wallet.color,
                    }}
                  >
                    {wallet.icon}
                  </div>
                  <span className="mt-2 block font-medium tracking-[-0.5px] text-title dark:text-title-dark">
                    {wallet.wallet}
                  </span>
                </header>
                <div>
                  <span
                    className={cn(
                      'block font-medium tracking-[-0.5px] text-title dark:text-title-dark',
                      areValueVisible && 'select-none blur-md',
                    )}
                  >
                    {formatCurrency(wallet.value)}
                  </span>
                  <small className="text-sm text-text dark:text-text-dark">
                    Saldo atual
                  </small>
                </div>
              </div>
            ))}
        </div>
      </div>

      <BottomNavigator />
    </div>
  );
}
