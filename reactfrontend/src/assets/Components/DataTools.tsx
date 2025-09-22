import React, { useState } from 'react';
import { SetQueryParams } from '../types.ts';
import OptionSelector from './OptionSelector';
import Form from 'react-bootstrap/Form';
import { QueryParams } from '../types';
import './DataTools.css';

function DataTools(props: {queryParams: QueryParams, setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>> } ) {
    const landFallTypeOptions = ["Any Landfall","Liberal Landfall","Strict Landfall"];
    const sortTypeOptions = ["Storm Name","Storm id","Date", "Max Wind Speed", "Wind Speed at Landfall"];
    const pageSizeOptions = ["10","20","50","100"];

    const setQueryParamsWrapper: SetQueryParams = {
        setLandfallType: (value: React.SetStateAction<string>) => props.setQueryParams(prev => ({...prev, landfallType: value as string})),
        setSortType: (value: React.SetStateAction<string>) => props.setQueryParams(prev => ({...prev, sortType: value as string})),
        setPageSize: (value: React.SetStateAction<string>) => props.setQueryParams(prev => ({...prev, pageSize: value as string})),
        setPageNum: (value: React.SetStateAction<number>) => props.setQueryParams(prev => ({...prev, pageNum: value as number})),
        setAsc: (value: React.SetStateAction<boolean>) => props.setQueryParams(prev => ({ ...prev, asc: value as boolean })),
        setSearchTerm: (value: React.SetStateAction<string>) => props.setQueryParams(prev => ({...prev, searchTerm: value as string}))
    };

    return (
        <div className = "datatools">
            <Form onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setQueryParamsWrapper.setSearchTerm(target.value);
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Search</Form.Label>
                    <Form.Control placeholder="Search for a storm:" />
                </Form.Group>
            </Form>
            <div className = "smalltools">
                <OptionSelector setOptionType = {setQueryParamsWrapper.setLandfallType} option = {props.queryParams.landfallType} optionName = 'Landfall Type' allOptions={landFallTypeOptions}/>
                <OptionSelector setOptionType = {setQueryParamsWrapper.setSortType} option = {props.queryParams.sortType} optionName = 'Sort By' allOptions={sortTypeOptions}/>
                <OptionSelector setOptionType = {setQueryParamsWrapper.setPageSize} option = {props.queryParams.pageSize} optionName = 'Page Size' allOptions={pageSizeOptions}/>
                <Form.Switch type="switch" id="custom-switch" label="Ascending/Descending" checked = {props.queryParams.asc} onChange ={(e) => setQueryParamsWrapper.setAsc(e.target.checked)}/>
            </div>
        </div>
    )
}


export default DataTools