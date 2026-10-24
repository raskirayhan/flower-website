import { Request, Response, NextFunction } from 'express';

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updates = req.body;
    res.json({
      success: true,
      message: 'Account profile updated successfully.',
      data: {
        id: req.user?.id || 'usr_demo',
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getDashboardStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const role = req.user?.role || 'ADMIN';

    if (role === 'USER') {
      res.json({
        success: true,
        data: {
          role: 'USER',
          kpis: [
            { label: 'Active Orders', value: '2', change: '+1 this week', trend: 'up' },
            { label: 'Saved Favorites', value: '7', change: '+3 new', trend: 'up' },
            { label: 'Loyalty Points', value: '340', change: 'Tier: VIP Flora', trend: 'neutral' },
            { label: 'Vase Life Score', value: '99.4%', change: 'Top 5% Buyers', trend: 'up' },
          ],
          recentOrders: [
            { id: 'FM-8901', item: 'Peace Lily Air Purifier', status: 'Dispatched', amount: '$38.00' },
            { id: 'FM-8902', item: 'Velvet Ecuadorian Roses', status: 'Delivered', amount: '$54.00' },
          ],
        },
      });
      return;
    }

    if (role === 'MANAGER') {
      res.json({
        success: true,
        data: {
          role: 'MANAGER',
          kpis: [
            { label: 'Daily Dispatch Orders', value: '48', change: '+14% vs yesterday', trend: 'up' },
            { label: 'Greenhouse Humidity', value: '68%', change: 'Optimal Range', trend: 'neutral' },
            { label: 'Inventory Restock Alerts', value: '3', change: 'Urgent: Peace Lily', trend: 'down' },
            { label: 'Driver Fulfillment Rate', value: '98.9%', change: 'Target >98%', trend: 'up' },
          ],
        },
      });
      return;
    }

    // Default ADMIN stats
    res.json({
      success: true,
      data: {
        role: 'ADMIN',
        kpis: [
          { label: 'Gross Revenue (MTD)', value: '$42,850', change: '+14.2% vs last month', trend: 'up' },
          { label: 'Total Orders Delivered', value: '1,280', change: '+8.6% week over week', trend: 'up' },
          { label: 'Customer Retention', value: '88.4%', change: '+3.1% benchmark', trend: 'up' },
          { label: 'Average Stems per Order', value: '18.2', change: 'Healthy bouquet size', trend: 'neutral' },
        ],
        salesTrend: [
          { month: 'May', revenue: 18400 },
          { month: 'Jun', revenue: 24200 },
          { month: 'Jul', revenue: 29800 },
          { month: 'Aug', revenue: 33500 },
          { month: 'Sep', revenue: 38900 },
          { month: 'Oct', revenue: 42850 },
        ],
        categoryBreakdown: [
          { category: 'Fresh Bouquets', percentage: 38 },
          { category: 'Indoor Greens', percentage: 26 },
          { category: 'Flowering Pots', percentage: 16 },
          { category: 'Bonsai & Exotics', percentage: 12 },
          { category: 'Succulents & Cacti', percentage: 8 },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
}
