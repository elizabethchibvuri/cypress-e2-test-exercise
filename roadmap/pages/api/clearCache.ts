import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import redis from '../../lib/redis'

export default async function clearCache(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('clearing cache')
  await redis.flushall()
  res.status(200).json({})
}
