
interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

interface EmailRecipient {
  email: string;
  name: string;
}

export class EmailService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = '', baseUrl: string = '/api/email') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async sendOrderConfirmation(
    recipient: EmailRecipient,
    orderDetails: {
      orderNumber: string;
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      currency: string;
      shippingAddress: string;
    }
  ): Promise<boolean> {
    const template = this.generateOrderConfirmationTemplate(orderDetails);
    return this.sendEmail(recipient, template);
  }

  async sendShippingNotification(
    recipient: EmailRecipient,
    shippingDetails: {
      orderNumber: string;
      trackingNumber: string;
      carrier: string;
      estimatedDelivery: Date;
    }
  ): Promise<boolean> {
    const template = this.generateShippingTemplate(shippingDetails);
    return this.sendEmail(recipient, template);
  }

  async sendPasswordReset(
    recipient: EmailRecipient,
    resetToken: string
  ): Promise<boolean> {
    const template = this.generatePasswordResetTemplate(resetToken);
    return this.sendEmail(recipient, template);
  }

  async sendWelcomeEmail(recipient: EmailRecipient): Promise<boolean> {
    const template = this.generateWelcomeTemplate();
    return this.sendEmail(recipient, template);
  }

  private async sendEmail(
    recipient: EmailRecipient,
    template: EmailTemplate
  ): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          to: recipient,
          subject: template.subject,
          html: template.htmlContent,
          text: template.textContent
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  private generateOrderConfirmationTemplate(orderDetails: any): EmailTemplate {
    const itemsHtml = orderDetails.items
      .map(item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.name}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            ${orderDetails.currency} ${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `)
      .join('');

    return {
      subject: `Order Confirmation - #${orderDetails.orderNumber}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Order Confirmation</h1>
          <p>Thank you for your order! We're excited to get your items shipped to you.</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2>Order #${orderDetails.orderNumber}</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background: #f0f0f0;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="font-weight: bold; background: #f0f0f0;">
                  <td colspan="2" style="padding: 10px;">Total</td>
                  <td style="padding: 10px; text-align: right;">
                    ${orderDetails.currency} ${orderDetails.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            
            <div style="margin-top: 20px;">
              <strong>Shipping Address:</strong><br>
              ${orderDetails.shippingAddress}
            </div>
          </div>
          
          <p>We'll send you a tracking number as soon as your order ships.</p>
          <p>Thank you for choosing NubiaGO!</p>
        </div>
      `,
      textContent: `
        Order Confirmation - #${orderDetails.orderNumber}
        
        Thank you for your order! We're excited to get your items shipped to you.
        
        Order Details:
        ${orderDetails.items.map(item => 
          `${item.name} - Qty: ${item.quantity} - ${orderDetails.currency} ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n')}
        
        Total: ${orderDetails.currency} ${orderDetails.total.toFixed(2)}
        
        Shipping Address: ${orderDetails.shippingAddress}
        
        We'll send you a tracking number as soon as your order ships.
        Thank you for choosing NubiaGO!
      `
    };
  }

  private generateShippingTemplate(shippingDetails: any): EmailTemplate {
    return {
      subject: `Your order is on its way! - #${shippingDetails.orderNumber}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Your Order Has Shipped!</h1>
          <p>Great news! Your order #${shippingDetails.orderNumber} is on its way to you.</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2>Shipping Details</h2>
            <p><strong>Tracking Number:</strong> ${shippingDetails.trackingNumber}</p>
            <p><strong>Carrier:</strong> ${shippingDetails.carrier}</p>
            <p><strong>Estimated Delivery:</strong> ${shippingDetails.estimatedDelivery.toLocaleDateString()}</p>
          </div>
          
          <p>You can track your package using the tracking number above.</p>
          <p>Thank you for your business!</p>
        </div>
      `,
      textContent: `
        Your Order Has Shipped! - #${shippingDetails.orderNumber}
        
        Great news! Your order is on its way to you.
        
        Tracking Number: ${shippingDetails.trackingNumber}
        Carrier: ${shippingDetails.carrier}
        Estimated Delivery: ${shippingDetails.estimatedDelivery.toLocaleDateString()}
        
        You can track your package using the tracking number above.
        Thank you for your business!
      `
    };
  }

  private generatePasswordResetTemplate(resetToken: string): EmailTemplate {
    const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
    
    return {
      subject: 'Reset Your NubiaGO Password',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour for security reasons.</p>
        </div>
      `,
      textContent: `
        Reset Your Password
        
        You requested to reset your password. Visit the following link to set a new password:
        ${resetUrl}
        
        If you didn't request this, you can safely ignore this email.
        This link will expire in 1 hour for security reasons.
      `
    };
  }

  private generateWelcomeTemplate(): EmailTemplate {
    return {
      subject: 'Welcome to NubiaGO!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Welcome to NubiaGO!</h1>
          <p>Thank you for joining our marketplace connecting Turkish suppliers with African markets.</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2>Get Started</h2>
            <ul>
              <li>Browse our extensive product catalog</li>
              <li>Connect with verified Turkish suppliers</li>
              <li>Enjoy secure payment and shipping</li>
              <li>Track your orders in real-time</li>
            </ul>
          </div>
          
          <p>If you have any questions, our customer support team is here to help!</p>
          <p>Happy shopping!</p>
        </div>
      `,
      textContent: `
        Welcome to NubiaGO!
        
        Thank you for joining our marketplace connecting Turkish suppliers with African markets.
        
        Get Started:
        - Browse our extensive product catalog
        - Connect with verified Turkish suppliers
        - Enjoy secure payment and shipping
        - Track your orders in real-time
        
        If you have any questions, our customer support team is here to help!
        Happy shopping!
      `
    };
  }
}

export const emailService = new EmailService();
