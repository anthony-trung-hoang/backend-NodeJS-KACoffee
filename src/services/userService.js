import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(5);

let handleLogin = (phone, user_password) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        let checkUserExist = await checkUserPhone(phone);
        if (checkUserExist) {
            let user = await db.User.findOne({
                where: {
                    phone: phone,
                }, raw: true
            });

            if (user) {
                // let checkPassword = bcrypt.compareSync(user_password, user.user_password);
                let checkPassword = user_password === user.user_password;
                if (checkPassword) {
                    data.code = 0;
                    data.message = 'OK';
                    delete user.user_password;
                    data.user = user;
                } else {
                    data.code = 3;
                    data.message = 'Wrong password';
                }
            } else {
                data.code = 2;
                data.message = 'Your account does not exist'
            }
        } else {
            data.code = 2;
            data.message = 'Your account does not exist'
        }

        resolve(data);
    })
}

let checkUserPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    phone: phone
                }, raw: true
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let hashPassword = (user_password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await bcrypt.hashSync(user_password, salt);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUSer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.phone === null || data.phone === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: phone"
                })
            }

            if (data.user_name === null || data.user_name === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: user_name"
                })
            }

            if (data.user_password === null || data.user_password === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: user_password"
                })
            }

            let check = await checkUserPhone(data.phone);
            if (check == true) {
                resolve({
                    code: 1,
                    message: 'Phone has been used'
                })
            } else {
                // let user_password = await hashPassword(data.user_password);
                let user_password = data.user_password;
                await db.User.create({
                    phone: data.phone,
                    user_name: data.user_name,
                    email: data.email,
                    user_password: user_password,
                    birthday: data.birthday,
                    gender: data.gender === '1' ? true : false,
                    role: data.role === "" ? 3 : data.role,
                    cart: data.cart
                })
                resolve({
                    code: 0,
                    message: "Successfully created"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userToDelete = await db.User.findOne({
                where: { id: id }
            })

            if (userToDelete) {
                await db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    code: 0,
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    code: 1,
                    message: "User not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editUserInfoByPhone = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: data.phone },
                raw: false
            })

            if (user) {
                user.user_name = data.user_name;
                user.email = data.email;
                user.birthday = data.birthday;
                user.gender = data.gender === 1 ? true : false;
                user.cart = data.cart;

                await user.save();

                resolve({
                    code: 0,
                    message: 'Successfully updated'
                })
            } else {
                resolve({
                    code: 2,
                    message: 'phone not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            users = await db.User.findAll({
                attributes: {
                    exclude: ['user_password']
                },
                raw: true
            });

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (id) {
                user = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(user);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getUserByPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (phone) {
                user = await db.User.findOne({
                    where: {
                        phone: phone
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(user);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsersByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (role) {
                users = await db.User.findAll({
                    where: {
                        role: role
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(users);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let uploadVerificationCodeToDatabase = (verificationCode, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            })

            if (user) {
                user.cart = await hashPassword(verificationCode);
                await user.save();

                resolve();
            } else {
                resolve({
                    code: 2,
                    message: 'id not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let checkResetPasswordCode = (code, phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: phone },
                raw: false
            })

            if (user) {
                let checkResetCode = bcrypt.compareSync(code, user.cart);
                if (checkResetCode) {
                    user.cart = "";
                    await user.save();
                    console.log(user);
                    resolve(user);
                } else {
                    resolve(0);
                }
                resolve();
            } else {
                resolve({
                    code: 2,
                    message: 'phone not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let resetPassword = (phone, new_password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: phone },
                raw: false
            })
            if (user) {
                // let hashedPassword = await hashPassword(new_password);
                // user.user_password = hashedPassword;

                user.user_password = new_password;
                await user.save();

                resolve({
                    code: 0,
                    message: 'Successfully reset'
                })
            } else {
                resolve({
                    code: 2,
                    message: 'Phone not found'

                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getRankUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: idUser
                }
            })
            if(user){
                let orders = await db.Order.findAll({
                    where: {
                        user_id: idUser
                    },
                    raw: false
                })
                if (orders) {
                    let arrayMoney = orders.map(item => {
                        return item.dataValues.total_price
                    })
                    let total = 0
                    arrayMoney.forEach(item => {
                        total += item
                    })
                    let rank = null
                    if(total >= 100000 && total <= 200000){
                        rank = 1
                    }else if(total > 200000 && total <= 500000){
                        rank = 2
                    }else if(total > 500000 && total <= 1000000){
                        rank = 3
                    }
                    resolve({ "rank": rank })
                } else {
                    resolve({
                        message: 'Error server: get rank user by id_user'
                    })
                }
            }else{
                resolve({
                    message: 'User id not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    createNewUSer: createNewUSer,
    deleteUser: deleteUser,
    editUserInfoByPhone: editUserInfoByPhone,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getUserByPhone: getUserByPhone,
    getAllUsersByRole: getAllUsersByRole,
    uploadVerificationCodeToDatabase: uploadVerificationCodeToDatabase,
    checkResetPasswordCode: checkResetPasswordCode,
    resetPassword: resetPassword,
    getRankUser: getRankUser
}