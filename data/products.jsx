"use client";

import { useState, useEffect,useRef  } from 'react';


export function useFetch(url) {
  const [data, setData] = useState(null); // null inicial, melhor para checagem
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const retryTimeoutRef = useRef(null); // guarda referência do timeout

  useEffect(() => {
    console.log('useEffect disparado'); // Verifica se o useEffect foi disparado
    if (!url) return;

    let isCancelled = false; // para prevenir updates após unmount

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        console.log('Resposta da API:', res); // Verifique a resposta da API
        if (!res.ok) {
          const errorText = await res.text(); // Leitura de texto em vez de JSON
          throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
        }

        const json = await res.json();
        console.log('Dados recebidos:', json); // Verifique os dados recebidos
        if (!isCancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
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

    console.log(`🔍 Fazendo requisição para: ${url}`);
    console.log(`📤 Dados enviados:`, data);

    const response = await fetch(url, fetchOptions);

    console.log(`📥 Status da resposta: ${response.status}`);
    console.log(`📥 Headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      // Tenta ler erro da resposta
      const errorText = await response.text();
      console.error(`❌ Erro completo:`, errorText);
      
      let errorMessage = `Erro ao realizar ${actionName}: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Se não for JSON, usa o texto puro
        if (errorText) {
          errorMessage = errorText;
        }
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log(`✅ Resposta recebida:`, result);
    return result;
  } catch (err) {
    console.error(`💥 Erro em ${actionName}:`, err);
    throw err;
  }
};

