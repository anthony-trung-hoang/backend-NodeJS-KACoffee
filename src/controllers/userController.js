import userService from "../services/userService";
import emailService from "../services/emailService";

let handleUserLogin = async (req, res) => {
    let phone = req.body.phone;
    let user_password = req.body.user_password;
    if (!phone || !user_password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let userData = await userService.handleLogin(phone, user_password);
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleCreateNewUser = async (req, res) => {
    let msg = await userService.createNewUSer(req.body);
    return res.status(200).json(
        msg
    )
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })

    let msg = await userService.deleteUser(req.body.id);
    return res.status(200).json({
        msg
    })
}

let handleEditUserInfoByPhone = async (req, res) => {
    if (!req.body.phone) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })
    let data = req.body;
    let message = await userService.editUserInfoByPhone(data);
    return res.status(200).json({
        message
    })
}

let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        users: users
    })
}

let handleGetUserById = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let user = await userService.getUserById(id);

    if (user) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            user: user
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'user with input id not exist'
        })
    }
}

let handleGetUserByPhone = async (req, res) => {
    let phone = req.query.phone;
    if (!phone) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let user = await userService.getUserByPhone(phone);
    if (user) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            user: user
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'user with input phone not exist'
        })
    }
}

let handleGetAllUsersByRole = async (req, res) => {
    let role = req.query.role;
    if (!role) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let users = await userService.getAllUsersByRole(role);

    if (users.length !== 0) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            users: users
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'role with input id not exist'
        })
    }
}

let handleVerifyPhoneAndSendMail = async (req, res) => {
    let phone = req.body.phone;
    if (!phone) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let user = await userService.getUserByPhone(phone);
    if (user) {
        let id = user.id;
        let email = user.email;
        let user_name = user.user_name;
        // get a random code 
        console.log(Math.floor(100000 + Math.random() * 900000));
        let verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
        // send this code to database
        await userService.uploadVerificationCodeToDatabase(verificationCode, id);

        // send the verification email 
        await emailService.sendEmail(email, verificationCode, user_name);

        return res.status(200).json({
            code: 0,
            message: 'Email sent',
            email: email,
            phone: phone
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'user with input phone not exist'
        })
    }
}

let handleVerifyResetPasswordCode = async (req, res) => {
    let phone = req.body.phone;
    let code = req.body.code;
    if (!phone || !code) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let checkCode = await userService.checkResetPasswordCode(code, phone);
    if (checkCode) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            user: checkCode
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'Wrong code!'
        })
    }
}

let handleResetPassword = async (req, res) => {
    if (!req.body.phone || !req.body.new_password) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })
    let phone = req.body.phone; let new_password = req.body.new_password;
    let message = await userService.resetPassword(phone, new_password);
    return res.status(200).json({
        message
    })
}

let handleRank = async (req, res) => {
    const { idUser } = req.query
    const listOrder = await userService.getRankUser(idUser)
    if(listOrder){
        res.status(200).send(listOrder)
    }else{
        res.status(401).send(listOrder)
    }
}


module.exports = {
    handleUserLogin: handleUserLogin,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUserInfoByPhone: handleEditUserInfoByPhone,
    handleGetAllUsers: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleGetUserByPhone: handleGetUserByPhone,
    handleGetAllUsersByRole: handleGetAllUsersByRole,
    handleVerifyPhoneAndSendMail: handleVerifyPhoneAndSendMail,
    handleVerifyResetPasswordCode: handleVerifyResetPasswordCode,
    handleResetPassword: handleResetPassword,
    handleRank: handleRank
}