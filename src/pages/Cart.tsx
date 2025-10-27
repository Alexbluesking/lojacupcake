import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">Carrinho</h1>
          </div>
        </header>
        
        <main className="max-w-lg mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">Carrinho vazio</h2>
            <p className="text-muted-foreground">Adicione cupcakes deliciosos ao seu carrinho!</p>
            <Button onClick={() => navigate('/catalog')}>
              Ver Catálogo
            </Button>
          </div>
        </main>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Carrinho</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {items.map(item => (
          <Card key={item.cupcake.id} className="p-4">
            <div className="flex gap-4">
              <img
                src={item.cupcake.image}
                alt={item.cupcake.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{item.cupcake.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.cupcake.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.cupcake.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.cupcake.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-bold text-primary">
                    R$ {(item.cupcake.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-4 bg-muted">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </Card>

        <Button
          size="lg"
          className="w-full"
          onClick={() => navigate('/checkout')}
        >
          Finalizar Pedido
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
