import React, {useEffect, useState} from "react";
import ElementListing from "./dashboard/ElementListing";
import {createDelivery, getActiveDeliveriesByCustomerId} from "../store/slices/deliverySlice";
import {useDispatch, useSelector} from "react-redux";

function Deliveries() {

    const dispatch = useDispatch()

    const [deliveryTable, setDeliveryTable] = useState(null);

    const deliveries = useSelector(state => state.delivery)

    useEffect(async () => {
        if (deliveries && !deliveryTable) {
            const id = JSON.parse(localStorage.getItem('user')).id
            console.log(id)
            const userDeliveriesReq = await dispatch(getActiveDeliveriesByCustomerId(id))
            console.log(deliveries)

            const table = {
                columns: [
                    {dataField: "id", text: "ID/Tracking Code"},
                    {dataField: "targetPickupBox.id", text: "BoxID"},
                    {dataField: "customerId", text: "CustomerID"},
                    {dataField: "targetPickupBox.stationName", text: "Box Name"},
                    {dataField: "targetPickupBox.stationAddress", text: "Box Address"},
                    {dataField: "delivererId", text: "DelivererID"},
                    {dataField: "deliveryStatus", text: "DeliveryStatus"},
                ],
                data: deliveries
            };

            setDeliveryTable(table)
        }
    }, [deliveries]);

    const handleCreateDelivery = async (boxId, customerId, delivererId) => {
        console.log("creating delivery");
        const delivery = {
            boxId,
            customerId,
            delivererId,
        };

        const data = await dispatch(createDelivery(delivery));
        console.log(data);
        console.log('created')
    };


  return (
      deliveryTable &&
           <ElementListing
           title="Deliveries"
           element="delivery"
           table={deliveryTable}
           />
  );
}

export default Deliveries;
