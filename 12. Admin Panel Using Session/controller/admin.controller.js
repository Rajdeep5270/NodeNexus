const admin = require('../models/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// login page rendering 
module.exports.loginPage = async (req, res) => {
    try {
        return res.render('auth/loginPage');
    }
    catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// admin login logic 
module.exports.adminLogin = async (req, res) => {
    try {
        // const adminFound = await admin.findOne({ email: req.body.email });

        // if (!adminFound) {
        //     console.log("Admin not found...");
        //     return res.redirect('/');
        // };

        // // for debugging 
        // // console.log(req.body.password);
        // // console.log(adminFound.password);

        // if (req.body.password !== adminFound.password) {
        //     console.log("Password not match");
        //     return res.redirect('/');
        // };

        // res.cookie("adminId", adminFound.id);

        console.log("Admin login successfully...");
        return res.redirect('/dashboardPage');
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// change password page rendering
module.exports.changePasswordPage = async (req, res) => {
    try {
        return res.render('auth/changePasswordPage');
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// change password logic 
module.exports.changePassword = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }

        console.log(req.body);

        const { curr_pass, new_pass, conf_pass } = req.body;

        if (curr_pass != findAdmin.password) {
            console.log("Current password in wrong.");
            return res.redirect('/changePasswordPage');
        }

        if (new_pass == findAdmin.password) {
            console.log("New and old password are same.");
            return res.redirect('/changePasswordPage');
        }

        if (new_pass != conf_pass) {
            console.log("New password and confirm password not matched");
            return res.redirect('/changePasswordPage');
        }

        const changedPassword = await admin.findByIdAndUpdate(findAdmin.id, { password: conf_pass }, { new: true });

        if (!changedPassword) {
            console.log("Password not changed");
            return res.redirect('/changePasswordPage');
        }

        console.log("Password is Changed");
        res.clearCookie('adminId');
        return res.redirect('/');
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// admin page 
module.exports.profilePage = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }

        return res.render('profile/profilePage', { findAdmin });
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// verify email logic 
module.exports.verifyEmail = async (req, res) => {
    try {
        const adminVerify = await admin.findOne(req.body);

        if (!adminVerify) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        // console.log(adminVerify);
        const OTP = Math.floor(100000 + Math.random() * 900000);

        // send otp logic 
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "rajdeep11559@gmail.com",
                pass: "pumgraithtnfqdgy"
            }
        });

        // email transporter 
        const info = await transporter.sendMail({
            from: 'Admin Panel <rajdeep11559@gmail.com>',
            to: req.body.email,
            subject: 'Verification Code: Admin Panel',
            html: `
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Admin Panel</a>
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>Thank you for choosing Admin Panel. Use the following OTP to complete your sign-in procedures. OTP is valid for 5 minutes.</p>
        <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">
          ${OTP}
        </h2>
        <p style="font-size: 0.9em;">Regards,<br />Admin Panel Team</p>
        <hr style="border: none; border-top: 1px solid #eee" />
        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
          <p>Admin Panel Inc</p>
          <p>India</p>
        </div>
      </div>
    </div>
    `
        });

        res.cookie("OTP", OTP);
        res.cookie("id", adminVerify.id);
        // console.log(info.messageId);

        // otp page rendering 
        return res.render('auth/otp-verification');

    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// verify otp logic and redirecting new password page 
module.exports.verifyOtp = (req, res) => {
    try {
        if (req.body.adminOTP !== req.cookies.OTP) {
            console.log("OTP not matched...");
            return res.redirect('/');
        }

        return res.redirect('/changePasswordThroughOTPPage');

    } catch (err) {
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// change password through otp page rendering 
module.exports.changePasswordThroughOTPPage = (req, res) => {
    try {
        if (!req.cookies.OTP) {
            console.log("Bahut hoshiyar bante ho...");
            return res.redirect('/dashboardPage');
        }

        console.log("OTP found...");
        res.clearCookie('OTP');
        return res.render('auth/changePasswordThroughOTP');
    } catch (err) {
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// change password through otp logic 
module.exports.changePasswordThroughOTP = async (req, res) => {
    try {
        if (req.body.newPassword !== req.body.confirmPassword) {
            console.log("New and confirm password not matched...");
            return res.redirect('/changePasswordThroughOTPPage');
        }

        const adminFound = await admin.findByIdAndUpdate(req.cookies.id, { password: req.body.newPassword }, { new: true });

        console.log(adminFound);

        if (!adminFound) {
            console.log("Admin not found...");
            return res.redirect('/changePasswordThroughOTPPage');
        }

        console.log("Password changed successfully...");
        res.clearCookie('id');
        return res.redirect('/');
    } catch (err) {
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// admin logout logic 
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    res.redirect('/');
}

// dashboard page rendering 
module.exports.dashboardPage = async (req, res) => {
    try {
        // const findAdmin = await admin.findById(req.cookies.adminId);

        // if (req.cookies.adminId == undefined && !findAdmin) {
        //     return res.redirect('/');
        // }

        return res.render('dashboard');

    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// view admin page 
module.exports.viewAdminPage = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }

        let allAdminData = await admin.find();

        // if some one login his data not be shown here logic 
        allAdminData = allAdminData.filter(subAdmin => subAdmin.email != findAdmin.email)

        if (!allAdminData) {
            console.log("Admin Data Not Found");
            res.redirect('/notFound');
        }

        console.log("Admin Data Found")
        return res.render('viewAll', { allAdminData, findAdmin });

    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// add admin form page rendering 
module.exports.addAdminFormPage = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }

        return res.render('addForm', { findAdmin });

    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// error page rendering 
module.exports.notFound = (req, res) => {
    return res.render('error');
}

// admin details adding logic  && image uploading 
module.exports.addEmployeeDetails = async (req, res) => {
    try {
        // image adding logic before add admin 
        // console.log(req.file);
        req.body.profileImage = req.file.path;

        const adminAdded = await admin.create(req.body);

        if (!adminAdded) {
            console.log("Admin Insertion Unsuccessfull...");
            return res.redirect('/notFound');
        }

        console.log("Admin Added Successfully...");
    }
    catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound')
    }
    return res.redirect("/viewAdminPage");
}

// delete admin logic 
module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await admin.findByIdAndDelete(req.params.id);
        console.log(deletedAdmin);

        if (!deletedAdmin) {
            console.log("Admin not deleted");
            return res.redirect('/notFound')
        }

        fs.unlink(deletedAdmin.profileImage, () => { });
        console.log("Admin deleted successfully");
        res.redirect('/viewAdminPage');
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

//edit admin logic 
module.exports.editAdmin = async (req, res) => {
    try {
        const findAdmin = await admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !findAdmin) {
            return res.redirect('/');
        }
        // console.log(req.params);
        const editAdmin = await admin.findById(req.params.id);

        res.render('editForm', { editAdmin, findAdmin });

    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// update admin logic
module.exports.updateAdmin = async (req, res) => {
    try {
        // console.log(req.file);
        if (req.file) {
            const findAdmin = await admin.findById(req.cookies.adminId);
            // console.log(findAdmin);

            // if (req.cookies.adminId == undefined && !findAdmin) {
            //     return res.redirect('/');
            // }

            console.log(req.file.path);
            req.body.profileImage = req.file.path;

            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(updatedAdmin.profileImage, () => { });

            if (!updatedAdmin) {
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            if (updatedAdmin.id == findAdmin.id) {
                return res.redirect('/profile');
            }

            console.log("Admin updated successfully");
        }
        else {
            const findAdmin = await admin.findById(req.cookies.adminId);

            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body);

            if (!updatedAdmin) {
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            if (updatedAdmin.id == findAdmin.id) {
                return res.redirect('/profile');
            }

            console.log("Admin updated successfully");
        }

        return res.redirect('/viewAdminPage')
    } catch (e) {
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}