// frontend/src/pages/EnvieAnalisePage.tsx (VERSÃO FINAL COMPLETA)

// --- Importações ---
import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileVideo, Check, AlertCircle, Play, BarChart3, Download, Loader2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { toast } from 'sonner';

// --- Constantes da API ---
const API_URL = 'http://localhost:5000/api/analyze';
const BASE_VIDEO_URL = 'http://localhost:5000';

// --- Tipagem do Resultado ---
type AnalysisResult = {
  totalFlexoes: number;
  movimentosCorretos: number;
  movimentosIncorretos: number;
  tempoTotal: string;
  erros: { tempo: string; descricao: string }[];
  precisao: number;
};

// --- Componente da Página ---
const EnvieAnalisePage = () => {
  // --- Lógica e Estados ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setProcessedVideoUrl(null);
      toast.success("Arquivo selecionado", { description: `${file.name} está pronto para análise.` });
    } else {
      toast.error("Formato inválido", { description: "Por favor, selecione um arquivo de vídeo." });
    }
  };
  
  const mutation = useMutation({
    mutationFn: (videoFile: File) => {
      const formData = new FormData();
      formData.append('video', videoFile);
      return axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: (response) => {
      const { video_url, analysis_report } = response.data;
      setAnalysisResult(analysis_report);
      setProcessedVideoUrl(`${BASE_VIDEO_URL}${video_url}`);
      toast.success("Análise concluída!", { description: "O relatório detalhado está disponível." });
    },
    onError: (error) => {
      const errorMessage = (axios.isAxiosError(error) && error.response?.data?.error) || 'Ocorreu um erro inesperado.';
      toast.error('Falha na Análise', { description: errorMessage });
    },
  });

  const handleAnalysis = () => {
    if (selectedFile) mutation.mutate(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // --- Renderização (JSX) ---
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-taf-blue mb-4">Envie Sua Análise</h1>
          <p className="text-lg text-taf-gray max-w-3xl mx-auto">
            Faça upload do seu vídeo de flexões e receba uma análise detalhada em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lado Esquerdo: Upload & Requisitos */}
          <div className="space-y-6">
            {/* AQUI: Colei o SEU CÓDIGO JSX original do Card de Upload */}
            <Card className="shadow-xl animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-taf-blue">
                  <Upload className="w-5 h-5" /> Upload de Vídeo
                </CardTitle>
                <CardDescription>
                  Selecione um vídeo das flexões para análise pela IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
                
                <div onClick={triggerFileInput} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-taf-blue transition-colors duration-300 hover:bg-blue-50">
                  <FileVideo className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-taf-blue mb-2">Clique para selecionar um vídeo</p>
                  <p className="text-sm text-taf-gray">Suporta MP4, AVI, MOV e outros formatos de vídeo</p>
                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-taf-green" />
                      <div>
                        <p className="font-medium text-taf-green">Arquivo selecionado:</p>
                        <p className="text-sm text-taf-gray">{selectedFile.name}</p>
                        <p className="text-xs text-taf-gray">Tamanho: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botão conectado à nova lógica */}
                <Button onClick={handleAnalysis} disabled={!selectedFile || mutation.isPending} className="w-full mt-6 bg-taf-green hover:bg-taf-green-dark" size="lg">
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analisando...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" /> Iniciar Análise
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AQUI: Colei o SEU CÓDIGO JSX original do Card de Requisitos */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-taf-blue">
                  <AlertCircle className="w-5 h-5" /> Requisitos do Vídeo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-taf-gray">
                  {/* ... seus 'li' itens aqui ... */}
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-taf-green rounded-full"></div>Vídeo em visão lateral ou frontal</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-taf-green rounded-full"></div>Candidato completamente visível</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Lado Direito: Resultados */}
          <div className="space-y-6">
            {/* Estado de Carregamento */}
            {mutation.isPending && (
              <Card className="shadow-xl animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-taf-blue"><Loader2 className="w-5 h-5 animate-spin" />Processando Análise</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-8">
                  <p className="text-lg text-taf-gray">Sua análise está em andamento.</p>
                  <p className="text-sm text-gray-500 mt-2">Aguarde, isso pode levar alguns minutos.</p>
                </CardContent>
              </Card>
            )}

            {/* Estado de Resultado Final */}
            {analysisResult && processedVideoUrl && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. CARD DO VÍDEO PROCESSADO (COM A CORREÇÃO) */}
                <Card className="shadow-xl">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-taf-blue">
                        <FileVideo className="w-5 h-5" />
                        Visualização da Análise 
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4"> {/* Adicionei space-y-4 para dar um espaço */}
                    <video 
                      key={processedVideoUrl} 
                      src={processedVideoUrl} 
                      controls 
                      autoPlay 
                      muted 
                      className="w-full rounded-lg" 
                    />
                    
                    {/* ---- BOTÃO DE DOWNLOAD ADICIONADO ---- */}
                    <a href={processedVideoUrl} download="analise_processada.mp4">
                      <Button className="w-full bg-taf-blue hover:bg-taf-blue-dark" size="lg">
                        <Download className="w-5 h-5 mr-2" />
                        Baixar Vídeo Analisado
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                
                {/* 2. CARD DE RESUMO, com dados reais */}
                <Card className="shadow-xl">
                    <CardHeader className="bg-gradient-taf text-white"><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" />Resultado da Análise</CardTitle></CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center"><div className="text-3xl font-bold text-taf-blue">{analysisResult.totalFlexoes}</div><div className="text-sm text-taf-gray">Total de Flexões</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-taf-green">{analysisResult.movimentosCorretos}</div><div className="text-sm text-taf-gray">Movimentos Corretos</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-red-500">{analysisResult.movimentosIncorretos}</div><div className="text-sm text-taf-gray">Movimentos Incorretos</div></div>
                            <div className="text-center"><div className="text-3xl font-bold text-purple-600">{analysisResult.precisao}%</div><div className="text-sm text-taf-gray">Precisão</div></div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. CARD DE ERROS, com dados reais */}
                {analysisResult.erros.length > 0 && (
                  <Card className="shadow-xl">
                      <CardHeader><CardTitle className="text-taf-blue">Detalhes dos Erros</CardTitle><CardDescription>Identificação temporal dos movimentos incorretos</CardDescription></CardHeader>
                      <CardContent>
                          <div className="space-y-4">
                              {analysisResult.erros.map((erro, index) => (
                                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                      <div>
                                          <div className="font-medium text-red-700">Erro às {erro.tempo}</div>
                                          <div className="text-sm text-red-600">{erro.descricao}</div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
                )}

              </div>
            )}

             {/* 4. Estado Inicial */}
             {!mutation.isPending && !analysisResult && (
                <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed">
                    <p className="text-center text-gray-500">O resultado detalhado da sua análise<br/> aparecerá aqui.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EnvieAnalisePage;