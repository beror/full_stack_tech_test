import { Router } from 'express';
const router = Router();

const data = [
  { id: 1, name: 'Entity1', properties: { propA: 'a', propB: 'b', propC: [1, 2, 3] } },
  { id: 2, name: 'Entity2', properties: { propA: 'c', propB: 'd', propC: [4, 5, 6] } },
  { id: 3, name: 'Entity3', properties: { propA: 'e', propB: 'f', propC: [7, 8, 9] } },
];

router.get('/entities', (req, res) => {
  const { filter } = req.query;
  
  if (filter) {
    const filtered = data.filter(entity => entity.name.includes(filter));
    res.json(filtered);
  } else {
    res.json(data);
  }
});

router.get('/entities/:id', (req, res) => {
  const id = req.params.id;
  const entity = data.find(entity => entity.id == id);

  if (entity) {
    res.json(entity);
  } else {
    res.status(404).send('Not found');
  }
});

router.post('/entities', (req, res) => {
  const entity = req.body;
  
  if (
    entity &&
    entity.name &&
    entity.properties &&
    typeof entity.name === 'string' &&
    typeof entity.properties === 'object'
  ) {
    const id = data.length + 1;
    entity.id = id;
    data.push(entity);
    res.json(entity);
  } else {
    res.status(400).send('Bad Request');
  }
});

router.delete('/entities/:id', (req, res) => {
  const id = req.params.id;
  const index = data.findIndex(entity => entity.id == id);

  if (index !== -1) {
    const deleted = data.splice(index, 1);
    res.json(deleted);
  } else {
    res.status(404).send('Not found');
  }
});

router.patch('/entities/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const entity = data.find(entity => entity.id == id);

  if (entity) {
    const updatedEntity = Object.assign(entity, update);
    res.json(updatedEntity);
  } else {
    res.status(404).send('Not found');
  }
});

export default router;
