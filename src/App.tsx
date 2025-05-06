
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import UniDetails from "./pages/UniDetails";
import UberUns from "./pages/UberUns";
import Informationen from "./pages/Informationen";
import Unterlagen from "./pages/Unterlagen";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { supabase } from "@/integrations/supabase/client";

// Create a client with default options and improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      // Error handling is now configured properly for TanStack Query v5
      meta: {
        onError: (error: Error) => {
          console.error("Query error:", error);
        }
      }
    },
  },
});

const App = () => {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean | null>(null);
  
  // Check Supabase connection on mount with improved error handling
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple ping to check connection
        const { data, error } = await supabase.from('universities').select('id').limit(1);
        if (error) {
          console.error("Supabase connection error:", error);
          setIsSupabaseConnected(false);
        } else {
          console.log("Supabase connection successful");
          setIsSupabaseConnected(true);
        }
      } catch (err) {
        console.error("Supabase unexpected error:", err);
        setIsSupabaseConnected(false);
      }
    };
    
    checkConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isSupabaseConnected === false && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
            Database connection issue. Please try again later.
          </div>
        )}
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
};

export default App;
