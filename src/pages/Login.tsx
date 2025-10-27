import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import cupcakeHero from '@/assets/cupcake-hero.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    localStorage.setItem('user', JSON.stringify({ 
      name: 'Usuário', 
      email: formData.email 
    }));
    
    toast.success('Login realizado com sucesso!');
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <img 
            src={cupcakeHero} 
            alt="Cupcake" 
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Bem-vindo de Volta!
          </h1>
          <p className="text-muted-foreground">Entre e peça seus cupcakes favoritos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Esqueci minha senha
          </button>

          <Button type="submit" size="lg" className="w-full">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-primary hover:underline font-semibold"
          >
            Cadastre-se
          </button>
        </p>
      </Card>
    </div>
  );
}
