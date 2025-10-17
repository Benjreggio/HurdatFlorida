// types.ts
export interface QueryParams {
  landfallType: string
  sortType: string
  pageSize: string
  pageNum: number
  asc: boolean
  searchTerm: string
  queueResetPage: boolean
}

export interface SetQueryParams {
  setLandfallType: React.Dispatch<React.SetStateAction<string>>
  setSortType: React.Dispatch<React.SetStateAction<string>>
  setPageSize: React.Dispatch<React.SetStateAction<string>>
  setPageNum: React.Dispatch<React.SetStateAction<number>>
  setAsc: React.Dispatch<React.SetStateAction<boolean>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  setQueueResetPage: React.Dispatch<React.SetStateAction<boolean>>
}

/*export type SetQueryParam = <K extends keyof QueryParams>(
    param: K,
    value: QueryParams[K] | ((prevState: QueryParams[K]) => QueryParams[K])
) => void;*/

export type SetQueryParam = <K extends keyof QueryParams>
(param: K) => (value: QueryParams[K]) => void;


export interface ApiResponse {
  data: Storm[],
  metaData: MetaData
}

export interface MetaData {
  totalPages: number
  currentPage: number
  pageSize: number
  totalRecords: number
}

export interface Storm {
  StormID: string
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