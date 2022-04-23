import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {utils,writeFileXLSX,write} from 'xlsx'
import { setOrders } from "../../Redux";
import { getAllOrder } from "./index";
import OrderTable from "./Components/OrderTable";
import FilterAndPrint from "./Components/FilterAndPrint";

const OrderManagement = () => {
     const [data, setData] = useState(false);
     const dispatch = useDispatch();
     const allOrders = useSelector((state) => state.orders.value);

     useEffect(() => {
          axios.get(getAllOrder, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allOrders);
                    dispatch(setOrders({ orders: response.data.allOrders }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     console.log(allOrders);

     const FilterByMonth = (month) => {
          setData(allOrders.filter((order) => order.month === month));
          console.log(data);
     };

     const columns = [
          { title: "name", field: "name" },
          { title: "phone", field: "phone" },
          { title: "order id", field: "_id" },
          { title: "amount", field: "total", type: "numeric" },
          
     ];

     const  DownloadPdf = () => {
          console.log(allOrders);
          const doc = new jsPDF();
          doc.text("Order Report", )
          doc.autoTable({
               columns: columns.map((col) => ({ ...col, datakey: col.field })),
               body:data?data:allOrders,
          });

          doc.save("report.pdf");
     };

     const DownloadExcel =()=>{
     const worksheet = utils.json_to_sheet(data?data:allOrders)
     const workbook=  utils.book_new()
     utils.book_append_sheet(workbook,worksheet,"report")

     // let buf= write(workbook,{bookType:"xlsx",type:"buffer"} )
     write(workbook,{bookType:"xlsx",type:"binary"})
     writeFileXLSX(workbook,"report.xlsx")

     }


     return (
          <>
               <FilterAndPrint DownloadExcel={DownloadExcel} DownloadPdf={DownloadPdf} data={data} setData={setData} FilterByMonth={FilterByMonth} />
               <OrderTable data={data ? data : allOrders} />
          </>
     );
};

export default OrderManagement;
