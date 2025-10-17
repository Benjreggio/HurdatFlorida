// Options for the dropdowns
const LANDFALL_TYPE_OPTIONS = ["Any Landfall","Liberal Landfall","Strict Landfall"];
const SORT_TYPE_OPTIONS = ["Storm Name","Storm id","Date", "Max Wind Speed", "Wind Speed at Landfall"];
const PAGE_SIZE_OPTIONS = ["10","20","50","100"];
const LANDFALL_STRING_MAPS: Map<string, string> = new Map([
    ["Any Landfall", "Any"],
    ["Liberal Landfall", "Liberal"],
    ["Strict Landfall", "Strict"]
])
const SORT_TYPE_STRING_MAPS: Map<string, string> = new Map([
    ["Storm Name", "StormName"],
    ["Storm id", "StormID"],
    ["Date", "LandfallDate"],
    ["Max Wind Speed", "MaxWindSpeed"],
    ["Wind Speed at Landfall", "WindSpeedAtLandfall"],
])


export { LANDFALL_TYPE_OPTIONS, SORT_TYPE_OPTIONS, PAGE_SIZE_OPTIONS, LANDFALL_STRING_MAPS, SORT_TYPE_STRING_MAPS };