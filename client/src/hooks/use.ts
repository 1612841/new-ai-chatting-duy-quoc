import { useEffect, useState } from 'react';

export const use = <T>(usable: () => Promise<T | undefined>, enabled?: boolean) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const handleGetOnlineUser = async () => {
      const data = await usable();
      if (data) return setData(data);
    };
    
    if (enabled) {
      handleGetOnlineUser();
    }
  }, [enabled]);

  return data;
};
