import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { cupcakes } from '@/data/cupcakes';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  const filteredCupcakes = cupcakes.filter(cupcake =>
    cupcake.name.toLowerCase().includes(search.toLowerCase()) ||
    cupcake.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (cupcake: typeof cupcakes[0]) => {
    addItem(cupcake, 1);
    toast.success(`${cupcake.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4 space-y-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Cupcake Shop 🧁
          </h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cupcakes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {filteredCupcakes.map(cupcake => (
          <Card key={cupcake.id} className="overflow-hidden">
            <div className="flex gap-4 p-4">
              <img
                src={cupcake.image}
                alt={cupcake.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">{cupcake.name}</h3>
                <p className="text-sm text-muted-foreground">{cupcake.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-primary">
                    R$ {cupcake.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(cupcake)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
