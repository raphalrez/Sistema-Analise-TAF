import { Link } from 'react-router-dom';
import { Activity, Upload, Users, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';

const HomePage = () => {
  const features = [
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'IA baseada em YOLO v11 para análise precisa de movimentos',
      color: 'text-taf-blue'
    },
    {
      icon: Clock,
      title: 'Tempo Real',
      description: 'Processamento rápido e eficiente de vídeos',
      color: 'text-taf-green'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Análises completas com identificação de erros',
      color: 'text-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Precisão Garantida',
      description: 'Avaliação baseada em parâmetros oficiais do TAF',
      color: 'text-orange-600'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-taf">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-white animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sistema Inteligente de
                <span className="block text-yellow-300">Análise de TAF</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Revolucione a avaliação de testes de aptidão física com inteligência artificial avançada
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-taf-blue hover:bg-gray-100">
                  <Link to="/envie-analise">
                    <Upload className="w-5 h-5 mr-2" />
                    Analisar Vídeo
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-taf-blue">
                  <Link to="/movimento-correto">
                    Ver Movimento Correto
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-taf-blue mb-4">
              Tecnologia de Ponta para TAF
            </h2>
            <p className="text-lg text-taf-gray max-w-2xl mx-auto">
              Nossa plataforma utiliza inteligência artificial YOLO v11 para fornecer análises precisas e confiáveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-scale-in border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg text-taf-blue">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-taf-gray">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-taf-blue group-hover:text-white transition-all duration-300">
                  <Activity className="w-10 h-10 text-taf-blue group-hover:text-white" />
                </div>
                <CardTitle className="text-taf-blue">Movimento Correto</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 text-taf-gray">
                  Aprenda o movimento correto das flexões com demonstração visual e regras oficiais
                </CardDescription>
                <Button asChild className="w-full bg-taf-blue hover:bg-taf-blue-dark">
                  <Link to="/movimento-correto">Visualizar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-taf-green group-hover:text-white transition-all duration-300">
                  <Upload className="w-10 h-10 text-taf-green group-hover:text-white" />
                </div>
                <CardTitle className="text-taf-blue">Envie Sua Análise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 text-taf-gray">
                  Faça upload do seu vídeo e receba uma análise detalhada em tempo real
                </CardDescription>
                <Button asChild className="w-full bg-taf-green hover:bg-taf-green-dark">
                  <Link to="/envie-analise">Analisar Agora</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <Users className="w-10 h-10 text-purple-600 group-hover:text-white" />
                </div>
                <CardTitle className="text-taf-blue">Candidatos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 text-taf-gray">
                  Acesse os resultados e análises de todos os candidatos organizados alfabeticamente
                </CardDescription>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link to="/candidatos">Ver Candidatos</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-taf py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <div className="text-blue-200">Precisão na Análise</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">&lt;30s</div>
              <div className="text-blue-200">Tempo de Processamento</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Disponibilidade</div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
