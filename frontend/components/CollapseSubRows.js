import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CollapseSubRows = ({ id, open, setOpen, delClick }) => {

	const [subRows, setSubRows] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const get = {
				"method": "readAllSubhead",
				"data": {
					"id": id
				}
			};
			const response = await fetch("http://localhost:8080", {
				method: 'POST',
				body: JSON.stringify(get),
			})

			const data = await response.json();
			setSubRows(data)
		}
		fetchData();
	}, []);

	if (!subRows) {
		return <>
			<TableRow key={id + "_child"}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ display: 'flex' }}>
							<CircularProgress />
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	} else {
		return <>
		<TableRow key={id + "_child"}>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout="auto" unmountOnExit align="center">
					<Box sx={{ margin: 1 }}>
						<Typography variant="h6" gutterBottom component="div">
							SubRows
						</Typography>
						<Table size="small" aria-label="purchases">
							<TableHead>
								<TableRow>
									<TableCell width={100}>ID</TableCell>
									<TableCell>FULL NAME</TableCell>
									<TableCell width={200}>ADDRESS</TableCell>
									<TableCell width={200}>PHONE</TableCell>
									<TableCell width={100}>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{subRows && subRows.map((item) => (
									<TableRow key={item.id}>
										<TableCell component="th" scope="row"> {item.id} </TableCell>
										<TableCell align="left">{item.full_name}</TableCell>
										<TableCell align="left">{item.address}</TableCell>
										<TableCell align="left">{item.phone}</TableCell>
										<TableCell align="left">
											<Link href={`/update/${item.id}`}>
												<EditIcon />
											</Link>
											<DeleteIcon
												margin={20}
												onClick={() => { delClick(item.id) }}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
		</>
	}

}

export default CollapseSubRows;















