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
  stormID: number
  stormName: string
  maxWindSpeed: number
  windSpeedAtLandfall: number
  strictWindSpeedAtLandfall: number
  isHurricane: boolean
  hasLiberalLandfall: boolean
  hasStrictLandfall: boolean
  landfallDate: string 
  strictLandfallDate: string
}