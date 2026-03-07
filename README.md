# GSAP Studies

Laboratório de animações com GSAP, construído com Vite + React + TanStack Router seguindo arquitetura **MVVM**.

## Stack

- **Vite 6** — build tool
- **React 19** — UI
- **TanStack Router** — file-based routing com type safety
- **GSAP 3** — animações
- **TypeScript** — type safety

## Setup

```bash
npm install
npm run dev
```

## Arquitetura MVVM

```
src/
├── features/
│   ├── home/
│   │   ├── model/          # dados, tipos, regras de negócio
│   │   ├── viewmodel/      # lógica de UI (hooks)
│   │   └── view/           # componentes React
│   ├── study-01-basic/
│   │   ├── model/
│   │   ├── viewmodel/
│   │   └── view/
│   └── study-XX-nome/      # template para novos estudos
│
├── routes/                  # file-based routes (TanStack Router)
│   ├── __root.tsx
│   ├── index.tsx
│   ├── study-01.tsx
│   └── ...
│
└── shared/
    ├── components/          # componentes reutilizáveis
    │   └── PageLayout/
    ├── hooks/               # hooks GSAP compartilhados
    │   └── useGsapAnimation.ts
    └── models/              # tipos compartilhados
        └── StudyRoute.model.ts
```

## Criando um novo estudo

1. **Criar feature** em `src/features/study-XX-nome/`:
   ```
   model/      → tipos e dados
   viewmodel/  → hook com lógica
   view/       → componente + CSS module
   ```

2. **Registrar rota** em `src/routes/study-XX.tsx`:
   ```tsx
   import { createFileRoute } from '@tanstack/react-router'
   import { StudyXXView } from '@/features/study-XX-nome/view/StudyXXView'

   export const Route = createFileRoute('/study-XX')({
     component: StudyXXView,
   })
   ```

3. **Adicionar ao model home** em `src/features/home/model/home.model.ts`:
   ```ts
   {
     id: 'study-XX',
     title: 'Nome do Estudo',
     description: 'Descrição breve',
     path: '/study-XX',
     tag: 'basic',
     difficulty: 'beginner',
   }
   ```

## Hooks GSAP disponíveis

```ts
// Animação simples com cleanup automático
const ref = useGsapAnimation((ctx) => {
  gsap.from('.elemento', { y: 20, opacity: 0 })
}, [deps])

// Com ScrollTrigger
const ref = useScrollAnimation((ctx) => {
  gsap.from('.card', {
    scrollTrigger: { trigger: '.card', start: 'top 80%' },
    y: 40, opacity: 0,
  })
})

// Com Timeline controlável
const { containerRef, tlRef } = useTimeline((tl, ctx) => {
  tl.from('.a', { x: -100 }).from('.b', { x: 100 }, '<')
})
```
