export function getColorsBanks(category: string) {
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
    Clear: '#0100f2',
    'BTG Investimentos': '#051229',
    Rico: '#f74f00',
    'Ágora Investimentos': '#01444b',
    'Órama Investimentos': '#34991d',
    'Mercado Bitcoin': '#e84522',
    Foxbit: '#f77100',
  };

  return colorMap[category] || '#000000';
}
