import * as React from "react"
import DataDisplay from "./DataDisplay"
import { QueryParams, Storm } from "../types.ts"

function DataRetriever(props : {queryParams: QueryParams}) {
    const [debouncedQueryParams, setDebouncedQueryParams] = React.useState(props.queryParams);
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQueryParams(props.queryParams);
        }, 500); // 500ms debounce delay

        return () => (clearTimeout(handler));
    })
    
    const [data, setData] = React.useState<Storm[] | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    //app.MapGet("/storm+info/{pageNumber}+{pageSize}+{type}+{sortBy}+{ascending}"
    const landfallStrings: Map<string, string> = new Map([
        ["Any Landfall", "any"],
        ["Liberal Landfall", "liberal"],
        ["Strict Landfall", "strict"]
    ])
    const sortTypeStrings: Map<string, string> = new Map([
        ["Storm Name", "storm_name"],
        ["Storm id", "storm_id"],
        ["Date", "landfall_date"],
        ["Max Wind Speed", "max_wind_speed"],
        ["Wind Speed at Landfall", "wind_speed_at_landfall"]
    ])

    var command_string = `/storm+info/`
    + `${props.queryParams.pageNum}+${props.queryParams.pageSize}+`
    + `${landfallStrings.get(props.queryParams.landfallType)}+${sortTypeStrings.get(props.queryParams.sortType)}+`
    +  `${props.queryParams.asc}`
    // If searchTerm is provided, append it to the command string
    if (props.queryParams.hasOwnProperty('searchTerm') && props.queryParams.searchTerm != "") {
        command_string += `/${props.queryParams.searchTerm}`;
    }

    React.useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + command_string)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data: Storm[]) => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [debouncedQueryParams]) // Only re-run the effect if debouncedQueryParams changes

    return loading? <p>Loading...</p>: error?  <p> {command_string} Error: {error} </p> : <DataDisplay data={data} />
}

export default DataRetriever