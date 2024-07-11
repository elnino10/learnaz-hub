import app from "./api/v1/app.js";
import "dotenv/config";

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
