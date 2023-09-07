export const category: Category[] = [
  {
    id: 1,
    name: "Baju",
  },
  {
    id: 2,
    name: "Sepatu",
  },
  {
    id: 3,
    name: "Celana",
  },
  {
    id: 4,
    name: "Jam",
  },
]

export interface Category {
  id? : number,
  name?: string,
}