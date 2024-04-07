import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationsProps{
    pages: number;
    itemsPerPage?: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const Paginations: React.FC<PaginationsProps> = ({pages, handlePageChange}) => {
    return (
        <Stack spacing={2}>
            <Pagination count={pages}  shape="rounded" variant="outlined" color="primary" onChange={handlePageChange}/>
        </Stack>
    )
}
export default Paginations;
