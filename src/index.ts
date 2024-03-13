import { AppDataSource } from './data-source';
import app from './app';

AppDataSource.initialize().then(() => {
   app.get('/', (req, res) => {
   return res.json('Established connection!');
 })
  return app.listen(process.env.PORT);
})