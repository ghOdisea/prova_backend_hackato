import { promises as fs } from 'fs';  // Importación del módulo fs con promesas
import Activity from '../../models/Activity';
import catchErrors from '../utils/catchErrors';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../constants/http';

const exportJson = catchErrors(async (_: Request, res: Response) => {
      try {
            const data = await Activity.find();
            const jsonData = JSON.stringify(data, null, 2)

            await fs.writeFile('output.json', jsonData)
            res.status(OK).json({ 
                  message: 'Archivo JSON exportado correctamente' 
            })
      } catch (error) {
            res.status(INTERNAL_SERVER_ERROR).json({
                  message: 'Error al exportar el archivo JSON',
            })
      }
})

export default exportJson