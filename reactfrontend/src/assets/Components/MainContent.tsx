import "./MainContent.css"
import React, { useState } from 'react';
import DataTools from "./DataTools.tsx"
import DataRetriever from "./DataRetriever.tsx"
import { QueryParams, SetQueryParams } from "../types.ts";

function MainContent() {

    const [queryParams, setQueryParams] = useState<QueryParams>({
        landfallType: "Any Landfall",
        sortType: "Storm Name",
        pageSize: "20",
        pageNum: 0,
        asc: true,
        searchTerm: ""
    });


    return (
        <div className="content">
            <p>
                This includes all tropical storms and hurricanes that made landfall in Florida since 1900. The max wind speed includes the max wind speed of the storm, not necessarily the wind speed at landfall.
            </p>

            <DataTools queryParams = {queryParams} setQueryParams = {setQueryParams}/>

            <DataRetriever queryParams = {queryParams} />
        </div>
    )
}

export default MainContent