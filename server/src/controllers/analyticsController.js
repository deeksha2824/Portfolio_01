import { VisitorEvent } from '../models/VisitorEvent.js';
import { getRequestMeta } from '../utils/requestMeta.js';

export async function trackVisit(req, res, next) {
  try {
    const meta = getRequestMeta(req);
    await VisitorEvent.create({
      eventType: 'visit',
      visitorId: String(req.body.visitorId || 'anonymous'),
      path: String(req.body.path || '/'),
      ...meta
    });

    res.status(201).json({ message: 'Visit tracked.' });
  } catch (error) {
    next(error);
  }
}

export async function trackResumeDownload(req, res, next) {
  try {
    const meta = getRequestMeta(req);
    await VisitorEvent.create({
      eventType: 'resume_download',
      visitorId: String(req.body.visitorId || 'anonymous'),
      path: '/resume',
      ...meta
    });

    res.status(201).json({ message: 'Resume download tracked.' });
  } catch (error) {
    next(error);
  }
}

export async function getAnalyticsSummary(req, res, next) {
  try {
    const [totalVisitors, resumeDownloads, countries, devices] = await Promise.all([
      VisitorEvent.distinct('visitorId', { eventType: 'visit' }),
      VisitorEvent.countDocuments({ eventType: 'resume_download' }),
      VisitorEvent.aggregate([
        { $match: { eventType: 'visit' } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 }
      ]),
      VisitorEvent.aggregate([
        { $match: { eventType: 'visit' } },
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      totalVisitors: totalVisitors.length,
      resumeDownloads,
      countries: countries.map((item) => ({ label: item._id || 'Unknown', value: item.count })),
      devices: devices.map((item) => ({ label: item._id || 'Unknown', value: item.count }))
    });
  } catch (error) {
    next(error);
  }
}
