import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import MovimentoCorretoPage from "@/pages/MovimentoCorretoPage";
import EnvieAnalisePage from "@/pages/EnvieAnalisePage";
import CandidatosPage from "@/pages/CandidatosPage";
import CandidatoDetalhesPage from "@/pages/CandidatoDetalhesPage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movimento-correto" element={<MovimentoCorretoPage />} />
          <Route path="/envie-analise" element={<EnvieAnalisePage />} />
          <Route path="/candidatos" element={<CandidatosPage />} />
          <Route path="/candidato/:id" element={<CandidatoDetalhesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
