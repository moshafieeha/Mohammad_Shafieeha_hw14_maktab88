$(() => {
  $("#showButton").on(
    "click",
    // fetch products data
    async () => {
      const responseObject = await fetch("http://localhost:4998/product/read");
      const products = await responseObject.json();
      console.log(products);

      // create headers of table
      if (products.length === 0) return;

      const tablaleHeaders = ["row", ...Object.keys(products[0])]
        .map((column) => {
          return `<th>${column}</th>`;
        })
        .join("");
      $("table").html(`<tr>${tablaleHeaders}</tr>`);


      for (let index = 0; index < products.length; index++) {
        const product = products[index];
        console.log("forof");

        $("tbody").append(
          `<tr>
          <td>${index + 1}</td>
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>${product.rating}</td>
          <td>${product.stock}</td>
          <td>${product.brand}</td>
          <td>${product.categoary}</td>
          </tr>`
        );
      }
    }
  );
});

// function renderTable(productsData) {
//   //reset table
//   $("#table").html(`<tr>
//           <th scope="col">Row</th>
//           <th id="uid" scope="col">UID</th>
//           <th id="firstName" scope="col">First Name</th>
//           <th id="lastName" scope="col">Last Name</th>
//           <th id="city" scope="col">City</th>
//           <th id="personalCode" scope="col">Personal Code</th>
//           <th id="phoneNumber" scope="col">Phone Number</th>
//           <th id="position" scope="col">Position</th>
//         </tr>`);
//   //create rows
//   productsData.forEach((user, indexOfUser) => {
//     $("#table")[0].insertRow();
//     let newCell =
//       $("#table")[0].rows[$("#table")[0].rows.length - 1].insertCell();
//     newCell.textContent = indexOfUser + 1;
//     for (const key in user) {
//       let newCell =
//         $("#table")[0].rows[$("#table")[0].rows.length - 1].insertCell();
//       newCell.textContent = user[key];
//     }
//   });
//   //assign onclick funtion for row 1 for sorting
//   for (let i = 1; i < $("#table")[0].rows[0].cells.length; i++) {
//     let cell = $("#table")[0].rows[0].cells[i];
//     cell.onclick = () => sortData(cell.id);
//   }
//   //assign onclick funtion for each row (row 2 -...) for rendering modal
//   for (let i = 1; i < $("#table")[0].rows.length; i++) {
//     $("#table")[0].rows[i].onclick = function () {
//       let selectedUserId = this.children[1].innerText;
//       console.log(selectedUserId);
//       let userObj = getUserData(selectedUserId);
//       selectedUser = userObj;
//       renderModal(userObj);
//     };
//   }
//   //assign/update selected user and openUp modal for it
//   function getUserData(id) {
//     console.log(productsData.filter((user) => user.uid == id)[0]);
//     return productsData.filter((user) => user.uid == id)[0];
//   }
// }

// const newProduct = {
//   name: "q",
//   type: "mesvak",
//   id: 7822,
// };

// // $.ajax({
// //   type: "post",
// //   url: "/product/create",
// //   success(data) {
// //     console.log(data);
// //     products = data;
// //   },
// //   error(err) {
// //     console.log(err);
// //   },
// //   async: false,
// // });
