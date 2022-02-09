import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import { deleteBox, getBoxes } from "../store/slices/boxSlice";
import { Button } from "@material-ui/core";
import CreateBoxForm from "./CreateBoxForm";
import BaseModal from "./BaseModal";

const BoxTable = (props) => {
  const dispatch = useDispatch();
  const boxes = JSON.parse(JSON.stringify(useSelector((state) => state.box)));

  const [boxData, setBoxData] = useState();

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(async () => {
    if (boxes && !boxData) {
      await dispatch(getBoxes());
      console.log(boxes);
      if (boxes) {
        setBoxData(boxes);
      }
    }
  }, [boxes]);

  const user = JSON.parse(localStorage.getItem("user"));

  const columns = [
    { field: "id", title: "ID", editable: "never" },
    {
      field: "stationAddress",
      title: "Station Address",
      editable: user.role === "DISPATCHER" ? "onUpdate" : "never",
    },
    {
      field: "stationName",
      title: "Station Name",
      editable: user.role === "DISPATCHER" ? "onUpdate" : "never",
    },
  ];

  const CreateBoxModal = (props) => {
    return (
      <BaseModal {...props}>
        <CreateBoxForm setShowCreateModal={setShowCreateModal} />
      </BaseModal>
    );
  };

  return (
    boxes && (
      <>
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
            data={boxData}
            title={"Boxes"}
            actions={
              JSON.parse(localStorage.getItem("user")).role === "DELIVERER"
                ? [
                    {
                      icon: "add",
                      tooltip: "Create a box",
                      position: "toolbar",
                      onClick: () => {
                        setShowCreateModal(true);
                      },
                    },
                  ]
                : []
            }
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...boxData];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setBoxData([...dataUpdate]);
                    console.log(oldData);

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...boxData];
                    const index = oldData.tableData.id;
                    const idToDelete = oldData.id;
                    console.log(idToDelete);
                    dispatch(deleteBox({ id: idToDelete })).then(() => {
                      dispatch(getBoxes());
                      dataDelete.splice(index, 1);
                      setBoxData([...dataDelete]);
                    });
                    resolve();
                  }, 1000);
                }),
            }}
          ></MaterialTable>
        </div>

        <CreateBoxModal
          title={"Create Box"}
          openModal={showCreateModal}
          setOpenModal={setShowCreateModal}
        />
      </>
    )
  );
};

export default BoxTable;
