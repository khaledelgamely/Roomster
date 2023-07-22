import { Box, Button, Pagination, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/dashboardComponent/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteApartement,
  getApartments,
  getApartmentsState,
} from "../../../store/Slices/apartment";
import Roomster from "../../../API/config";
import { Modal } from "@mui/material";

const ApartmentsInfo = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const apartments = useSelector(getApartmentsState);
  console.log(apartments);

  useEffect(() => {
    dispatch(getApartments({ page: 1 }));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await Roomster.delete(`apartments/${id}`);
      dispatch(deleteApartement(id));
    } catch (error) {
      console.error(error);
    }
  };

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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
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
        <Typography color={colors.greenAccent[500]}>
          ${params.row.price}
        </Typography>
      ),
    },
    {
      field: "user",
      headerName: "Owner Name",
      flex: 0.5,
      valueGetter: (params) => params.row.user.fullName,
    },
    {
      field: "reservationsArr",
      headerName: "Reservations",
      flex: 0.7,
      renderCell: (params) => {
        const reservations = params.value;
        if (reservations && reservations.length > 0) {
          return (
            <div>
              <Button
                variant="contained"
                style={{ color: "black", background: colors.greenAccent[500] }}
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
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  console.log(selectedReservation);
  return (
    <Box m="20px">
      <Header
        title="Apartments Information"
        subtitle="List of Our Apartments Information"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={apartments}
          columns={columns}
          getRowId={(row) => row._id}
          onCellClick={handleCellClick}
          pagination
          pageSize={10}
          // onPageChange={handlePageChange}
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
              <Typography variant="h6">
                Reservation ID: {reservation.reservationId}
              </Typography>
              <Typography>
                Check-in:{" "}
                {new Date(reservation.startDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Check-out:{" "}
                {new Date(reservation.endDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Total Cost: {`${reservation.totalPrice} USD`}
              </Typography>
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

export default ApartmentsInfo;
