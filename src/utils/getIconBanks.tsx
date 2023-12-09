import { Bank, CurrencyDollar } from '@phosphor-icons/react';
import {
  agora,
  bancoDoBrasil,
  binance,
  bradesco,
  btg,
  btgInvest,
  c6,
  caixa,
  clear,
  foxbit,
  inter,
  itau,
  mercadoBitcoin,
  nubank,
  nuInvest,
  rico,
  santander,
  xp,
  orama,
  ativa,
  avenue,
  banrisul,
  bmg,
  bv,
  daycoval,
  iti,
  mercadopago,
  modalmais,
  n26,
  neon,
  next,
  pagbank,
  pan,
  pb,
  picpay,
  sicoob,
  sofisa,
  toro,
  wise,
  nomad,
  revolut,
  will,
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
    'Clear Investimentos': (
      <img src={clear} alt="Clear" className="h-12 w-12 rounded-md" />
    ),
    'BTG Investimentos': (
      <img
        src={btgInvest}
        alt="BTG Investimentos"
        className="h-12 w-12 rounded-md"
      />
    ),
    'Rico Investimentos': (
      <img src={rico} alt="Rico" className="h-12 w-12 rounded-md" />
    ),
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
    'Ativa Investimentos': (
      <img src={ativa} alt="Ativa" className="h-12 w-12 rounded-md" />
    ),
    'Avenue Investimentos': (
      <img src={avenue} alt="Avenue" className="h-12 w-12 rounded-md" />
    ),
    Banrisul: (
      <img src={banrisul} alt="Banrisul" className="h-12 w-12 rounded-md" />
    ),
    BMG: <img src={bmg} alt="BMG" className="h-12 w-12 rounded-md" />,
    BV: <img src={bv} alt="BV" className="h-12 w-12 rounded-md" />,
    Daycoval: (
      <img src={daycoval} alt="Daycoval" className="h-12 w-12 rounded-md" />
    ),
    Iti: <img src={iti} alt="Iti" className="h-12 w-12 rounded-md" />,
    'Mercado Pago': (
      <img
        src={mercadopago}
        alt="MercadoPago"
        className="h-12 w-12 rounded-md"
      />
    ),
    'Modal Mais': (
      <img src={modalmais} alt="Modal Mais" className="h-12 w-12 rounded-md" />
    ),
    N26: <img src={n26} alt="N26" className="h-12 w-12 rounded-md" />,
    Neon: <img src={neon} alt="Neon" className="h-12 w-12 rounded-md" />,
    Next: <img src={next} alt="Next" className="h-12 w-12 rounded-md" />,
    PagBank: (
      <img src={pagbank} alt="PagBank" className="h-12 w-12 rounded-md" />
    ),
    Pan: <img src={pan} alt="Pan" className="h-12 w-12 rounded-md" />,
    'Players Bank': <img src={pb} alt="PB" className="h-12 w-12 rounded-md" />,
    PicPay: <img src={picpay} alt="PicPay" className="h-12 w-12 rounded-md" />,
    Sicoob: <img src={sicoob} alt="Sicoob" className="h-12 w-12 rounded-md" />,
    Sofisa: <img src={sofisa} alt="Sofisa" className="h-12 w-12 rounded-md" />,
    'Toro Investimentos': (
      <img src={toro} alt="Toro" className="h-12 w-12 rounded-md" />
    ),
    Wise: <img src={wise} alt="Wise" className="h-12 w-12 rounded-md" />,
    Nomad: <img src={nomad} alt="Nomad" className="h-12 w-12 rounded-md" />,
    Revolut: (
      <img src={revolut} alt="Revolut" className="h-12 w-12 rounded-md" />
    ),
    'Will Bank': <img src={will} alt="Will" className="h-12 w-12 rounded-md" />,
  };

  return (
    iconMap[name] || <Bank className="text-white" width={24} height={24} />
  );
}
