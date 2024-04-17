import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import'./productList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { clearErrors, deleteOrder, getAllOrders } from '../../redux/action/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const { error, orders} = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.order
    );

    const deleteOrderHandler =(id) =>{
      dispatch(deleteOrder(id));
    };


    useEffect(() =>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
          toast.error(deleteError);
          dispatch(clearErrors());
        }
        if(isDeleted){
          toast.success("order deleted sucessfully");
          navigate("/admin/orders");
          dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    },[dispatch, error, deleteError, isDeleted, navigate]);
  
    
    const columns = [
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
        flex: 0.4
      },
      {
        field: "amount" ,
        headerName: "Amount",
        type: "number",
        minWidth:170,
        flex:0.5
      },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.id)
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

    const rows = [];
    orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orserStatus
      });
    });

 

  return (
    <Fragment>
      <MetaData title={`ALL Orders- Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDers</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};


export default OrderList
