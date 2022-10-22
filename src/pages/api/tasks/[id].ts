import type { NextApiRequest, NextApiResponse } from 'next'
import {conn} from '../../../database/conexion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query: {id} } = req; 
  switch(method) {
    case "GET":
        const values = [id];
        const datos = await conn.query("select * from tasks where id = $1", values);
        return res.status(200).json(datos.rows)
    case "DELETE":

    case "PUT":
        return res.status(200).json({ msg: 'TEST'})
    default:
        return res.status(405).json({ msg: 'Operacion no soportada'})
  }
  
}
