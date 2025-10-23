"use client";

import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let retryTimeout; // Sem anotação de tipo aqui

    const fetchData = async () => {
      if (!url) return;

      setLoading(true);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro na requisição');

        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err);
        retryTimeout = setTimeout(fetchData, 3000); // Retry após 5s
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(retryTimeout);
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

