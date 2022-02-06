import React from "react";
import ElementListing from "./dashboard/ElementListing";

function Users() {

  let userTable = {
    columns: [
      { dataField: "ID", text: "ID" },
      { dataField: "Name", text: "Name" },
      { dataField: "Email", text: "Email" },
      { dataField: "Type", text: "Type" },
      { dataField: "Password", text: "Password" },
      { dataField: "RFID", text: "RFID" },
    ],
    data: [
      {
        ID: "User1",
        Name: "UserName1",
        Email: "user@email.com",
        Type: "Dispatcher",
        Password: "Password",
        RFID: "RFIDToken",
      },
      {
        ID: "User2",
        Name: "UserName2",
        Email: "user2@email.com",
        Type: "Deliverer",
        Password: "Password2",
        RFID: "RFIDToken2",
      },
    ],
  };

  return (
    <div>
      <ElementListing title="Users" element="user" table={userTable} />
    </div>);
}

export default Users;
