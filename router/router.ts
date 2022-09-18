import { Router } from 'express';


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

  response.json({
    ok: true,
    id,
    message,
    from
  });
});

export default router;