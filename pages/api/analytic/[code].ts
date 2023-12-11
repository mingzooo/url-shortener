import { prisma } from "@/libs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  
  if (method !== "GET") {
    return res.status(400).json({
      message: "only GET request are allowed"
    });
  }

  const { code } = req.query;

  if (typeof code == 'string') {
    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url: {
          urlCode: code
        }
      },
      include: {
        url: true
      }
    });

    if (!analytic) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: "Analytic not found"
        },
        data: null
      })
    }

    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        clicked: analytic.clicked,
        url: {
          originalUrl: analytic.url.originalUrl,
          shortUrl: analytic.url.shortUrl,
          code: analytic.url.urlCode,
        }
      }
    })


  }
}