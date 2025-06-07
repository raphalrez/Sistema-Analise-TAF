// frontend/src/pages/CandidatoDetalhesPage.tsx (Versão Final e 100% Corrigida)

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, AlertCircle, CheckCircle, Download, Clock, BarChart3, Loader2, Ruler } from 'lucide-react'; // Garanti que todos os ícones estão aqui

// URL base do nosso backend
const BASE_URL = 'http://localhost:5000';

// Definição do tipo de dados que esperamos da API, combinando real e simulado
type DetalhesCandidato = {
    id: number;
    nome: string;
    status: 'Aprovado' | 'Reprovado';
    data_analise: string;
    // --- Campos Reais do Banco de Dados ---
    video_original_path: string;
    video_processado_path: string;
    total_flexoes: number;
    movimentos_corretos: number;
    movimentos_incorretos: number;
    tempo_execucao: number; // No DB é REAL, aqui é number
    precisao: number;
    velocidade_media: number; // No DB é REAL
    amplitude_minima: number; // No DB é INTEGER
    // --- Campos Simulados Adicionais ---
    observacoes: string;
    erros: Array<{ tempo: string; descricao: string; gravidade: string }>;
};

const CandidatoDetalhesPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: candidato, isLoading, isError } = useQuery<DetalhesCandidato>({
        queryKey: ['candidato', id], // Chave de cache única para este candidato
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/api/candidato/${id}`);
            const data = response.data;

            // Transforma os dados brutos da API em dados prontos para a tela
            return {
                ...data,
                // Constrói as URLs completas para os vídeos
                video_original_path: `${BASE_URL}/${data.video_original_path.replace(/\\/g, '/')}`,
                video_processado_path: `${BASE_URL}/${data.video_processado_path.replace(/\\/g, '/')}`,
                
                // Adiciona dados extras simulados que não vêm do banco (ainda)
                observacoes: 'Análise gerada pelo sistema TAF. Candidato precisa melhorar a amplitude do movimento para atingir os critérios de excelência.',
                erros: [
                  // Lógica para gerar erros viria aqui no futuro
                  { tempo: '0:15', descricao: 'Amplitude insuficiente detectada (-1 rep).', gravidade: 'Média' },
                ],
            };
        },
        enabled: !!id, // Só roda a query se o ID estiver presente na URL
    });

    if (isLoading) {
        return <MainLayout><div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-16 h-16 animate-spin text-taf-blue" /></div></MainLayout>;
    }

    if (isError || !candidato) {
        return <MainLayout><div><h1>Erro 404</h1><p>Candidato não encontrado. <Link to="/candidatos" className="underline">Voltar para a lista</Link></p></div></MainLayout>;
    }

    return (
        <MainLayout>
          <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
            {/* Header com dados reais */}
            <div className="mb-8 animate-fade-in">
              <Button asChild variant="outline" className="mb-4"><Link to="/candidatos"><ArrowLeft className="w-4 h-4 mr-2" />Voltar para Candidatos</Link></Button>
              <div className="flex items-center justify-between">
                <div><h1 className="text-4xl font-bold text-taf-blue mb-2">{candidato.nome}</h1><p className="text-lg text-taf-gray">Análise detalhada realizada em {new Date(candidato.data_analise).toLocaleDateString('pt-BR')}</p></div>
                <div className={`px-4 py-2 rounded-full text-lg font-medium ${candidato.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{candidato.status}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna Principal com os Vídeos */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-xl animate-scale-in">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-taf-blue"><Play className="w-5 h-5" />Vídeo Original</CardTitle><CardDescription>Gravação original sem processamento</CardDescription></CardHeader>
                  <CardContent className="p-0"><video key={candidato.video_original_path} src={candidato.video_original_path} controls className="w-full aspect-video rounded-b-lg bg-black" /></CardContent>
                </Card>
                <Card className="shadow-xl animate-scale-in">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-taf-blue"><BarChart3 className="w-5 h-5" />Vídeo com Análise IA</CardTitle><CardDescription>Processado com detecção de pose e análise de movimento</CardDescription></CardHeader>
                  <CardContent className="p-0 relative"><video key={candidato.video_processado_path} src={candidato.video_processado_path} controls autoPlay muted className="w-full aspect-video rounded-b-lg bg-black" /><div className="absolute top-4 left-4 bg-taf-green text-white px-3 py-1 rounded-full text-sm font-medium">IA ATIVA</div></CardContent>
                </Card>
              </div>

              {/* Sidebar com Resumo e Dados */}
              <div className="space-y-6">
                <Card className="shadow-xl animate-slide-up">
                  <CardHeader className="bg-gradient-taf text-white"><CardTitle>Resumo Executivo</CardTitle></CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between"><span className="text-taf-gray">Total de Flexões:</span><span className="font-bold text-taf-blue">{candidato.total_flexoes}</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Movimentos Corretos:</span><span className="font-bold text-taf-green">{candidato.movimentos_corretos}</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Movimentos Incorretos:</span><span className="font-bold text-red-500">{candidato.movimentos_incorretos}</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Tempo Total:</span><span className="font-bold text-taf-blue">{candidato.tempo_execucao.toFixed(2)}s</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Precisão:</span><span className="font-bold text-purple-600">{candidato.precisao}%</span></div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* DADOS TÉCNICOS COM DADOS REAIS E SIMULADOS */}
                <Card className="shadow-xl animate-slide-up">
                  <CardHeader><CardTitle className="text-taf-blue">Dados Técnicos</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-taf-gray">Velocidade Média:</span><span className="font-medium">{candidato.velocidade_media.toFixed(1)} flexões/min</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Amplitude Mínima:</span><span className="font-medium">{candidato.amplitude_minima}°</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Tempo Médio Descida:</span><span className="font-medium">1.2s (Simulado)</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Tempo Médio Subida:</span><span className="font-medium">1.1s (Simulado)</span></div>
                      <div className="flex justify-between"><span className="text-taf-gray">Pausas Longas:</span><span className="font-medium">1 (Simulado)</span></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl animate-slide-up"><CardContent className="pt-6"><div className="space-y-3"><Button className="w-full bg-taf-blue hover:bg-taf-blue-dark"><Download className="w-4 h-4 mr-2" />Baixar Relatório PDF</Button><Button variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" />Exportar Dados CSV</Button></div></CardContent></Card>
              </div>
            </div>

            {/* Análise de Erros e Observações aqui ... */}
          </div>
        </MainLayout>
    );
};

export default CandidatoDetalhesPage;