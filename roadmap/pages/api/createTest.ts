import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import redis from '../../lib/redis'

export default async function createTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.body

  if (!title) {
    res.status(400).json({
      error: 'Feature can not be empty',
    })
  } else if (title.length < 150) {
    const id = title
    const newEntry = {
      id,
      title,
      created_at: Date.now(),
      score: 1,
      ip: req.headers['x-forwarded-for'] || 'NA',
    }

    await redis.hset('features', id, JSON.stringify(newEntry))
    res.status(200).json({
      body: { id },
    })
  } else {
    res.status(400).json({
      error: 'Max 150 characters please.',
    })
  }
}
