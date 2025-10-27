import { User, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logout realizado!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Perfil</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-6 text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name || 'Usuário'}</h2>
            <p className="text-sm text-muted-foreground">{user.email || 'email@exemplo.com'}</p>
          </div>
        </Card>

        <Card className="divide-y divide-border">
          <button
            onClick={() => navigate('/address')}
            className="flex items-center gap-3 p-4 w-full hover:bg-muted/50 transition-colors"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Endereço de Entrega</h3>
              <p className="text-sm text-muted-foreground">Gerenciar endereços</p>
            </div>
          </button>
        </Card>

        <Button
          variant="destructive"
          size="lg"
          className="w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
