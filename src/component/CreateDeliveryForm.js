import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createDelivery, getDeliveries } from "../store/slices/deliverySlice";

function CreateDeliveryForm(props) {
  const [createDeliveryCustomerId, setCreateDeliveryCustomerId] = useState("");
  const [createDeliveryBoxId, setCreateDeliveryBoxId] = useState("");
  const [createDeliveryDelivererId, setCreateDeliveryDelivererId] =
    useState("");

  const dispatch = useDispatch();

  const onCreateDelivery = async () => {
    if (
      !(
        createDeliveryBoxId &&
        createDeliveryCustomerId &&
        createDeliveryDelivererId
      )
    )
      return;

    const data = {
      delivererId: createDeliveryDelivererId,
      customerId: createDeliveryCustomerId,
      boxId: createDeliveryBoxId,
    };

    console.log(data);

    await dispatch(createDelivery(data));
    dispatch(getDeliveries());
    props.setShowCreateModal(false);
    props.setUpdatePerformed(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 40px",
        position: "relative",
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Customer ID"
        style={{
          marginBottom: "20px",
          minWidth: "20ch",
        }}
        value={createDeliveryCustomerId}
        onChange={(e) => setCreateDeliveryCustomerId(e.target.value)}
      />

      <TextField
        required
        id="outlined-required"
        label="Deliverer ID"
        style={{
          marginBottom: "20px",
          minWidth: "20ch",
        }}
        value={createDeliveryDelivererId}
        onChange={(e) => setCreateDeliveryDelivererId(e.target.value)}
      />

      <TextField
        required
        id="outlined-required"
        label="Box ID"
        style={{
          marginBottom: "20px",
          minWidth: "20ch",
        }}
        value={createDeliveryBoxId}
        onChange={(e) => setCreateDeliveryBoxId(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onCreateDelivery()}
        style={{
          marginTop: "15px",
          minWidth: "20ch",
        }}
      >
        Create
      </Button>
    </div>
  );
}

export default CreateDeliveryForm;
