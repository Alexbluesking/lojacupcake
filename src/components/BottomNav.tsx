import { Home, ShoppingCart, User, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export default function BottomNav() {
  const location = useLocation();
  const { items } = useCart();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const links = [
    { to: '/catalog', icon: Home, label: 'Catálogo' },
    { to: '/cart', icon: ShoppingCart, label: 'Carrinho' },
    { to: '/profile', icon: User, label: 'Perfil' },
    { to: '/about', icon: Info, label: 'Sobre' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-safe pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          const showBadge = to === '/cart' && itemCount > 0;
          
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors relative',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
              {showBadge && (
                <span className="absolute top-2 right-1/4 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
