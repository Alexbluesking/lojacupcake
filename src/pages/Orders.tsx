import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';

export default function Orders() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        {items.length > 0 ? (
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Você tem {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho</h2>
            <p className="text-muted-foreground">Finalize seu pedido para começar a preparação!</p>
            <Button onClick={() => navigate('/cart')}>
              Ver Carrinho
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">Nenhum pedido ainda</h2>
            <p className="text-muted-foreground">Que tal fazer seu primeiro pedido?</p>
            <Button onClick={() => navigate('/catalog')}>
              Ver Catálogo
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
