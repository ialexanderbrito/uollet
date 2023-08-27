import emptyImg from 'assets/empty.svg';

import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useWallet } from 'hooks/useWallet';

export function Wallet() {
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const { loading, wallets } = useWallet();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex  w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            user={user}
            variant="secondary"
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
          />

          <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 p-4">
            {wallets.length === 0 ? (
              <div className="mt-4 flex flex-col items-center justify-center">
                <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                <p className="text-center text-lg font-medium text-black dark:text-textDark">
                  Não encontramos nenhuma carteira
                </p>
              </div>
            ) : (
              <>
                {wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className={`flex h-[200px] w-full flex-col justify-between rounded-2xl border-b-4  bg-backgroundCard p-4 text-left shadow-md dark:bg-backgroundCardDark ${
                      index === wallets.length - 1 ? 'mb-10' : ''
                    }`}
                    style={{
                      borderBottomColor: wallet.color,
                    }}
                  >
                    <header>
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-md"
                        style={{ backgroundColor: wallet.color }}
                      >
                        {wallet.icon}
                      </div>
                      <span className="mt-2 block font-medium tracking-[-0.5px] text-title dark:text-titleDark">
                        {wallet.wallet}
                      </span>
                    </header>
                    <div>
                      <span
                        className={`block font-medium tracking-[-0.5px] text-title dark:text-titleDark ${
                          areValueVisible ? 'select-none blur-md' : ''
                        }`}
                      >
                        {formatCurrency(wallet.value)}
                      </span>
                      <small className="text-sm text-text dark:text-textDark">
                        Saldo atual
                      </small>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
