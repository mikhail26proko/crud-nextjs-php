import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableContainer, TableHead, TableBody, TablePagination, TableRow, TableCell } from '@mui/material';
import Row from "../components/Row"

export const getStaticProps = async () => {
  
  const response = await fetch("http://server:80",{
    method: 'POST',
    body: JSON.stringify({"method":"readAllHead","data":""}),
  });
  const data = await response.json();
  
  if (!data) {
    return {
      notFound:true,
    }
  }

  return {
    props: { data: data },
  }
}

const Home = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return <>
    <div>
      <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell width={60}/>
                <TableCell width={100}>ID</TableCell>
                <TableCell>FULL NAME</TableCell>
                <TableCell width={200}>ADDRESS</TableCell>
                <TableCell width={200}>PHONE</TableCell>
                <TableCell width={100}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    </div>
  </>
}

export default Home;