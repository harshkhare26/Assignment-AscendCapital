const apiURL =
  process.env.NODE_ENV === "production"
    ? "http://ec2-44-234-20-223.us-west-2.compute.amazonaws.com:5000"
    : "http://localhost:5000";

export default apiURL;
