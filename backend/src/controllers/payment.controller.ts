import { Request, Response, NextFunction } from 'express';
import { createStripePaymentIntent } from '../config/stripe.js';

export async function createPaymentIntentHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { bookingId, amount = 38.0 } = req.body;

    const intent = await createStripePaymentIntent({
      amount: Number(amount),
      currency: 'usd',
      metadata: { bookingId: String(bookingId) },
    });

    res.json({
      success: true,
      data: {
        clientSecret: intent.clientSecret,
        paymentIntentId: intent.id,
        amount: Number(amount),
        currency: 'USD',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function applyCouponHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { code, orderAmount = 50.0 } = req.body;
    const cleanCode = String(code).trim().toUpperCase();

    if (cleanCode === 'BLOOM15') {
      const discount = Math.round(Number(orderAmount) * 0.15 * 100) / 100;
      res.json({
        success: true,
        message: '15% Bloom Freshness discount applied successfully!',
        data: {
          code: cleanCode,
          discountPercent: 15,
          discountAmount: discount,
          finalAmount: Math.max(0, Number(orderAmount) - discount),
        },
      });
      return;
    }

    if (cleanCode === 'VIPGREEN25') {
      const discount = Math.round(Number(orderAmount) * 0.25 * 100) / 100;
      res.json({
        success: true,
        message: '25% VIP Greenhouse Club discount applied!',
        data: {
          code: cleanCode,
          discountPercent: 25,
          discountAmount: discount,
          finalAmount: Math.max(0, Number(orderAmount) - discount),
        },
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: `Invalid or expired promotional code '${code}'. Try using 'BLOOM15'.`,
    });
  } catch (error) {
    next(error);
  }
}
