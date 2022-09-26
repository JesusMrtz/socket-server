import { Router } from 'express';
import Server from '../classes/server';


const router = Router();

router.get('/messages', (request, response) => {
  response.json({
    ok: true,
    message: `That's OK`
  });
});

router.post('/messages', (request, response) => {
  const message = request.body.message;
  const from = request.body.from;

  const payload = {
    from,
    message
  }

  const server = Server.instance;
  /** Enviar mensaje a ese usuario en particular por medio de una petición REST */
  server.io.emit('new-message', payload);

  response.json({
    ok: true,
    message,
    from
  });

  response.json({
    ok: true,
    message,
    from
  });
});


router.post('/messages/:id', (request, response) => {
  const message = request.body.message;
  const from = request.body.from;
  const id = request.params.id;
  const payload = {
    from,
    message
  }

  const server = Server.instance;
  /** Enviar mensaje a ese usuario en particular por medio de una petición REST */
  server.io.in(id).emit('private-message', payload);

  response.json({
    ok: true,
    id,
    message,
    from
  });
});

export default router;