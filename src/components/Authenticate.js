// import React, { useState, useEffect } from "react";
// import { firebaseApp, db } from "../services/firestore";

// export const Authenticate = () => {
//   const [blogs, setBlogs] = useState([]);
//   const fetchBlogs = async () => {
//     const response = db.collection("characters");
//     const data = await response.get();
//     console.log(response);
//     data.docs.forEach((item) => {
//       setBlogs([...blogs, item.data()]);
//     });
//   };
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   console.log(db);

//   return (
//     <div className="App">
//       {blogs &&
//         blogs.map((blog) => {
//           return (
//             <div className="blog-container">
//               <h4>{blog.title}</h4>
//               <p>{blog.body}</p>
//             </div>
//           );
//         })}
//     </div>
//   );
// };
