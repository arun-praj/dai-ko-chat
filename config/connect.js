const mongoose = require("mongoose");

const connect = async () => {
   try {
      const data = await mongoose.connect(
         process.env.MONGO_URI,
         {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
         },
         (e) => {
            if (e) {
               return console.log("cannot connect to database");
            }
            console.log("Database Connected");
         }
      );
   } catch (e) {
      console.log(e);
   }
};

module.exports = connect;
