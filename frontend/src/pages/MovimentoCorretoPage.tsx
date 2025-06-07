import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Ruler, Clock, Activity } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const MovimentoCorreto = () => {
  const regras = [
    {
      categoria: 'Posição Inicial',
      items: [
        'Apoiar as mãos no solo, na largura dos ombros',
        'Dedos apontados para frente',
        'Corpo alinhado da cabeça aos calcanhares',
        'Pés unidos ou ligeiramente afastados'
      ]
    },
    {
      categoria: 'Movimento de Descida',
      items: [
        'Flexionar os cotovelos até formar ângulo de 90° ou menos',
        'Peito deve tocar ou quase tocar o solo',
        'Manter o corpo rígido e alinhado',
        'Não tocar o solo com outras partes do corpo'
      ]
    },
    {
      categoria: 'Movimento de Subida',
      items: [
        'Estender completamente os braços',
        'Manter alinhamento corporal',
        'Retornar à posição inicial',
        'Movimento deve ser contínuo e controlado'
      ]
    },
    {
      categoria: 'Critérios de Invalidação',
      items: [
        'Não atingir a amplitude mínima (90°)',
        'Apoiar joelhos, quadril ou abdome no solo',
        'Não estender completamente os braços',
        'Perder o alinhamento corporal'
      ]
    }
  ];

  const parametros = [
    { label: 'Ângulo mínimo dos cotovelos', valor: '90°', icon: Ruler },
    { label: 'Tempo máximo por repetição', valor: '3 segundos', icon: Clock },
    { label: 'Distância peito-solo', valor: '0-5 cm', icon: Ruler },
    { label: 'Amplitude de movimento', valor: 'Completa', icon: CheckCircle }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-taf-blue mb-4">Movimento Correto das Flexões</h1>
          <p className="text-lg text-taf-gray max-w-3xl mx-auto">
            Aprenda a técnica correta das flexões conforme os parâmetros oficiais do TAF
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="mb-12">
          <Card className="overflow-hidden shadow-xl animate-scale-in">
            <CardHeader className="bg-gradient-taf text-white text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Demonstração do Movimento Correto
              </CardTitle>
              <CardDescription className="text-blue-100">
                Vídeo em loop mostrando a execução perfeita das flexões
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
        <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
    {/* Substituímos o div de placeholder pela tag de imagem */}
    <img
      src="/demonstracao_movimento.gif" // O caminho para o seu GIF
      alt="Demonstração do movimento correto de flexão"
      className="w-full h-full object-cover" // Estilos para preencher o espaço
    />
    {/* Mantemos o seu selo de LOOP, que é um ótimo detalhe */}
    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
      LOOP
    </div>
  </div>
</CardContent>
          </Card>
        </div>

        {/* Parâmetros Técnicos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-taf-blue mb-6 text-center">Parâmetros Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parametros.map((param, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 animate-slide-up">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-taf-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <param.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-taf-blue mb-2">{param.label}</h3>
                  <p className="text-2xl font-bold text-taf-green">{param.valor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regras Detalhadas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-taf-blue mb-6 text-center">Regras Oficiais do TAF</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regras.map((regra, index) => (
              <Card key={index} className="shadow-lg animate-slide-up hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-lg text-taf-blue flex items-center gap-2">
                    {regra.categoria.includes('Invalidação') ? (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-taf-green" />
                    )}
                    {regra.categoria}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {regra.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          regra.categoria.includes('Invalidação') ? 'bg-red-500' : 'bg-taf-green'
                        }`}></div>
                        <span className="text-taf-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabela de Avaliação */}
        <div className="mb-12">
          <Card className="shadow-xl animate-fade-in">
            <CardHeader className="bg-gradient-taf text-white">
              <CardTitle className="text-xl text-center">Critérios de Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aspecto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Movimento Correto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Movimento Incorreto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-taf-blue">
                        Amplitude
                      </td>
                      <td className="px-6 py-4 text-sm text-taf-green">
                        Cotovelos 90° ou menos
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        Amplitude insuficiente
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-taf-blue">
                        Alinhamento
                      </td>
                      <td className="px-6 py-4 text-sm text-taf-green">
                        Corpo reto da cabeça aos pés
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        Quadril levantado ou baixo
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-taf-blue">
                        Extensão
                      </td>
                      <td className="px-6 py-4 text-sm text-taf-green">
                        Braços completamente estendidos
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        Extensão incompleta
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-taf-blue">
                        Apoio
                      </td>
                      <td className="px-6 py-4 text-sm text-taf-green">
                        Apenas mãos e pés
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        Joelhos ou abdome no solo
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MovimentoCorreto;
