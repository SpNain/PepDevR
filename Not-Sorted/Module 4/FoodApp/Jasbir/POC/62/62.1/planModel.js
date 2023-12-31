// plans ke liye schema aur model bna liya iss file me

const mongoose = require("mongoose");
let { PASSWORD } = require("../secrets");
const validator = require("email-validator");
let dbLink
    = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
    .connect(dbLink)
    .then(function (connection) {
        console.log("db has been conncetd")

    }).catch(function (error) {
        console.log("err", error);
    })
//mongoose -> data -> exact -> data -> that is required to form an entity 
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique 
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass the name"],  // kyunki required true hai to agr humne name pass nhi kiya to user ke pass ye wala msg jaayega
        unique: [true, "plan name should be unique"],
        // errors
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: Number,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: Number,
        required: true,

    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;  // jo discount hai wo hmesha price se kam hona chahiye
            },
            message: "Discount must be less than actual price",
        },
    },
    planImages: {
        type: [String]   // yha pe generally hum images ke urls daalte h
    }

})
// model
let planModel = mongoose.model("PABPlanModel", planSchema);
module.exports = planModel;