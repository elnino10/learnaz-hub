import app from "./api/v1/app.js";

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
