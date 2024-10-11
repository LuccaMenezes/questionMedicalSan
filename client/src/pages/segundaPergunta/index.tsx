import React, { useState } from 'react';
import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import Breadcrumb from "@/components/custom/breadcrumb";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"



const StringInverterPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const invertString = async () => {
    try {
      const response = await fetch('http://localhost:5000/string/stringCompleta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entrada: inputValue }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.resultado);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Erro ao inverter a string.');
    }
  };

  const invertWordsInString = async () => {
    try {
      const response = await fetch('http://localhost:5000/string/inverterPalavra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entrada: inputValue }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.resultado);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Erro ao inverter as palavras.');
    }
  };

  return (

    <Layout>
      <Layout.Header sticky>
        <h1 className="font-semibold">Olá, Rariman Rocha!</h1>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight mb-2'>Inversão de String</h2>
            <Breadcrumb items={[{ title: "Segunda Pergunta", link: "" }]} />
            <div className="flex flex-col h-screen w-96 mt-7">
            <Label htmlFor="entrada" className='mb-3'>Valor de entrada</Label>
              <Input
                placeholder="Digite a string aqui..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mb-4"
                id='entrada'
              />
              <div className="flex space-x-2">
                <Button onClick={invertString}>Inverter String</Button>
                <Button onClick={invertWordsInString}>Inverter Palavra</Button>
              </div>
              {result && <Alert className="mt-4"><span className='font-bold'>Resultado:</span> {result}</Alert>}
              {error && <Alert variant="error" className="mt-4">{error}</Alert>}
            </div>
          </div>
        </div>

      </Layout.Body>
    </Layout>
  );
};

export default StringInverterPage;
