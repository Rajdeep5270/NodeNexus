const admin = require('../models/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// to destroy session function 
function destroySession(req, res) {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('AdminSession');

            console.log("logout successfully...");
            return res.redirect('/');
        }
        return res.redirect('/dashboardPage');
    })
}

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
        const adminFound = await admin.findOne({ email: req.body.email });

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

        req.flash('success', `Welcome back ${adminFound.firstName} ${adminFound.lastName}`);
        console.log("Admin login successfully...");
        return res.redirect('/dashboardPage');
    } catch (e) {
        req.flash('error', "Something went wrong")
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
        const findAdmin = res.locals.findAdmin;

        const { curr_pass, new_pass, conf_pass } = req.body;

        if (curr_pass != findAdmin.password) {
            req.flash('error', "Current password is wrong");
            console.log("Current password is wrong.");
            return res.redirect('/changePasswordPage');
        }

        if (new_pass == findAdmin.password) {
            req.flash('error', "New and old password are same")
            console.log("New and old password are same.");
            return res.redirect('/changePasswordPage');
        }

        if (new_pass != conf_pass) {
            req.flash('error', "New password and confirm password not matched")
            console.log("New password and confirm password not matched");
            return res.redirect('/changePasswordPage');
        }

        const changedPassword = await admin.findByIdAndUpdate(findAdmin.id, { password: conf_pass }, { new: true });

        if (!changedPassword) {
            req.flash('error', "Password not changed");
            console.log("Password not changed");
            return res.redirect('/changePasswordPage');
        }

        req.flash('success', "Password changed successfully")
        console.log("Password is changed");
        destroySession(req, res);
    } catch (e) {
        req.flash('error', "Something went wront");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// admin page 
module.exports.profilePage = async (req, res) => {
    try {
        return res.render('profile/profilePage');
    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// email verification page rendering 
module.exports.verifyEmailPage = (req, res) => {
    return res.render('auth/emailVerifyPage');
}

// verify email logic 
module.exports.verifyEmail = async (req, res) => {
    try {
        const adminVerify = await admin.findOne(req.body);

        if (!adminVerify) {
            req.flash('error', "Admin not found");
            console.log("Admin not found...");
            return res.redirect('/verify-email');
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
        return res.redirect('/verifyOtpPage');

    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// otp verification page rendering 
module.exports.verifyOtpPage = (req, res) => {
    if (!req.cookies.OTP) {
        console.log("Bahut hoshiyar bante ho...");
        return res.redirect('/');
    }
    return res.render('auth/otp-verification');
}

// verify otp logic and redirecting new password page 
module.exports.verifyOtp = (req, res) => {
    try {
        if (req.body.adminOTP !== req.cookies.OTP) {
            req.flash('error', "OTP not matched");
            console.log("OTP not matched...");
            return res.redirect('/verifyOtpPage');
        }

        return res.redirect('/changePasswordThroughOTPPage');

    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// change password through otp page rendering 
module.exports.changePasswordThroughOTPPage = (req, res) => {
    try {
        res.clearCookie('OTP');

        if (!req.cookies.id) {
            return res.redirect('/');
        }

        return res.render('auth/changePasswordThroughOTP');
    } catch (err) {
        req.flash("Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// change password through otp logic 
module.exports.changePasswordThroughOTP = async (req, res) => {
    try {
        if (req.body.newPassword !== req.body.confirmPassword) {
            req.flash('error', "New and confirm password not matched");
            console.log("New and confirm password not matched...");
            return res.redirect('/changePasswordThroughOTPPage');
        }

        const adminFound = await admin.findByIdAndUpdate(req.cookies.id, { password: req.body.newPassword }, { new: true });

        console.log(adminFound);

        if (!adminFound) {
            req.flash('error', "Admin not found");
            console.log("Admin not found...");
            return res.redirect('/changePasswordThroughOTPPage');
        }

        req.flash('success', "Password changed successfully");
        console.log("Password changed successfully...");
        res.clearCookie('id');
        return res.redirect('/');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", err);
        res.redirect('/notFound');
    }
}

// admin logout logic 
module.exports.logout = (req, res) => {
    destroySession(req, res);
}

// dashboard page rendering 
module.exports.dashboardPage = async (req, res) => {
    try {
        return res.render('dashboard');

    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// view admin page 
module.exports.viewAdminPage = async (req, res) => {
    try {
        let allAdminData = await admin.find();
        // if some one login his data not be shown here logic 
        allAdminData = allAdminData.filter(subAdmin => subAdmin.email != res.locals.findAdmin.email)

        if (!allAdminData) {
            req.flash('error', "Admin data not found");
            console.log("Admin Data Not Found");
            res.redirect('/notFound');
        }

        console.log("Admin Data Found")
        return res.render('viewAll', { allAdminData });

    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// add admin form page rendering 
module.exports.addAdminFormPage = async (req, res) => {
    try {
        return res.render('addForm');

    } catch (e) {
        req.flash('error', "Something went wrong");
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
            req.flash('error', "Admin insertion unsuccessfull");
            console.log("Admin Insertion Unsuccessfull...");
            return res.redirect('/notFound');
        }

        req.flash('success', "Admin insertion successfull");
        console.log("Admin Added Successfully...");
    }
    catch (e) {
        req.flash('error', "Something went wrong");
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
            req.flash('error', "Admin deletion failed");
            console.log("Admin not deleted");
            return res.redirect('/notFound')
        }

        fs.unlink(deletedAdmin.profileImage, () => { });
        req.flash('success', `${deletedAdmin.firstName} ${deletedAdmin.lastName} deleted successfully`);
        console.log("Admin deleted successfully");
        res.redirect('/viewAdminPage');
    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

//edit admin logic 
module.exports.editAdmin = async (req, res) => {
    try {
        // console.log(req.params);
        const editAdmin = await admin.findById(req.params.id);

        res.render('editForm', { editAdmin });

    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}

// update admin logic
module.exports.updateAdmin = async (req, res) => {
    try {
        const findAdmin = res.locals.findAdmin;
        if (req.file) {
            console.log(req.file.path);
            req.body.profileImage = req.file.path;

            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body);

            fs.unlink(updatedAdmin.profileImage, () => { });

            if (!updatedAdmin) {
                req.flash('error', `${updatedAdmin.firstName} ${updatedAdmin.lastName} not updated`);
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            if (updatedAdmin.id == findAdmin.id) {
                req.flash('success', `${updatedAdmin.firstName} ${updatedAdmin.lastName} updated successfully`);
                return res.redirect('/profile');
            }

            req.flash('success', `${updatedAdmin.firstName} ${updatedAdmin.lastName} updated successfully`);
            console.log("Admin updated successfully");
        }
        else {
            const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!updatedAdmin) {
                req.flash('error', `${updatedAdmin.firstName} ${updatedAdmin.lastName} not updated`);
                console.log("Admin not updated");
                return res.redirect('/editAdmin')
            }

            if (updatedAdmin.id == findAdmin.id) {
                req.flash('success', `${updatedAdmin.firstName} ${updatedAdmin.lastName} updated successfully`);
                return res.redirect('/profile');
            }

            req.flash('success', `${updatedAdmin.firstName} ${updatedAdmin.lastName} updated successfully`);
            console.log("Admin updated successfully");
        }

        return res.redirect('/viewAdminPage')
    } catch (e) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong...");
        console.log("Error : ", e);
        res.redirect('/notFound');
    }
}