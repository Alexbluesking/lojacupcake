import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import cupcakeHero from '@/assets/cupcake-hero.jpg';

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/catalog');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <img 
          src={cupcakeHero} 
          alt="Cupcake delicioso" 
          className="w-40 h-40 mx-auto rounded-full object-cover shadow-2xl animate-in fade-in zoom-in duration-500"
        />
        
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            Cupcake Shop
          </h1>
          <p className="text-xl text-muted-foreground">
            Os melhores cupcakes gourmet, feitos com amor e entregues na sua casa! 🧁
          </p>
        </div>

        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Button
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => navigate('/register')}
          >
            Começar Agora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => navigate('/login')}
          >
            Já tenho conta
          </Button>
        </div>
      </div>
    </div>
  );
}
