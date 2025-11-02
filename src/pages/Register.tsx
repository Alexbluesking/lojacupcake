import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';
import cupcakeHero from '@/assets/cupcake-hero.jpg';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validatePassword = (password: string) => {
    const validations = {
      minLength: password.length >= 6,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noSequential: !hasSequentialNumbers(password)
    };
    return validations;
  };

  const hasSequentialNumbers = (str: string) => {
    for (let i = 0; i < str.length - 2; i++) {
      const char1 = str[i];
      const char2 = str[i + 1];
      const char3 = str[i + 2];
      
      if (/\d/.test(char1) && /\d/.test(char2) && /\d/.test(char3)) {
        const num1 = parseInt(char1);
        const num2 = parseInt(char2);
        const num3 = parseInt(char3);
        
        if (num2 === num1 + 1 && num3 === num2 + 1) {
          return true;
        }
        if (num2 === num1 - 1 && num3 === num2 - 1) {
          return true;
        }
      }
    }
    return false;
  };

  const passwordValidations = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordValidations).every(v => v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast.error('A senha não atende aos requisitos de segurança!');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ 
      name: formData.name, 
      email: formData.email 
    }));
    
    toast.success('Cadastro realizado com sucesso!');
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
            Cupcake Shop
          </h1>
          <p className="text-muted-foreground">Crie sua conta e comece a pedir!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

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
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            {formData.password && (
              <div className="space-y-1 text-xs mt-2">
                <div className={`flex items-center gap-1 ${passwordValidations.minLength ? 'text-green-600' : 'text-destructive'}`}>
                  {passwordValidations.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  <span>Mínimo de 6 caracteres</span>
                </div>
                <div className={`flex items-center gap-1 ${passwordValidations.hasSpecialChar ? 'text-green-600' : 'text-destructive'}`}>
                  {passwordValidations.hasSpecialChar ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  <span>Contém caractere especial (!@#$%^&*...)</span>
                </div>
                <div className={`flex items-center gap-1 ${passwordValidations.noSequential ? 'text-green-600' : 'text-destructive'}`}>
                  {passwordValidations.noSequential ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  <span>Sem números sequenciais (123, 321, etc.)</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            {formData.confirmPassword && (
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                formData.password === formData.confirmPassword ? 'text-green-600' : 'text-destructive'
              }`}>
                {formData.password === formData.confirmPassword ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                <span>{formData.password === formData.confirmPassword ? 'As senhas coincidem' : 'As senhas não coincidem'}</span>
              </div>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Cadastrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:underline font-semibold"
          >
            Fazer login
          </button>
        </p>
      </Card>
    </div>
  );
}
