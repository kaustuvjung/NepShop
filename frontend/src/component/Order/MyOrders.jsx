import React, { Fragment, useEffect } from 'react'
import "./myOrders.css";
import { clearErrors, myOrders } from '../../redux/action/orderAction';
import Loader from '../layout/loader/Loader';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import LaunchIcon from '@mui/icons-material/Launch';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const MyOrders = () => {
  const { isLoading,  user } = useSelector((state) => state.auth);
  
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns =[
    { field: "id" ,headerName: "Order ID" ,minWidth:300, flex:1 },
    {
      field: "status" ,
      headerName: "Status",
      minWidth:150,
      flex:0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
      
      
    },
    {
      field: "itemsQty" ,
      headerName: "Items Qty",
      type: "number",
      minWidth:150,
      flex: 0.3
    },
    {
      field: "amount" ,
      headerName: "Amount",
      type: "number",
      minWidth:170,
      flex:0.5
    },
    {
      field: "actions" ,
      headerName: "Actions",
      type: "number",
      minWidth:150,
      flex:0.3,
      sortable: false,
      renderCell: (params) => {
        return(
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon/>
          </Link>
        )

      },
    },

  ];

  const rows = [];
 
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
        <MetaData title = {`${user?.name}-orders`} /> 
        {isLoading ? (
          <Loader/>
        ):(
          <div className="myOrdersPage">
            <DataGrid  
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
            <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>

          </div>
        )}

    </Fragment>
  )
}

export default MyOrders
