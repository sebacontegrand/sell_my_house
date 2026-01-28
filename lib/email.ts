export const dynamic = 'force-dynamic';

import { Resend } from 'resend';

interface FeedbackEmailData {
    propertyTitle: string;
    visitorName: string | null;
    visitorContact: string | null;
    impression: string;
    rating: number | null;
    propertyOwnerEmail: string;
    asesorEmail: string;
}

export async function sendFeedbackNotification(data: FeedbackEmailData) {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured, skipping email notification');
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
        propertyTitle,
        visitorName,
        visitorContact,
        impression,
        rating,
        propertyOwnerEmail,
        asesorEmail,
    } = data;

    const emailContent = `
    <h2>Nueva Retroalimentación Recibida</h2>
    <p><strong>Propiedad:</strong> ${propertyTitle}</p>
    ${visitorName ? `<p><strong>Visitante:</strong> ${visitorName}</p>` : ''}
    ${visitorContact ? `<p><strong>Contacto:</strong> ${visitorContact}</p>` : ''}
    ${rating ? `<p><strong>Calificación:</strong> ${rating}/5</p>` : ''}
    <p><strong>Impresión:</strong></p>
    <p>${impression}</p>
  `;

    const emails = [];

    // Send to property owner
    if (propertyOwnerEmail) {
        emails.push(
            resend.emails.send({
                from: 'Notificaciones <onboarding@resend.dev>',
                to: propertyOwnerEmail,
                subject: `Nueva retroalimentación para ${propertyTitle}`,
                html: emailContent,
            })
        );
    }

    // Send to asesor
    if (asesorEmail && asesorEmail !== propertyOwnerEmail) {
        emails.push(
            resend.emails.send({
                from: 'Notificaciones <onboarding@resend.dev>',
                to: asesorEmail,
                subject: `Nueva retroalimentación para ${propertyTitle}`,
                html: emailContent,
            })
        );
    }

    try {
        await Promise.all(emails);
        console.log('Feedback notification emails sent successfully');
    } catch (error) {
        console.error('Error sending feedback notification emails:', error);
        // Don't throw - we don't want to fail the feedback creation if email fails
    }
}
