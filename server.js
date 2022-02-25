const express = require("express");
const mongoose = require("mongoose");

const app = express();


app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/frontend/build', 'index.html'));

  });

// Connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/recruiter", require("./routes/api/recruiter"));
app.use("/api/listing", require("./routes/api/listing"));
app.use("/api/applicant", require("./routes/api/applicant"));
app.use("/api/application", require("./routes/api/application"));
app.use("/api/rating", require("./routes/api/rating"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port");
});
