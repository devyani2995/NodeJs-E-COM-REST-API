import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
    constructor(name, email, password, type, id) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static getAll() {
        return users;
    }
}
let users = [
    {
        id: 1,
        name: 'Seller User',
        email: 'seller@ecom.com',
        password: "pwd",
        type: 'seller'
    },
    {
        id: 2,
        name: 'Customer User',
        email: 'customer@ecom.com',
        password: "pwdc",
        type: 'customer'
    },
];