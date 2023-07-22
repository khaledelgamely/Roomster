import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Roomster from '../../../API/config.jsx';
import { Box, Button, Modal, Typography ,Pagination, Divider} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ReservationDashboard = () => {
    const { user } = useSelector((state) => state.user);
    const [apartments, setApartments] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getUserApartments = async () => {
        if (user._id !== '') {
            try {
                const { data } = await Roomster.get(`user/${user._id}/apartments`);
                setApartments(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getUserApartments();
    }, [user._id]);

console.log(apartments);

    const handleCellClick = (params, event) => {
    const field = params.field;
    const row = params.row;
    if (field === "reservationsArr") {
        setSelectedReservation(row.reservationsArr);
        setIsModalOpen(true);
    }
};

    const handleCloseModal = () => {
    setSelectedReservation(null);
    setIsModalOpen(false);
    };

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: .7,
            cellClassName: "name-column--cell",
        },
        {
            field: "type",
            headerName: "Type",
            flex: 0.5,
        },
    
        {
            field: "price",
            headerName: "Cost/Night",
            flex: 0.5,
            renderCell: (params) => (
                <Typography color="black">
                ${params.row.price}
                </Typography>
            ),
        },
        {
            field: "user",
            headerName: "Owner Name",
            flex: 0.5,
            valueGetter: (params) => params.row.userId.fullName,
        },
        {
            field: "reservationsArr",
            headerName: "Reservations",
            flex: .5,
            renderCell: (params) => {
                const reservations = params.value;
            if (reservations && reservations.length > 0) {
                return (
                <div>
                    <Button
                    variant="contained"
                    style={{ color: "#f2f2f2", background: '#619364' }}
                >
                Show
                </Button>
                </div>
                );
            } else {
                return (
                <Typography style={{ color: "red" }}>No Reservation</Typography>
                );
            }
            },
        },   
];



    return (

<Box m="20px">
<h1 style={{fontFamily:'Roboto'}}>My Apartments Information </h1>

<Box
    m="40px 0 0 0"
    height="75vh"
>
<DataGrid
    
    rows={apartments}
    columns={columns}
    getRowId={(row) => row.title}
    onCellClick={handleCellClick}
    pagination
    pageSize={5}
    paginationComponent={Pagination}
/>
</Box>
<Modal open={isModalOpen} onClose={handleCloseModal}>
<Box
sx={{
position: "absolute",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)",
width: "80%",
maxWidth: 600,
bgcolor: "white",
borderRadius: 4,
boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
color: "black",
height: 400,
overflow: "auto"
}}
>
<Box
sx={{
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 1,
    py: 2,
    px: 4,
    borderBottom: "1px solid lightgray",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}}
>
<Typography variant="h5">Reservation Details</Typography>
<Button variant="contained" onClick={handleCloseModal}>
    Close
</Button>
</Box>
<Box sx={{ p: 4 }}>
{selectedReservation !== null && selectedReservation.length > 0 ? (
    <Box >
    {selectedReservation.map((reservation) => (
        <Box key={reservation.reservationId} mb={2}>
        <Typography variant="h1" sx={{fontSize:"18px"}}>
            Reservation ID: {reservation.reservationId}
        </Typography>
        <Typography sx={{fontSize:"16px" ,color:"green"}}>
            Check-in:{" "}
            {new Date(reservation.startDate).toLocaleDateString()}
        </Typography >
        <Typography sx={{fontSize:"16px",color:"red"}}>
            Check-out:{" "}
            {new Date(reservation.endDate).toLocaleDateString()}
        </Typography>
        <Typography sx={{fontSize:"16px",color:"blue"}}>
            Total Cost: {`${reservation.totalPrice} USD`}
        </Typography>
        <Divider sx={{ borderBottom: "2px solid black" }} />
        </Box>
    ))}
</Box>
) : (
    <Typography>No reservations selected</Typography>
)}
</Box>
</Box>
</Modal>

</Box>

);
};

export default ReservationDashboard;

