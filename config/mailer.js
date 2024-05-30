async function mailer(email, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Email konfirmasi telah dikirim ke ${email} untuk ${name}.`);
            resolve(`Email konfirmasi telah dikirim ke ${email} untuk ${name}.`);
        }, 1000);
    });
}


module.exports = mailer