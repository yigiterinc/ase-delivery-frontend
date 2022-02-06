import React, { useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import ElementListing from "./ElementListing";
import "./Dashboard.css";
import {createDelivery} from "../../store/slices/deliverySlice";

export const DashboardView = () => {

  const [showUser, setShowUser] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const [showBox, setShowBox] = useState(false)

  // Replace with database data using the format below
  let userArray = {columns:[{dataField: 'ID', text:'ID'}, {dataField: 'Name', text:'Name'}, {dataField: 'Email', text:'Email'}, {dataField: 'Type', text:'Type'}, {dataField: 'Password', text:'Password'}, {dataField: 'RFID', text:'RFID'}],
                  data: [{ID: "User1", Name: "UserName1", Email: "user@email.com", Type: "Dispatcher", Password: "Password", RFID: "RFIDToken"},
                        {ID: "User2", Name: "UserName2", Email: "user2@email.com", Type: "Deliverer", Password: "Password2", RFID: "RFIDToken2"}]
                  };
  let deliveryArray = {columns:[{dataField: 'ID', text:'ID'}, {dataField: 'BoxID', text:'BoxID'}, {dataField: 'CustomerID', text:'CustomerID'}, {dataField: 'DelivererID', text:'DelivererID'}, {dataField: 'TrackingCode', text:'TrackingCode'}, {dataField: 'DeliveryStatus', text:'DeliveryStatus'}],
                      data: [{ID: "Delivery1", BoxID: "Box1", CustomerID: "Customer1", DelivererID: "Deliverer1", TrackingCode: "TrackingCode1", DeliveryStatus: "Status1"}]
                      };
  let boxArray = {columns:[{dataField: 'ID', text:'ID'}, {dataField: 'Name', text:'Name'}, {dataField: 'Address', text:'Address'}],
                  data: [{ID: "Box1", Name: "BoxName1", Address: "BoxAddress1"}]
                  };

  const handleCreateBox = () => {
    console.log("creating box");
    setShowCreate(false);
    // ToDo: Code to create new entry in database
  }

  const handleCreateDelivery = (boxId, customerId, delivererId) => {
    console.log("creating delivery");
    setShowCreate(false);
    const delivery = {
      boxId,
      customerId,
      delivererId
    }

    const data = createDelivery(delivery)
    console.log(data)
  }

  const handleCreateUser = () => {
    console.log("creating user");
    setShowCreate(false);
    // ToDo: Code to create new entry in database
  }

  return (
    <Container fluid>
      <Row >
        {/* Sidebar  */}
        <div style={{ display: 'flex', height: '90vh', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333" >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/dashboard" className="text-decoration-none" style={{ color: 'inherit' }} > Menu </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to ="/dashboard" onClick={() => setShowUser(!showUser)} >
                  <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/dashboard" onClick={() => setShowDelivery(!showDelivery)} >
                  <CDBSidebarMenuItem icon="people-carry">Deliveries</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/dashboard" onClick={() => setShowBox(!showBox)} >
                  <CDBSidebarMenuItem icon="box-open">Boxes</CDBSidebarMenuItem>
                </NavLink>            
                <NavLink exact to="/analytics" >
                  <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/hero404" target="_blank" >
                  <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div style={{ padding: '20px 5px',}}>
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
        <Col className="colHeight" >
          { showUser ? <ElementListing title="Users" element='user' table={userArray} /> : null }
          { showDelivery ? <ElementListing title="Deliveries" element='delivery' table={deliveryArray}/> : null }
          { showBox ? <ElementListing title="Boxes" element='box' table={boxArray} /> : null }
        </Col>
      </Row>
    </Container>
  );
};
