import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function getFormExistance(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const prelistingId  = req.query.prelistingId as string;
  
      try {
        const form = await prisma.form.findUnique({
          where: { prelistingId },
        });
  
        if (form) {
          res.status(200).json({ exists: true });
        } else {
          res.status(200).json({ exists: false });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
