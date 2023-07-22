import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/dashboardComponent/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Roomster from "../../../API/config";

import {
  deleteUser,
  getAllUserState,
} from "../../../store/Slices/AllUsersSlice";
import { Pagination } from "@mui/material";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const usersData = useSelector(getAllUserState);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await Roomster.delete(`user/${id}`);
      dispatch(deleteUser(id));
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    { field: "_id", headerName: "Registrar ID", flex: 1 },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Country",
      flex: 1,
      valueGetter: (params) => params.row.address.country,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      valueGetter: (params) => params.row.address.city,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.7,
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

  return (
    <Box m="18px">
      <Header
        title="Users Information"
        subtitle="List Of All Users Information"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            textAlign: "center", // Center all text in cells
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            textAlign: "center",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            textAlign: "center", // Center all text in cells
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            textAlign: "center", // Center all text in cells
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
            textAlign: "center", // Center all text in cells
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={usersData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          pagination
          pageSize={8}
          // onPageChange={handlePageChange}
          paginationComponent={Pagination}
        />
      </Box>
    </Box>
  );
};

export default Users;
