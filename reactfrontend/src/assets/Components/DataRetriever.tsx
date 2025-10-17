import * as React from "react"
import DataDisplay from "./DataDisplay"
import { ApiResponse, QueryParams, Storm } from "../types.ts"
import { buildApiCommand } from "./buildApiCommand.tsx"
import { useState } from "react"
import DataTools from "./DataTools.tsx"

function DataRetriever() {
    const [data, setData] = React.useState<Storm[] | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    const [debouncedQueryParams, setDebouncedQueryParams] = useState<QueryParams>({
            landfallType: "Any Landfall",
            sortType: "Storm Name",
            pageSize: "20",
            pageNum: 0,
            asc: true,
            searchTerm: "",
            queueResetPage: true
        });
    
    const [totalPages, setTotalPages] = useState<number>(0);

    const { searchTerm, pageNum, pageSize, landfallType, sortType, asc } = debouncedQueryParams;

    React.useEffect(() => {

        const command_string = buildApiCommand(debouncedQueryParams);

        fetch(import.meta.env.VITE_SERVER_URL + command_string)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((response: ApiResponse) => {
                const { data, metaData } = response;
                setData(data)
                setTotalPages(metaData.totalPages)
                if(debouncedQueryParams.queueResetPage) {
                    setDebouncedQueryParams(prev => ({...prev, queueResetPage: false}))
                }
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [searchTerm, pageNum, pageSize, landfallType, sortType, asc]) // Only re-run the effect if debouncedQueryParams changes



    return <div>
        <DataTools totalPages = {totalPages} debouncedQueryParams = {debouncedQueryParams} setDebouncedQueryParams = {setDebouncedQueryParams}/>
        {loading? <p>Loading...</p>: 
        error?  <p> Error: {error} </p> : 
        <div>
            <DataDisplay data={data} />
            {<div> Page {debouncedQueryParams.pageNum + 1} of {totalPages} </div>}
        </div>}
    </div>
        
}

export default DataRetriever