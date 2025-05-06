
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UniDetails from "./pages/UniDetails";
import UberUns from "./pages/UberUns";
import Informationen from "./pages/Informationen";
import Unterlagen from "./pages/Unterlagen";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uni/:id" element={<UniDetails />} />
          <Route path="/uber-uns" element={<UberUns />} />
          <Route path="/informationen" element={<Informationen />} />
          <Route path="/unterlagen" element={<Unterlagen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
