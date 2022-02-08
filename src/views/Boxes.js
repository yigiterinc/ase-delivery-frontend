import React, {useEffect} from "react";
import ElementListing from "./dashboard/ElementListing";

function Boxes() {

  let boxTable = {
    columns: [
      { dataField: "ID", text: "ID" },
      { dataField: "Name", text: "Name" },
      { dataField: "Address", text: "Address" },
    ],
    data: [{ ID: "Box1", Name: "BoxName1", Address: "BoxAddress1" }],
  };


  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('user')))
  }, []);


  const handleCreateBox = () => {
    console.log("creating box");
    //setShowCreate(false);
    // ToDo: Code to create new entry in database
  };

  return (
    <div>
      <ElementListing
          title="Boxes"
          element="boxes"
          table={boxTable}
      />
    </div>);
}

export default Boxes;
