import { QueryParams } from '../types.ts';
import {LANDFALL_STRING_MAPS, SORT_TYPE_STRING_MAPS} from './constants.ts'


/**
 * Pure function to construct the API command string from QueryParams.
 * This eliminates duplicated and messy string concatenation inside the component.
 */
export function buildApiCommand(params: QueryParams): string {
    const landfallSlug = LANDFALL_STRING_MAPS.get(params.landfallType) || 'UnknownLandfall';
    const sortSlug = SORT_TYPE_STRING_MAPS.get(params.sortType) || 'UnknownSort';

    // Base URL structure
    let command_string = `/storm+info/`
        + `${params.pageNum}+${params.pageSize}+`
        + `${landfallSlug}+${sortSlug}+`
        + `${params.asc}`; // true/false

    // Optional searchTerm segment
    if (params.searchTerm && params.searchTerm !== "") {
        command_string += `/${params.searchTerm}`;
    }

    return command_string;
}
