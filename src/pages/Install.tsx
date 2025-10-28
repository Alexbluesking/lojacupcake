import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Instalação não disponível",
        description: "Use o menu do seu navegador para adicionar este app à tela inicial.",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      toast({
        title: "App instalado!",
        description: "Você pode acessar o app diretamente da sua tela inicial.",
      });
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            {isInstalled ? (
              <CheckCircle className="w-10 h-10 text-primary" />
            ) : (
              <Smartphone className="w-10 h-10 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isInstalled ? "App já instalado!" : "Instale nosso App"}
          </CardTitle>
          <CardDescription>
            {isInstalled
              ? "Você já pode acessar o app diretamente da sua tela inicial"
              : "Tenha acesso rápido aos melhores cupcakes da cidade"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isInstalled && (
            <>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>Acesso rápido direto da tela inicial</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>Funciona offline após primeira visita</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>Experiência como app nativo</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>Sem ocupar espaço na loja de apps</p>
                </div>
              </div>

              <Button
                onClick={handleInstallClick}
                className="w-full"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Instalar App
              </Button>

              <div className="text-xs text-center text-muted-foreground pt-4 border-t">
                <p className="font-semibold mb-2">Como instalar manualmente:</p>
                <p className="mb-1">
                  <strong>iPhone/iPad:</strong> Toque em <span className="font-mono bg-secondary px-1 rounded">⬆️</span> e depois em "Adicionar à Tela Inicial"
                </p>
                <p>
                  <strong>Android:</strong> Abra o menu do navegador (⋮) e toque em "Adicionar à tela inicial"
                </p>
              </div>
            </>
          )}

          {isInstalled && (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Obrigado por instalar nosso app! Agora você pode fazer pedidos ainda mais rápido.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="w-full"
                size="lg"
              >
                Voltar para o Catálogo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;
