import { prisma } from "../config/DBconnect.js";

class AnalyticsControllerClass {
  async fetchAnalytics(req, res) {
    try {
      const prismaAnalytics = await prisma.url.findMany({
        where: {
          ownerId: req.user.id,
        },
        include: {
          visits: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // Initialize a data structure to store the counts
      const visitStats = {
        browsers: {},
        devices: {},
        os: {},
        totalVisits: 0, // This will track the total visits for the user
      };

      // Loop through the urls and visits to populate distinct counts and total visits
      prismaAnalytics.forEach((url) => {
        url.visits.forEach((visit) => {
          // Increase total visits count
          visitStats.totalVisits++;

          // Count visits by browser
          if (visit.browser) {
            if (visitStats.browsers[visit.browser]) {
              visitStats.browsers[visit.browser]++;
            } else {
              visitStats.browsers[visit.browser] = 1;
            }
          }

          // Count visits by device
          if (visit.device) {
            if (visitStats.devices[visit.device]) {
              visitStats.devices[visit.device]++;
            } else {
              visitStats.devices[visit.device] = 1;
            }
          }

          // Count visits by OS
          if (visit.os) {
            if (visitStats.os[visit.os]) {
              visitStats.os[visit.os]++;
            } else {
              visitStats.os[visit.os] = 1;
            }
          }
        });
      });

      const result = await prisma.$queryRaw`
  SELECT 
    browser,
    device,
    os,
    COUNT(*) AS totalVisits
  FROM Visit
  JOIN Url ON Url.id = Visit.urlId
  WHERE Url.ownerId = ${req.user.id}
  GROUP BY browser, device, os;
`;

console.log(result);

      return res.json({
        success: true,
        message: "Analytics is fetched",
        data: prismaAnalytics,
        visitStats,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong", error });
    }
  }
}
const analyticsController = new AnalyticsControllerClass();
export default analyticsController;
