
// Adicionando a diretiva "use client" para que o React saiba que este é um componente do cliente
"use client";

import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
