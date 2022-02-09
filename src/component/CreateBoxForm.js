import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

function CreateBoxForm(props) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const onCreateBox = () => {
    if (!(name && address)) {
      return;
    }

    const data = {
      stationName: name,
      stationAddress: address,
    };

    console.log(data);
    props.setShowCreateModal(false);
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
        label="Box Name"
        style={{
          marginBottom: "20px",
          minWidth: "20ch",
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        required
        id="outlined-required"
        label="Box Address"
        style={{
          marginBottom: "20px",
          minWidth: "20ch",
        }}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onCreateBox()}
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

export default CreateBoxForm;
