const express = require('express');
const app = express(); 

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.get("/", (req, res) => {
    //truy vấn dữ liệu từ cơ sở dữ liệu
    //render ra giao diện
    
    const products = [
        { id: 1, name: "Product 1", description: "Description 1", price: 100 },
        { id: 2, name: "Product 2", description: "Description 2", price: 200 },
        { id: 3, name: "Product 3", description: "Description 3", price: 300 },
    ];

    res.render("home/home.ejs", { products });
});

app.get("/about", (req, res) => {
    res.render("about/about.ejs");
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});