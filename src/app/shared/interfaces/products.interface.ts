import { IPizza } from "./pizza.interface";

export interface IProduct {
  id: string,
  type: string,
  _category: string,
  imageUrl: string,
  name: string,
  description: string,
  price: number,
  weight: number,
  capacity: number,
  rating: number,
  selected: {
    price?: Function,
    _basePrice?: number,
    count?: number
  }
}

export type IProducts = (IPizza | IProduct)[];