const { query } = require("express");
const User = require("./user.model");

class UserRepository {
    constructor(User) {
        this.user = User;
    }

    createUser = async ({ firstName, lastName, phoneNumber, userName, password }) => {
        return await this.user.create({
            firstName,
            lastName,
            phoneNumber,
            userName,
            password,
        });
    }

    updateUser = async (_id, { firstName, lastName, phoneNumber, userName, password }) => {
        return await this.user.findByIdAndUpdate(_id, {
            firstName,
            lastName,
            phoneNumber,
            userName,
            password,
        }, { new: true });
    }

    findUser = async ({search, page = 1 , limit = 10}) => {
        const query = search ? { userName: search } : {};
        const options = {
            skip: (page - 1) * limit,
            limit: parseInt(limit)
        };
        return await this.user.find(query).skip(options.skip).limit(options.limit);
    }

    deleteUser = async (_id) => {
        return await this.user.findByIdAndDelete(_id);
    }

    userExistsById = async (_id) => {
        return await this.user.findById(_id);
    }

    userFindOne = async(query) => {
        return await this.user.findOne(query).select("+password")
    }
}

module.exports = new UserRepository(User);
