import { Cake, Heart, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Sobre</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Cupcake Shop 🧁
          </h2>
          <p className="text-muted-foreground">
            Os melhores cupcakes gourmet da cidade!
          </p>
        </div>

        <div className="grid gap-4">
          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Receitas Artesanais</h3>
            <p className="text-sm text-muted-foreground">
              Cada cupcake é feito com muito carinho usando ingredientes selecionados e receitas exclusivas.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Feito com Amor</h3>
            <p className="text-sm text-muted-foreground">
              Nosso compromisso é entregar não apenas cupcakes, mas momentos especiais e deliciosos.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Qualidade Premium</h3>
            <p className="text-sm text-muted-foreground">
              Ingredientes de primeira qualidade e um controle rigoroso em cada etapa da produção.
            </p>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
