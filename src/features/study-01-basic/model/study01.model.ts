export interface DemoBox {
  id: string
  color: string
}

export const demoBoxes: DemoBox[] = [
  { id: 'b1', color: '#e8ff47' },
  { id: 'b2', color: '#ff6b35' },
  { id: 'b3', color: '#7c3aed' },
  { id: 'b4', color: '#06b6d4' },
  { id: 'b5', color: '#f43f5e' },
]

export const availableEasings = [
  'power1.out',
  'power2.out',
  'power3.out',
  'power4.out',
  'back.out(1.7)',
  'elastic.out(1, 0.3)',
  'bounce.out',
  'circ.out',
  'expo.out',
  'sine.out',
]
