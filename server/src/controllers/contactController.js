import { sendMail } from '../config/mail.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { getRequestMeta } from '../utils/requestMeta.js';

export async function createContactMessage(req, res, next) {
  try {
    const meta = getRequestMeta(req);
    const message = await ContactMessage.create({
      ...req.body,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent
    });

    const ownerEmail = process.env.PORTFOLIO_OWNER_EMAIL || process.env.SMTP_USER;

    await Promise.allSettled([
      ownerEmail
        ? sendMail({
            to: ownerEmail,
            subject: 'New Portfolio Inquiry Received',
            text: [
              'New Portfolio Inquiry Received',
              '',
              `Name: ${message.name}`,
              `Email: ${message.email}`,
              `Subject: ${message.subject}`,
              '',
              message.message
            ].join('\n')
          })
        : Promise.resolve(),
      sendMail({
        to: message.email,
        subject: 'Thank you for reaching out to Deeksha Gowda',
        text: [
          `Hi ${message.name},`,
          '',
          'Thank you for visiting my portfolio and sending a message. I have received your inquiry and will get back to you soon.',
          '',
          'Regards,',
          'Deeksha Gowda'
        ].join('\n')
      })
    ]);

    res.status(201).json({
      message: 'Your message was sent successfully.',
      id: message._id
    });
  } catch (error) {
    next(error);
  }
}
