import path from 'path';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path : path.resolve(
        process.cwd(),
        NODE_ENV === "production" ? ".env.production" : ".env"
    ),
});


if(!process.env.PORT){
    throw new Error("PORT is missing");
}
if(!process.env.DATABASE_FILE_NAME){
    throw new Error("Database file name is missing")
}

export default {
    NODE_ENV,
}