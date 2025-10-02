// types.ts
export interface QueryParams {
  landfallType: string
  sortType: string
  pageSize: string
  pageNum: number
  asc: boolean
  searchTerm: string
}

export interface SetQueryParams {
  setLandfallType: React.Dispatch<React.SetStateAction<string>>
  setSortType: React.Dispatch<React.SetStateAction<string>>
  setPageSize: React.Dispatch<React.SetStateAction<string>>
  setPageNum: React.Dispatch<React.SetStateAction<number>>
  setAsc: React.Dispatch<React.SetStateAction<boolean>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export interface ApiResponse {
  data: Storm[]
}

export interface Storm {
  StormID: number
  StormName: string
  MaxWindSpeed: number
  WindSpeedAtLandfall: number
  StrictWindSpeedAtLandfall: number
  IsHurricane: boolean
  HasLiberalLandfall: boolean
  HasStrictLandfall: boolean
  LandfallDate: string 
  StrictLandfallDate: string
}