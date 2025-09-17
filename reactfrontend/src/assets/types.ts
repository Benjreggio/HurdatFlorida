// types.ts
export interface Item {
  id: number
  name: string
  description: string
  price: number
  calories: number
}

export interface ApiResponse {
  data: Storm[]
}

export interface Storm {
  stormID: number
  stormName: string
  maxWindSpeed: number
  landfallDate: string 
}