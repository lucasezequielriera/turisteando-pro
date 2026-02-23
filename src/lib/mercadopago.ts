// MercadoPago API service for payments
// Documentation: https://www.mercadopago.com.ar/developers/es/docs

import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { ENV } from '@/config/env';

const MERCADOPAGO_ACCESS_TOKEN = ENV.MERCADOPAGO_ACCESS_TOKEN;
const MERCADOPAGO_WEBHOOK_SECRET = ENV.MERCADOPAGO_WEBHOOK_SECRET;

export interface MercadoPagoItem {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: 'ARS' | 'USD' | 'EUR';
}

export interface MercadoPagoPreference {
  items: MercadoPagoItem[];
  external_reference: string;
  notification_url?: string;
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: 'approved' | 'all';
  metadata?: Record<string, string>;
}

export interface MercadoPagoPaymentData {
  id: string;
  status: string;
  status_detail: string;
  external_reference: string;
  transaction_amount: number;
  currency_id: string;
  payment_method_id: string;
  payment_type_id: string;
  date_created: string;
  date_approved?: string;
  collector_id: string;
  payer: {
    email: string;
    identification?: {
      type: string;
      number: string;
    };
  };
  metadata?: Record<string, string>;
}

export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;
  private payment: Payment;

  constructor() {
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error('MERCADOPAGO_ACCESS_TOKEN is required');
    }
    
    this.client = new MercadoPagoConfig({
      accessToken: MERCADOPAGO_ACCESS_TOKEN,
      options: {
        timeout: 5000,
        idempotencyKey: 'abc'
      }
    });
    
    this.preference = new Preference(this.client);
    this.payment = new Payment(this.client);
  }

  isConfigured(): boolean {
    return !!MERCADOPAGO_ACCESS_TOKEN;
  }

  async createPreference(data: MercadoPagoPreference): Promise<{ id: string; init_point: string }> {
    try {
      const preference = await this.preference.create({
        body: {
          items: data.items,
          external_reference: data.external_reference,
          notification_url: data.notification_url,
          back_urls: data.back_urls,
          auto_return: data.auto_return || 'approved',
          metadata: data.metadata
        }
      });

      return {
        id: preference.id || '',
        init_point: preference.init_point || ''
      };
    } catch (error) {
      console.error('MercadoPago preference creation error:', error);
      throw new Error('Failed to create MercadoPago preference');
    }
  }

  async getPayment(paymentId: string): Promise<MercadoPagoPaymentData | null> {
    try {
      const payment = await this.payment.get({ id: paymentId });
      
      return {
        id: payment.id!.toString(),
        status: payment.status!,
        status_detail: payment.status_detail!,
        external_reference: payment.external_reference!,
        transaction_amount: payment.transaction_amount!,
        currency_id: payment.currency_id!,
        payment_method_id: payment.payment_method_id!,
        payment_type_id: payment.payment_type_id!,
        date_created: payment.date_created!,
        date_approved: payment.date_approved,
        collector_id: payment.collector_id!.toString(),
        payer: {
          email: payment.payer?.email || '',
          identification: payment.payer?.identification ? {
            type: payment.payer.identification.type || '',
            number: payment.payer.identification.number || ''
          } : undefined
        },
        metadata: payment.metadata
      };
    } catch (error) {
      console.error('MercadoPago payment retrieval error:', error);
      return null;
    }
  }

  verifyWebhookSignature(body: string, signature: string): boolean {
    if (!MERCADOPAGO_WEBHOOK_SECRET) {
      console.warn('MERCADOPAGO_WEBHOOK_SECRET not configured, skipping verification');
      return true;
    }

    // MercadoPago webhook verification
    // In production, you should implement proper signature verification
    // For now, we'll do basic validation
    return signature.includes('mercadopago') || signature.length > 10;
  }

  // Helper method to get payment status in Spanish
  getPaymentStatusText(status: string, statusDetail: string): string {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazado';
      case 'cancelled':
        return 'Cancelado';
      case 'refunded':
        return 'Reembolsado';
      default:
        return statusDetail || status;
    }
  }

  // Helper method to format currency
  formatCurrency(amount: number, currency: string): string {
    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    return formatter.format(amount);
  }
}

// Singleton instance
export const mercadoPagoService = new MercadoPagoService();
