import Button from 'react-bootstrap/Button';
import { QueryParams } from '../types';

function PaginationControls(props: {queryParams: QueryParams, totalPages: number, addPageNum: () => void, reducePageNum: () => void}) {
    return (
        <div>
            {(props.totalPages == 0 || props.queryParams.queueResetPage)?
            <div>
                <p> ----- </p>
                <p> ----- </p>
            </div>:
            <div>
                <div className = 'button-container'>
                    {props.queryParams.pageNum == 0? <></> : <Button onClick = {props.reducePageNum} size = 'sm' className='btn-page'>Prev</Button>}
                    {props.queryParams.pageNum == props.totalPages-1? <></> : <Button onClick = {props.addPageNum} size = 'sm' className='btn-page'>Next</Button>}
                </div>
                <div className = 'page-indicator'> 
                    Page {props.queryParams.pageNum + 1} of {props.totalPages} 
                </div>
            </div>}
        </div>
    )
}

export default PaginationControls;