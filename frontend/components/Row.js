import { useState } from 'react';
import { useRouter } from "next/router"
import Link from 'next/link'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const delClick = async (id) => {
    const del = {
        "method" : "delete",
        "data" : {
            "id" : id,
        }
    };
    await fetch("http://localhost:8080",{
        method: 'POST',
        body: JSON.stringify(del),
    }).then((res)=>{console.log(res)})
}

const Row = (props) => {

    const { row } = props;


    const [open, setOpen] = useState(false);

    const openButton = (haveAChild) => {
        
    
        if (!haveAChild) return <></>
    
        return <>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </>
    }

    return (
        <>
            <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {openButton(row.child)}
                </TableCell>
                <TableCell component="th" scope="row"> {row.id} </TableCell>
                <TableCell align="left">{row.full_name}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                    <Link href={`/update/${row.id}`}>
                        <EditIcon />
                    </Link>
                    <DeleteIcon 
                        margin={20}
                        onClick={()=>{delClick(row.id)}}
                    />
                </TableCell>
            </TableRow>
            <TableRow key={row.id+"_child"}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        Тут данные подчиненных предприятий
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Row;