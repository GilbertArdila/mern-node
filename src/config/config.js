import dotenv  from "dotenv";

dotenv.config();

const config = {
    secret: process.env.SECRET_WORD,
    port: process.env.PORT || 4000,
    uri: process.env.URI
  };

  export default config;