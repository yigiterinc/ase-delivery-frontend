import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  deleteBox,
  getBoxByDelivererId,
  getBoxes,
} from "../store/slices/boxSlice";
import CreateBoxForm from "./CreateBoxForm";
import BaseModal from "./BaseModal";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoxTable = (props) => {
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.box.boxes);

  const delivererAssignedBoxes = useSelector(
    (state) => state.box.delivererAssignedBoxes
  );

  const [boxData, setBoxData] = useState();

  const [updatePerformed, setUpdatePerformed] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(async () => {
    if (!boxData || updatePerformed) {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      console.log(userId);

      let boxesDataToSet;
      if (props.assignedBoxes) {
        await dispatch(getBoxByDelivererId({ id: userId }));
        boxesDataToSet = delivererAssignedBoxes;
      } else {
        await dispatch(getBoxes());
        boxesDataToSet = boxes;
      }

      if (boxesDataToSet) {
        setBoxData(JSON.parse(JSON.stringify(boxesDataToSet)));
        console.log(boxesDataToSet);
      }
      setUpdatePerformed(false);
    }
  }, [
    boxes,
    delivererAssignedBoxes,
    updatePerformed,
    props.assignedBoxes,
    boxData,
  ]);

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

  const ChangeStatusButton = (
    <Button type="outlined" color="primary">
      Collected
    </Button>
  );

  const CreateBoxModal = (props) => {
    return (
      <BaseModal {...props}>
        <CreateBoxForm
          setShowCreateModal={setShowCreateModal}
          setUpdatePerformed={setUpdatePerformed}
        />
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
            title={props.assignedBoxes ? "Assigned Boxes" : "Boxes"}
            actions={
              user.role === "DISPATCHER"
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
                : user.role === "DELIVERER"
                ? [
                    (rowData) => ({
                      icon: () => (
                        <FontAwesomeIcon icon="fa-solid fa-box-check" />
                      ),
                      tooltip: "Collect",
                      onClick: () => {
                        console.log("i am clicked ");
                      },
                      //disabled: rowData.status ===
                    }),
                  ]
                : []
            }
            editable={
              user.role !== "DISPATCHER"
                ? {}
                : {
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
                  }
            }
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
