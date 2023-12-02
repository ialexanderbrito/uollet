import { Bank, CurrencyDollar } from '@phosphor-icons/react';
import {
  bradesco,
  agora,
  bancoDoBrasil,
  binance,
  btg,
  btgInvest,
  c6,
  caixa,
  clear,
  foxbit,
  inter,
  itau,
  mercadoBitcoin,
  nuInvest,
  nubank,
  santander,
  xp,
  rico,
  orama,
} from 'assets';

export function getIconBanks(name: string) {
  const iconMap: { [key: string]: React.ReactNode } = {
    Dinheiro: <CurrencyDollar className="text-white" width={24} height={24} />,
    NuConta: <img src={nubank} alt="Nubank" className="h-12 w-12 rounded-md" />,
    Bradesco: (
      <img src={bradesco} alt="Bradesco" className="h-12 w-12 rounded-md" />
    ),
    NuInvest: (
      <img src={nuInvest} alt="Nu Invest" className="h-12 w-12 rounded-md" />
    ),
    C6Bank: <img src={c6} alt="C6 Bank" className="h-12 w-12 rounded-md" />,
    Binance: (
      <img src={binance} alt="Binance" className="h-12 w-12 rounded-md" />
    ),
    Inter: <img src={inter} alt="Inter" className="h-12 w-12 rounded-md" />,
    'Banco do Brasil': (
      <img
        src={bancoDoBrasil}
        alt="Banco do Brasil"
        className="h-12 w-12 rounded-md"
      />
    ),
    Santander: (
      <img src={santander} alt="Santander" className="h-12 w-12 rounded-md" />
    ),
    Itaú: <img src={itau} alt="Itaú" className="h-12 w-12 rounded-md" />,
    Caixa: <img src={caixa} alt="Caixa" className="h-12 w-12 rounded-md" />,
    'BTG Pactual': (
      <img src={btg} alt="BTG Pactual" className="h-12 w-12 rounded-md" />
    ),
    'C6 Investimentos': (
      <img src={c6} alt="C6 Investimentos" className="h-12 w-12 rounded-md" />
    ),
    'Inter Investimentos': (
      <img
        src={inter}
        alt="Inter Investimentos"
        className="h-12 w-12 rounded-md"
      />
    ),
    'XP Investimentos': (
      <img src={xp} alt="XP Investimentos" className="h-12 w-12 rounded-md" />
    ),
    Clear: <img src={clear} alt="Clear" className="h-12 w-12 rounded-md" />,
    'BTG Investimentos': (
      <img
        src={btgInvest}
        alt="BTG Investimentos"
        className="h-12 w-12 rounded-md"
      />
    ),
    Rico: <img src={rico} alt="Rico" className="h-12 w-12 rounded-md" />,
    'Ágora Investimentos': (
      <img
        src={agora}
        alt="Ágora Investimentos"
        className="h-12 w-12 rounded-md"
      />
    ),
    'Órama Investimentos': (
      <img
        src={orama}
        alt="Órama Investimentos"
        className="h-12 w-12 rounded-md"
      />
    ),
    'Mercado Bitcoin': (
      <img
        src={mercadoBitcoin}
        alt="Mercado Bitcoin"
        className="h-12 w-12 rounded-md"
      />
    ),
    Foxbit: <img src={foxbit} alt="Foxbit" className="h-12 w-12 rounded-md" />,
  };

  return (
    iconMap[name] || <Bank className="text-white" width={24} height={24} />
  );
}
