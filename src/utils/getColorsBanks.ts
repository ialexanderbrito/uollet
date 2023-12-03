export function getColorsBanks(categories: string | string[]) {
  const colorMap: { [key: string]: string } = {
    Dinheiro: '#12A454',
    NuConta: '#7e0aca',
    Bradesco: '#cc092f',
    NuInvest: '#43126e',
    C6Bank: '#2b2a29',
    Binance: '#ebb42e',
    Inter: '#f77601',
    'Banco do Brasil': '#f5f430',
    Santander: '#e30000',
    Itaú: '#ec7000',
    Caixa: '#0070b0',
    'BTG Pactual': '#051229',
    'C6 Investimentos': '#1f1f1f',
    'Inter Investimentos': '#f77601',
    'XP Investimentos': '#0d0e10',
    'Clear Investimentos': '#0100f2',
    'BTG Investimentos': '#051229',
    'Rico Investimentos': '#f74f00',
    'Ágora Investimentos': '#01444b',
    'Órama Investimentos': '#34991d',
    'Mercado Bitcoin': '#e84522',
    Foxbit: '#f77100',
    'Ativa Investimentos': '#e0fe4b',
    'Avenue Investimentos': '#082521',
    Banrisul: '#000050',
    BMG: '#fa6300',
    BV: '#2239d1',
    Daycoval: '#026dab',
    Iti: '#ff0087',
    'Mercado Pago': '#00bcff',
    'Modal Mais': '#3c9b6f',
    N26: '#36a18b',
    Neon: '#22bed8',
    Next: '#0dfd85',
    PagBank: '#48ae3c',
    Pan: '#00b3ff',
    'Players Bank': '#ff3c00',
    PicPay: '#22be5e',
    Sicoob: '#003a46',
    Sofisa: '#00a990',
    'Toro Investimentos': '#6131b4',
  };

  const mapCategoryToColor = (category: string) =>
    colorMap[category] || '#000000';

  if (Array.isArray(categories)) {
    return categories.map(mapCategoryToColor);
  } else {
    return mapCategoryToColor(categories);
  }
}
