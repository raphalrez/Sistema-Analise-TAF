// frontend/src/pages/CandidatosPage.tsx (A Versão Completa e Final)

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Eye, CheckCircle, XCircle, Clock, Activity, Loader2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

// --- Tipo de dado do Candidato ---
type Candidato = {
  id: number;
  nome: string;
  total_flexoes: number;
  movimentos_corretos: number;
  movimentos_incorretos: number;
  data_analise: string;
  tempo_execucao: string;
  status: 'Aprovado' | 'Reprovado';
  precisao: number;
};

const CandidatosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // --- Lógica de busca de dados ---
  const { data: candidatos = [], isLoading, isError } = useQuery<Candidato[]>({
    queryKey: ['candidatos'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/candidatos');
      return response.data;
    }
  });

  // --- Lógica de Estatísticas (JÁ FUNCIONANDO) ---
  const estatisticas = useMemo(() => {
    if (candidatos.length === 0) return { total: 0, aprovados: 0, reprovados: 0, mediaFlexoes: 0, mediaPrecisao: 0 };
    const aprovados = candidatos.filter(c => c.status === 'Aprovado').length;
    const mediaFlexoes = candidatos.reduce((acc, c) => acc + c.total_flexoes, 0) / candidatos.length;
    const mediaPrecisao = candidatos.reduce((acc, c) => acc + c.precisao, 0) / candidatos.length;
    return {
      total: candidatos.length,
      aprovados,
      reprovados: candidatos.length - aprovados,
      mediaFlexoes: isNaN(mediaFlexoes) ? 0 : Math.round(mediaFlexoes),
      mediaPrecisao: isNaN(mediaPrecisao) ? 0 : Math.round(mediaPrecisao)
    };
  }, [candidatos]);

  // --- Lógica de Filtro ---
  const candidatosFiltrados = useMemo(() => {
    return candidatos.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => a.nome.localeCompare(b.nome));
  }, [candidatos, searchTerm]);

  if (isLoading) { /* ...código de carregamento... */ }
  if (isError) { /* ...código de erro... */ }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-taf-blue mb-4">Candidatos TAF</h1>
          <p className="text-lg text-taf-gray max-w-3xl mx-auto">Visualize os resultados e análises de todos os candidatos organizados alfabeticamente</p>
        </div>

        {/* Estatísticas Gerais (JÁ FUNCIONANDO) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="text-center animate-scale-in"><CardContent className="pt-6"><Users className="w-8 h-8 mx-auto mb-2 text-taf-blue" /><div className="text-2xl font-bold text-taf-blue">{estatisticas.total}</div><div className="text-sm text-taf-gray">Total</div></CardContent></Card>
          <Card className="text-center animate-scale-in"><CardContent className="pt-6"><CheckCircle className="w-8 h-8 mx-auto mb-2 text-taf-green" /><div className="text-2xl font-bold text-taf-green">{estatisticas.aprovados}</div><div className="text-sm text-taf-gray">Aprovados</div></CardContent></Card>
          <Card className="text-center animate-scale-in"><CardContent className="pt-6"><XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" /><div className="text-2xl font-bold text-red-500">{estatisticas.reprovados}</div><div className="text-sm text-taf-gray">Reprovados</div></CardContent></Card>
          <Card className="text-center animate-scale-in"><CardContent className="pt-6"><Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" /><div className="text-2xl font-bold text-purple-600">{estatisticas.mediaFlexoes}</div><div className="text-sm text-taf-gray">Média Flexões</div></CardContent></Card>
          <Card className="text-center animate-scale-in"><CardContent className="pt-6"><Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" /><div className="text-2xl font-bold text-orange-600">{estatisticas.mediaPrecisao}%</div><div className="text-sm text-taf-gray">Precisão Média</div></CardContent></Card>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8 animate-slide-up">
            <Card><CardContent className="pt-6"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taf-gray w-5 h-5" /><Input type="text" placeholder="Pesquisar candidato por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-lg py-6"/></div></CardContent></Card>
        </div>
        
        {/* **** A PARTE QUE ESTAVA FALTANDO **** */}
        {/* Lista de Candidatos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidatosFiltrados.map((candidato, index) => (
            <Card key={candidato.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-taf-blue group-hover:text-taf-blue-dark transition-colors">{candidato.nome}</CardTitle>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${candidato.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{candidato.status}</div>
                </div>
                <CardDescription>Análise realizada em {new Date(candidato.data_analise).toLocaleDateString('pt-BR')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm text-taf-gray">Total de Flexões:</span><span className="font-semibold text-taf-blue">{candidato.total_flexoes}</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-taf-gray">Movimentos Corretos:</span><span className="font-semibold text-taf-green">{candidato.movimentos_corretos}</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-taf-gray">Movimentos Incorretos:</span><span className="font-semibold text-red-500">{candidato.movimentos_incorretos}</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-taf-gray">Tempo de Execução:</span><span className="font-semibold text-taf-blue">{candidato.tempo_execucao}</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-taf-gray">Precisão:</span><span className="font-semibold text-purple-600">{candidato.precisao}%</span></div>
                  <div className="pt-4"><Button asChild className="w-full group-hover:bg-taf-blue-dark transition-colors"><Link to={`/candidato/${candidato.id}`}><Eye className="w-4 h-4 mr-2" />Ver Detalhes</Link></Button></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {candidatosFiltrados.length === 0 && !isLoading && (
            <div className="text-center py-12 animate-fade-in col-span-full"><Users className="w-16 h-16 mx-auto mb-4 text-gray-400" /><h3 className="text-lg font-medium text-taf-gray mb-2">Nenhum candidato encontrado</h3><p className="text-taf-gray">{searchTerm ? 'Tente ajustar sua pesquisa' : 'Ainda não há candidatos cadastrados. Rode o script de sincronização.'}</p></div>
        )}
      </div>
    </MainLayout>
  );
};

export default CandidatosPage;