import React from "react";
import ElementListing from "./dashboard/ElementListing";
import {createDelivery} from "../store/slices/deliverySlice";

function Deliveries() {

    let deliveryTable = {
        columns: [
            { dataField: "ID", text: "ID" },
            { dataField: "BoxID", text: "BoxID" },
            { dataField: "CustomerID", text: "CustomerID" },
            { dataField: "DelivererID", text: "DelivererID" },
            { dataField: "TrackingCode", text: "TrackingCode" },
            { dataField: "DeliveryStatus", text: "DeliveryStatus" },
        ],
        data: [
            {
                ID: "Delivery1",
                BoxID: "Box1",
                CustomerID: "Customer1",
                DelivererID: "Deliverer1",
                TrackingCode: "TrackingCode1",
                DeliveryStatus: "Status1",
            },
        ],
    };

    const handleCreateDelivery = (boxId, customerId, delivererId) => {
        console.log("creating delivery");
        const delivery = {
            boxId,
            customerId,
            delivererId,
        };

        const data = createDelivery(delivery);
        console.log(data);
    };

  return (
    <ElementListing
        title="Deliveries"
        element="delivery"
        table={deliveryTable}
    />
  );
}

export default Deliveries;
