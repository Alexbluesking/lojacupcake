import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function OrderStatus() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (!lastOrder) {
      navigate('/catalog');
      return;
    }
    setOrder(JSON.parse(lastOrder));
  }, [navigate]);

  if (!order) return null;

  const steps = [
    { id: 'preparing', label: 'Em Preparação', icon: Clock },
    { id: 'on_the_way', label: 'A Caminho', icon: Truck },
    { id: 'delivered', label: 'Entregue', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">Status do Pedido</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Pedido Confirmado!</h2>
            <p className="text-muted-foreground">Pedido #{order.id}</p>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="font-semibold text-lg">Acompanhe seu pedido</h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                    isActive && 'bg-primary text-primary-foreground',
                    isCompleted && 'bg-primary text-primary-foreground',
                    !isActive && !isCompleted && 'bg-muted text-muted-foreground'
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      'font-semibold',
                      (isActive || isCompleted) && 'text-primary'
                    )}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="font-semibold">Itens do Pedido</h3>
          {order.items.map((item: any) => (
            <div key={item.cupcake.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.cupcake.name}</span>
              <span>R$ {(item.cupcake.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary">R$ {order.total.toFixed(2)}</span>
          </div>
        </Card>

        <Button
          size="lg"
          className="w-full"
          onClick={() => navigate('/catalog')}
        >
          Voltar ao Catálogo
        </Button>
      </main>
    </div>
  );
}
