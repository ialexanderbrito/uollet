import { useEffect, useState } from 'react';

import { getColorsBanks, getIconBanks, category } from 'utils';

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

  function calculateWalletValue(data: FinanceData[], category: string): number {
    const values = data
      .filter((item) => item.category === category)
      .map((item) => (item.type === 'income' ? item.value : -item.value));

    return values.reduce((acc, value) => acc + value, 0);
  }

  function addCategoryWallet(wallet: string) {
    const walletCategory = category.find((item) => item.name === wallet);

    if (!walletCategory) return;

    return walletCategory.category;
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
        icon: getIconBanks(category),
      }))
      .filter((item) => item.value > 0);

    return wallets;
  }

  async function getWalletUser() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('value, category, type')
        .eq('user_id', storageUser?.id)
        .not('category', 'ilike', '%Meta%');

      if (error) {
        toast.error('Erro ao buscar dados da carteira');
        setLoading(false);
        return;
      }

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
