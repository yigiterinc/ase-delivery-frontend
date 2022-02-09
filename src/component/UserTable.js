import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveDeliveriesByCustomerId } from "../store/slices/deliverySlice";
import MaterialTable from "material-table";
import { getAllUsers } from "../store/slices/userSlice";

const UserTable = (props) => {
  const dispatch = useDispatch();
  const users = JSON.parse(JSON.stringify(useSelector((state) => state.user)));

  const [tableShown, setTableShown] = useState(false);
  const [userData, setUserData] = useState();
  //const [deliveryTable, setDeliveryTable] = useState(null);

  useEffect(async () => {
    if (users && !tableShown) {
      await dispatch(getAllUsers());
      console.log(users);
      setUserData(users);
      setTableShown(true);
    }
  }, [users, tableShown]);

  const columns = [
    { field: "id", title: "ID" },
    { field: "email", title: "Email" },
    { field: "role", title: "Role" },
    { field: "rfid", title: "RFID" },
  ];

  return (
    tableShown && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4vh",
        }}
      >
        <MaterialTable
          style={{ width: "90vw" }}
          columns={columns}
          data={users}
          title={"Users"}
          actions={[
            {
              icon: "add",
              tooltip: "Add a user",
              position: "toolbar",
              onClick: () => {
                console.log("clicked");
              },
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...userData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setUserData([...dataUpdate]);
                  console.log(oldData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...userData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setUserData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </div>
    )
  );
};

export default UserTable;
