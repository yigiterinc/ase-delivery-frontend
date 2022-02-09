import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActiveDeliveriesByCustomerId,
  getDeliveries,
  getPastDeliveriesByCustomerId,
} from "../store/slices/deliverySlice";
import MaterialTable from "material-table";
import BaseModal from "./BaseModal";

import CreateDeliveryForm from "./CreateDeliveryForm";

import { Button, TextField } from "@material-ui/core";

const DeliveryTable = (props) => {
  const dispatch = useDispatch();
  const allDeliveries = useSelector((state) => state.delivery.allDeliveries);

  const pastDeliveries = useSelector(
    (state) => state.delivery.userPastDeliveries
  );
  const activeDeliveries = useSelector(
    (state) => state.delivery.userActiveDeliveries
  );

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [deliveryData, setDeliveryData] = useState();

  const [tableShown, setTableShown] = useState(false);

  useEffect(async () => {
    if (!deliveryData) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const id = user.id;

      let deliveryDataToSet;
      if (props.activeDeliveries) {
        await dispatch(getActiveDeliveriesByCustomerId({ id }));
        deliveryDataToSet = activeDeliveries;
      } else if (props.pastDeliveries) {
        await dispatch(getPastDeliveriesByCustomerId({ id }));
        deliveryDataToSet = pastDeliveries;
      } else {
        await dispatch(getDeliveries());
        deliveryDataToSet = allDeliveries;
      }

      if (deliveryDataToSet) {
        setDeliveryData(JSON.parse(JSON.stringify(deliveryDataToSet)));
        console.log(deliveryData);
      }

      setTableShown(true);
    }
  }, [
    allDeliveries,
    activeDeliveries,
    pastDeliveries,
    props.activeDeliveries,
    props.pastDeliveries,
    deliveryData,
  ]);

  const columns = [
    { field: "id", title: "ID/Tracking Code" },
    { field: "targetPickupBox.id", title: "BoxID" },
    { field: "customerId", title: "CustomerID" },
    { field: "targetPickupBox.stationName", title: "Box Name" },
    { field: "targetPickupBox.stationAddress", title: "Box Address" },
    { field: "delivererId", title: "DelivererID" },
    { field: "deliveryStatus", title: "DeliveryStatus" },
  ];

  const CreateDeliveryModal = (props) => {
    return (
      <BaseModal {...props}>
        <CreateDeliveryForm setShowCreateModal={setShowCreateModal} />
      </BaseModal>
    );
  };

  return (
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
          actions={[
            {
              icon: "add",
              tooltip: "Create a Delivery",
              position: "toolbar",
              onClick: () => {
                setShowCreateModal(true);
              },
            },
          ]}
          style={{ width: "90vw" }}
          columns={columns}
          data={deliveryData}
          title={
            props.activeDeliveries
              ? "Active Deliveries"
              : props.pastDeliveries
              ? "Past Deliveries"
              : "Deliveries"
          }
        ></MaterialTable>
      </div>

      <CreateDeliveryModal
        title={"Create Delivery"}
        openModal={showCreateModal}
        setOpenModal={setShowCreateModal}
      />
    </>
  );
};

export default DeliveryTable;
