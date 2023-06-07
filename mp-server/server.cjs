const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
const port = process.env.PORT;

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});

// app.post("/create_preference", (req, res) => {
//     let preference = {
//         items: [
//             {
//                 //Aca van las preferencias
//             },
//         ],
//         back_urls: {
//             success: "http://localhost:4000",
//             failure: "http://localhost:4000",
//             pending: "",
//         },
//         auto_return: "approved",
//     };

//     mercadopago.preferences
//         .create(preference)
//         .then(function (response) {
//             res.json({
//                 id: response.body.id,
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

// app.get("/feedback", function (req, res) {
//     res.json({
//         Payment: req.query.payment_id,
//         Status: req.query.status,
//         MerchantOrder: req.query.merchant_order_id,
//     });
// });

// app.listen(4000, () => {
//     console.log("The server is now running on Port 4000");
// });

app.listen(port, () => {
    console.log(`The server is now running on Port ${port}`);
});
