const sgMail = require('@sendgrid/mail');

// Set your SendGrid API Key
sgMail.setApiKey('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');

// Function to send an email
function sendOrderEmail(email) {
  const msg = {
    to: `${email}`, // Customer's email address
    from: 'ALLANCAO@cmail.carleton.ca', // Your email address
    subject: 'Thank you for your order',
    text: 'Thank you for placing your order.',
    html: `<p>Thank you for placing your order.<p>`
  };

  sgMail.send(msg).then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
}

export {sendOrderEmail}
