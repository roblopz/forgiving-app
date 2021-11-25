
export function getHateString(hateValue: number) {
  if (hateValue === 0) return 'Indiferencia';
  else if (hateValue === -100) return 'Amor incondicional';
  else if (hateValue === 100) return 'Odio máximo';
  else if (hateValue < 0) return 'Amor';
  else return 'Odio';
}