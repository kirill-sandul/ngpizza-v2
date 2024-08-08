import { Ingredient } from "./ingredient.interface"

export interface IPizza {
  id: string,
  type: string,
  _category: string,
  imageUrl: string,
  name: string,
  description: string,
  types: number[],
  sizes: number[],
  prices: number[],
  rating: number
}

export interface ISelectedPizza {
  size: number,
  type: number,
  ingredients: Ingredient[],
  price: Function,
  _basePrice?: number,
  count?: number
}

export interface ICartPizza extends IPizza {
  selected: ISelectedPizza
}