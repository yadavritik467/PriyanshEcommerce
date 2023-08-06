import nodemailer from "nodemailer";

 const sendOrderEmail = async function (props) {
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
        to:"yadavritik467@gmail.com",
        subject:props.subject,
        text:props.message
    }

    mailSender.sendMail(mailOptions,(error,info)=>{
        if (error){
            console.log("Error sending message:," , error.message)
        }else{
            console.log('message sent successfully.',props.message);
        }
    })
}

export default sendOrderEmail