import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async function (props) {
    const adminEmail = process.env.Email
    const adminEmaiPass = process.env.AppPassword
    // Do not change above code before thinking... 

    let mailSender = nodemailer.createTransport({
        host:"smtp.gmail.com",
        post:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:adminEmail,
            pass:adminEmaiPass
        }
    });

    const mailOptions ={
        from:adminEmail,
        to:props.email,
        subject:"password reset",
        text:props.message
    }

    mailSender.sendMail(mailOptions,(error,info)=>{
        if (error){
            console.log("Error sending password reset email:," , error.message)
        }else{
            console.log('Password reset email sent successfully.');
        }
    })
}