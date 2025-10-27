import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'cash'>('card');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  if (items.length === 0) {
    navigate('/catalog');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order creation
    const orderId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('lastOrder', JSON.stringify({
      id: orderId,
      items,
      total,
      paymentMethod,
      address,
      status: 'preparing',
      createdAt: new Date().toISOString()
    }));
    
    clearCart();
    toast.success('Pedido realizado com sucesso!');
    navigate('/order-status');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Endereço */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={address.number}
                  onChange={(e) => setAddress({ ...address, number: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={address.complement}
                  onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={address.neighborhood}
                onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  maxLength={2}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                placeholder="00000-000"
                required
              />
            </div>
          </div>
        </Card>

        {/* Pagamento */}
        <Card className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Forma de Pagamento</h2>

          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" />
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Cartão de Crédito/Débito</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="pix" />
                <Smartphone className="h-5 w-5 text-primary" />
                <span>PIX</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="cash" />
                <Banknote className="h-5 w-5 text-primary" />
                <span>Dinheiro</span>
              </label>
            </div>
          </RadioGroup>
        </Card>

        {/* Resumo */}
        <Card className="p-4 space-y-3">
          <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
          
          {items.map(item => (
            <div key={item.cupcake.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.cupcake.name}</span>
              <span>R$ {(item.cupcake.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2)}</span>
          </div>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          Confirmar Pedido
        </Button>
      </form>
    </div>
  );
}
