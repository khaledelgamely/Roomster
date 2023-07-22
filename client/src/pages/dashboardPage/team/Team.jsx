import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/dashboardComponent/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const teamData = [
    {
      id: 1,
      name: "Eslam Gouda Emam",
      email: "eslamGoda342@gmail.com",
      age: 26,
      phone: "+20 1122348017",
      access: "manager",
    },
    {
      id: 2,
      name: "Ahmed Jamal Mostafa",
      email: " enggemy1999@gmail.com",
      age: 24,
      phone: "+20 1032800043",
      access: "manager",
    },
    {
      id: 3,
      name: "Ahmed mohamed ghames",
      email: "ahmedghames22@gmail.com",
      age: 23,
      phone: "+20 1060332201",
      access: "user",
    },
    {
      id: 4,
      name: "Abdulrahman Mousa Aboshahba",
      email: "AbdulrahmanMousa@gmail.com",
      age: 27,
      phone: "+20 1066737574",
      access: "admin",
    },
    {
      id: 5,
      name: "Khaled Aly Elgamely",
      email: "Khaledelgamely50@gmail.com",
      age: 26,
      phone: "+20 1552600743",
      access: "admin",
    },
    {
      id: 6,
      name: "Kareem Mahmoud Shetta",
      email: "kareemshetta8@gmail.com",
      age: 26,
      phone: "+20 1027465358",
      access: "admin",
    },
  ];
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={teamData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
