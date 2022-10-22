import type { NextApiRequest, NextApiResponse } from 'next'
import {conn} from '../../../database/conexion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req; 
  switch(method) {
    case "GET":
      const datos = await conn.query("select * from tasks");
      return res.status(200).json(datos.rows)
    case "POST":
      const { title, description } = body;
      const query =
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
      const values = [title, description];
      
      const datosadd = await conn.query(query, values);

      return res.json(datosadd.rows[0]);
    default:
      return res.status(405).json({ msg: 'Operacion no soportada'})
  }
  
}
