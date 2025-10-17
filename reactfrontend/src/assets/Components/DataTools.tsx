import React from 'react';
import PaginationControls from './PaginationControls';
import { SetQueryParam } from '../types.ts';
import OptionSelector from './OptionSelector';
import Form from 'react-bootstrap/Form';
import { QueryParams } from '../types';
import './DataTools.css';
import { LANDFALL_TYPE_OPTIONS, SORT_TYPE_OPTIONS, PAGE_SIZE_OPTIONS } from './constants.ts';


function DataTools(props: {
        debouncedQueryParams: QueryParams,
        setDebouncedQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>, 
        totalPages: number 
    }) {

    const [queryParams, setQueryParams] = React.useState<QueryParams>(props.debouncedQueryParams);
    const { landfallType,searchTerm,sortType,pageSize,asc,pageNum } = queryParams
    React.useEffect(() => {
        const handler = setTimeout(() => {
            props.setDebouncedQueryParams(queryParams);
            setQueryParams(prev => ({...prev, 'queueResetPage': false}));
        }, 500); // 500ms debounce delay

        return () => (clearTimeout(handler));
    }, [landfallType,searchTerm,sortType,pageSize,asc,pageNum])

    const addPageNum = () => {
        setQueryParams(prev => ({...prev, pageNum: prev.pageNum + 1}));
    }
    const reducePageNum = () => {
        setQueryParams(prev => ({...prev, pageNum: prev.pageNum - 1}));
    }

    const setParam: SetQueryParam = ((param) => (value) =>{
            if(['landfallType', 'pageSize', 'searchTerm'].includes(param)) {
                setQueryParams(prev => ({...prev, 'queueResetPage': true, 'pageNum': 0, [param]: value}));
            }
            else{
                setQueryParams(prev => ({...prev, [param]: value}));
            }
        }
    )

    React.useEffect(() => {
        if(!props.debouncedQueryParams.queueResetPage){
            setQueryParams(prev => ({...prev, 'queueResetPage': false}));
        }
    }, [props.debouncedQueryParams.queueResetPage])

    return (
        <div className = "datatools">
            <p>{/*props.totalPages*/}</p>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        placeholder="Search for a storm:"
                        value={queryParams.searchTerm} // Make this a controlled component
                        onChange={(e) => setParam('searchTerm')(e.target.value)} // Handle change here
                    />
                </Form.Group>
            </Form>
            <div className = "smalltools">
                <OptionSelector setOptionType = {setParam('landfallType')} option = {queryParams.landfallType} optionName = 'Landfall Type' allOptions={LANDFALL_TYPE_OPTIONS}/>
                <OptionSelector setOptionType = {setParam('sortType')} option = {queryParams.sortType} optionName = 'Sort By' allOptions={SORT_TYPE_OPTIONS}/>
                <OptionSelector setOptionType = {setParam('pageSize')} option = {queryParams.pageSize} optionName = 'Page Size' allOptions={PAGE_SIZE_OPTIONS}/>
                <div>
                    <Form.Switch type="switch" id="custom-switch" label="Ascending/Descending" checked = {queryParams.asc} onChange ={(e) => setParam('asc')(e.target.checked)}/>
                    <PaginationControls queryParams = {queryParams} addPageNum = {addPageNum} reducePageNum = {reducePageNum} totalPages = {props.totalPages}/>
                </div>
            </div>
        </div>
    )
}

export default DataTools