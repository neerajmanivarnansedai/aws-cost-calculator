import React, { useEffect, useState } from "react";
// import { data } from "react-router-dom";


const orderData =
  [
    {
      "orderIdentifier": "d689b3a7-d340-4bfb-bce2-cc85e83d0b1c",
      "arrayOfOrders": [
        {
          "typeName": "compute",
          "resourceName": "EC2",
          "numberOfUnits": 3,
          "instanceType": "t2.micro",
          "regionCode": null,
          "totalCost": 25.055999999999997,
          "id": 7
        },
        {
          "typeName": "networking",
          "resourceName": "CloudFront",
          "numberOfUnits": 1,
          "instanceType": "HTTP Request",
          "regionCode": null,
          "totalCost": 5.3999999999999995,
          "id": 8
        }
      ],
      "id": 5
    },
    {
      "orderIdentifier": "afad3a4c-9a46-47e2-a188-befaced0115d",
      "arrayOfOrders": [
        {
          "typeName": "compute",
          "resourceName": "EC2",
          "numberOfUnits": 3,
          "instanceType": "t2.micro",
          "regionCode": null,
          "totalCost": 25.055999999999997,
          "id": 9
        },
        {
          "typeName": "networking",
          "resourceName": "CloudFront",
          "numberOfUnits": 1,
          "instanceType": "HTTP Request",
          "regionCode": null,
          "totalCost": 5.3999999999999995,
          "id": 10
        }
      ],
      "id": 6
    },
    {
      "orderIdentifier": "c4ed69fb-7b38-4ee5-98ea-a1f8f961e6a5",
      "arrayOfOrders": [
        {
          "typeName": "compute",
          "resourceName": "EC2",
          "numberOfUnits": 3,
          "instanceType": "t2.micro",
          "regionCode": null,
          "totalCost": 25.055999999999997,
          "id": 11
        },
        {
          "typeName": "networking",
          "resourceName": "CloudFront",
          "numberOfUnits": 1,
          "instanceType": "HTTP Request",
          "regionCode": null,
          "totalCost": 5.3999999999999995,
          "id": 12
        }
      ],
      "id": 7
    }
  ]







export default function OrdersTable() {

  const [ordersData, setOrdersData] = useState([]);
  const [thisIsError, setThisIsError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/getOrders")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setOrdersData(data); // store data in state
      })
      .catch(error => {
        setThisIsError(true);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (


    <div className="p-6 bg-slate-900 rounded-md  space-y-6">

      {thisIsError ? (
        <div className="">OOPS! There was some error fetching the data </div>


      ) : (


        ordersData.map((order) => (
          <div
            key={order.id}
            className="bg-slate-700 shadow-lg  rounded-lg shadow-lg p-4 border-slate-300"
          >
            <h2 className="text-lg font-semibold mb-4">
              Order Id:  {order.orderIdentifier.substring(1, 10)}
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-700">
                  <th className="p-2 border-t text-left">Type</th>
                  <th className="p-2 border-t text-left">Resource</th>
                  <th className="p-2 border-t text-left">Units</th>
                  <th className="p-2 border-t text-left">Instance Type</th>
                  {/* <th className="p-2 border-t text-left">Region</th> */}
                  <th className="p-2 border-t text-left">Total Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {order.arrayOfOrders.map((item) => (
                  <tr key={item.id} className="">
                    <td className="p-2 border-t">{item.typeName}</td>
                    <td className="p-2 border-t">{item.resourceName}</td>
                    <td className="p-2 border-t">{item.numberOfUnits}</td>
                    <td className="p-2 border-t">{item.instanceType}</td>
                    {/* <td className="p-2 border-t">
                    {item.regionCode || "-"}
                  </td> */}
                    <td className="p-2 border-t">
                      {item.totalCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))

      )}
    </div>
  );
}
