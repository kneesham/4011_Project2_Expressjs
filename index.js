const express = require("express");

const app = express();


app.use((req, res) => {
    const method = req.method;
    const route = req.url;
    if(route ===  )



    res.end("This worked: " + route + "  " + method  );

});


const port = 3000;
app.listen(port);


console.log("listening on port: " + port);