"use client";

import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null); // null inicial, melhor para checagem
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const retryTimeoutRef = useRef(null); // guarda referência do timeout

  useEffect(() => {
    if (!url) return;

    let isCancelled = false; // para prevenir updates após unmount

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro na requisição');

        const json = await res.json();
        if (!isCancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);

          // Retry somente se componente ainda estiver montado
          retryTimeoutRef.current = setTimeout(fetchData, 3000);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
      clearTimeout(retryTimeoutRef.current);
    };
  }, [url]);

  return { data, loading, error };
}


// utils/apiRequest.js
export const apiRequest = async ({ url, method = 'POST', data, actionName = 'requisição' }) => {
  try {
    const fetchOptions = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Só adiciona body se método NÃO for GET ou HEAD
    if (method !== 'GET' && method !== 'HEAD' && data) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      // Tenta ler erro da resposta
      const error = await response.json().catch(() => ({}));
      throw new Error(`Erro ao realizar ${actionName}: ${error.message || response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Erro em ${actionName}:`, err);
    throw err;
  }
};

