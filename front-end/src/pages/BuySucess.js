// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// // import "../styles/login.css";
// import gif from "../images/animation.gif";
// import "../styles/adress.delivery.css";

// function BuySucess() {
//   const navigate = useNavigate();
//   const [timer, setTimer] = useState(2);
//   const { id } = useParams();

//   const redirectTimer = () => {
//     const milliseconds = 1000;
//     setInterval(() => {
//       if (timer) {
//         setTimer(timer - 1);
//       } else {
//         navigate(`/customer/orders/${id}`);
//       }
//     }, milliseconds);
//   };

//   useEffect(() => {
//     redirectTimer();
//   }, [timer]);

//   return (
//     <div className="page-buy-sucess">
//       <img
//         alt="customer_product"
//         src={gif}
//         style={{ width: "400px", height: "400px" }}
//       />
//       <h1>Compra Realizada Com Sucessso</h1>
//     </div>
//   );
// }
// export default BuySucess;
