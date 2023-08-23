import { useEffect, useState } from 'react';

import {
  Bank,
  ChartLine,
  CurrencyBtc,
  CurrencyDollar,
  PiggyBank,
} from '@phosphor-icons/react';

import { category } from 'utils/category';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

interface WalletProps {
  id: number;
  wallet: string;
  value: number;
  color: string;
  category?: string;
  icon: React.ReactNode;
}

interface FinanceData {
  value: number;
  category: string;
  type: string;
}

export function useWallet() {
  const { storageUser } = useAuth();
  const { toast } = useToast();

  const [wallets, setWallets] = useState<WalletProps[]>([]);
  const [loading, setLoading] = useState(true);

  function getColorsBanks(category: string) {
    switch (category) {
      case 'Dinheiro':
        return '#12A454';
      case 'NuConta':
        return '#7e0aca';
      case 'Bradesco':
        return '#cc092f';
      case 'NuInvest':
        return '#43126e';
      case 'C6Bank':
        return '#2b2a29';
      case 'Binance':
        return '#ebb42e';
      case 'Inter':
        return '#f77601';
      case 'Banco do Brasil':
        return '#f5f430';
      case 'Santander':
        return '#e30000';
      case 'Itaú':
        return '#ec7000';
      case 'Caixa':
        return '#0070b0';
      case 'BTG Pactual':
        return '#051229';
      case 'C6 Investimentos':
        return '#1f1f1f';
      case 'Inter Investimentos':
        return '#f77601';
      case 'XP Investimentos':
        return '#0d0e10';
      case 'Clear':
        return '#0100f2';
      case 'BTG Investimentos':
        return '#051229';
      case 'Rico':
        return '#f74f00';
      case 'Ágora Investimentos':
        return '#01444b';
      case 'Órama Investimentos':
        return '#34991d';
      case 'Mercado Bitcoin':
        return '#e84522';
      case 'Foxbit':
        return '#f77100';
      default:
        return '#000000';
    }
  }

  function calculateWalletValue(data: FinanceData[], category: string): number {
    const values = data
      .filter((item) => item.category === category)
      .map((item) => (item.type === 'income' ? item.value : -item.value));

    const sumValues = values.reduce((acc, value) => acc + value, 0);

    return sumValues;
  }

  function addCategoryWallet(wallet: string) {
    const walletCategory = category.find((item) => item.name === wallet);

    if (!walletCategory) return;

    return walletCategory.category;
  }

  function addIconWallet(category: string) {
    if (category === 'bank') {
      return <Bank className="text-white" width={24} height={24} />;
    }

    if (category === 'investiments') {
      return <ChartLine className="text-white" width={24} height={24} />;
    }

    if (category === 'crypto') {
      return <CurrencyBtc className="text-white" width={24} height={24} />;
    }

    if (category === 'cash') {
      return <CurrencyDollar className="text-white" width={24} height={24} />;
    }

    if (category === 'savings') {
      return <PiggyBank className="text-white" width={24} height={24} />;
    }

    return <Bank className="text-white" width={24} height={24} />;
  }

  function formatWalletData(data: FinanceData[]) {
    const categories = [...new Set(data.map((item) => item.category))];

    const wallets = categories
      .map((category, index) => ({
        id: index,
        wallet: category,
        value: calculateWalletValue(data, category),
        color: getColorsBanks(category),
        category: addCategoryWallet(category),
        icon: addIconWallet(addCategoryWallet(category) || ''),
      }))
      .filter((item) => item.value > 0);

    return wallets;
  }

  async function getWalletUser() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('value, category, type')
        .eq('user_id', storageUser?.id);

      if (error) {
        toast.error('Erro ao buscar dados da carteira');
        setLoading(false);
        return;
      }

      if (!data) return;

      if (!data) return;

      const formattedWallets = formatWalletData(data);
      setWallets(formattedWallets);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar dados da carteira');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWalletUser();
  }, []);

  return { wallets, loading };
}
