import { useState } from 'react';
import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import Breadcrumb from "@/components/custom/breadcrumb";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MatrizForm = () => {
  const [linhas, setLinhas] = useState<number>(3);
  const [colunas, setColunas] = useState<number>(3); 
  const [preenchimento, setPreenchimento] = useState<string>('row-major');
  const [matriz, setMatriz] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLinhasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinhas(Number(e.target.value));
    setMatriz([]);
  };

  const handleColunasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColunas(Number(e.target.value));
    setMatriz([]);
  };

  const handlePreenchimentoChange = (value: string) => {
    setPreenchimento(value);
    setMatriz([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/matriz/gerarMatriz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linhas,
          colunas,
          preenchimento,
        }),
      });
  
      const data = await response.json();

      const matriz2D = [];
      for (let i = 0; i < linhas; i++) {
        matriz2D.push(data.matriz.slice(i * colunas, (i + 1) * colunas));
      }
  
      setMatriz(matriz2D);
    } catch (error) {
      console.error('Erro ao gerar matriz:', error);
    }
  
    setLoading(false);
  };
  
  const handleTranspose = async () => {
    if (matriz.length === 0) return;
  
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/matriz/transporMatriz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matriz: matriz.flat(),
          linhas,
          colunas,
        }),
      });
  
      const data = await response.json();
      setMatriz(data.matrizTransposta);
    } catch (error) {
      console.error('Erro ao transpor matriz:', error);
    }
    setLoading(false);
  };

  const renderMatriz = () => {
    if (matriz.length === 0) return null;
  
    return (
      <table className="border-collapse border border-gray-300 mt-6 w-full">
        <tbody>
          {matriz.map((row, i) => (
            <tr key={i}>
              {row.map((valor, j) => (
                <td key={j} className="border border-gray-300 p-4 text-center">
                  {valor}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
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
            <h2 className='text-2xl font-bold tracking-tight mb-2'>Preencher Matriz</h2>
            <Breadcrumb items={[{ title: "Primeira Pergunta", link: "" }]} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
           
            <div className="flex-1">
              <label className="block mb-2 text-lg font-medium">Número de Linhas:</label>
              <Input
                type="number"
                value={linhas}
                onChange={handleLinhasChange}
                min="1"
                className="w-full"
              />
            </div>
            
            <div className="flex-1">
              <label className="block mb-2 text-lg font-medium">Número de Colunas:</label>
              <Input
                type="number"
                value={colunas}
                onChange={handleColunasChange}
                min="1"
                className="w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-lg font-medium">Preenchimento:</label>
              <Select onValueChange={handlePreenchimentoChange} defaultValue={preenchimento}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha um preenchimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row-major">Row-major</SelectItem>
                  <SelectItem value="column-major">Column-major</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-none">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Gerando...' : 'Preencher'}
              </Button>
            </div>
          </div>
        </form>

        {matriz.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Matriz Preenchida</h2>
            {renderMatriz()}
            <Button onClick={handleTranspose} disabled={loading} className="mt-4">
              {loading ? 'Transpondo...' : 'Transpor Matriz'}
            </Button>
          </div>
        )}
      </Layout.Body>
    </Layout>
  );
};

export default MatrizForm;
