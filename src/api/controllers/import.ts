import { promises as fs } from 'fs'
import catchErrors from '../utils/catchErrors'
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../constants/http';
import Activity from '../../models/Activity';

const importJson = catchErrors(async (_: Request, res: Response) => {
  try {
    const data = await fs.readFile('input.json', 'utf-8')

    const jsonData = JSON.parse(data);

    await Activity.insertMany(jsonData)
    res.status(OK).json({
      message: 'Archivo JSON importado correctamente',
    })
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Error al importar el archivo JSON',
    })
  }
})
export default importJson
