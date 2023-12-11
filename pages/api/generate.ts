import { NextApiRequest, NextApiResponse } from "next";
import { generateShortUrl, prisma } from "@/libs";
import { isWebUri } from "valid-url";

type RequestData = {
  url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  //method 오류
  if (method !== "POST") {
    return res.status(400).json({
      message: "Only POST request are allowed"
    })
  }

  const { url }: RequestData = JSON.parse(req.body);
  const host = req.headers.host;
  const { shortCode, shortUrl } = generateShortUrl(host!);

  //유효하지 않은 url
  if (!isWebUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      error: {
        message: "Invalid Url"
      },
      data: null
    })
  }

  const result = await prisma.$transaction(async (tx) => {
    //이미 입력했던 Url일 경우
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url
      }
    });

    if (originalUrl) return originalUrl;

    //새로운 url일 경우
    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode
      }
    });

    await tx.urlAnalytic.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id
          }
        }
      }
    });

    return newUrl;
  })

  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
      code: result.urlCode
    }
  })
}