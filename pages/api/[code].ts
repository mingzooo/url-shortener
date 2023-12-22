//쿼리스트링 재경로
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

  const {code} = req.query;
  
  if (typeof code == 'string') {
    const result = await prisma.$transaction(async (tx) => {
      const url = await tx.url.findUnique({
        where: {
          urlCode: code
        }
      })

      if (!url) return null;

      await tx.urlAnalytic.update({
        where: {
          url_id: url.id
        },
        data: {
          clicked: {
            increment: 1
          }
        }
      })
      return url;
    })

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: 'Invalid short url code'
        },
        data: {
          url: null
        }
      })
    }

    return res.redirect(result.originalUrl)
  }
}