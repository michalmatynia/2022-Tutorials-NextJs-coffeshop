import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        }

        // Create a record
        if (name) {
          const createRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);

          const result = getMinifiedRecords(createRecords);

          res.json(result);
        } else {
          res.status(400);
          res.json({ message: 'name is missing' });
        }
      } else {
        res.status(400);
        res.json({ message: 'Id  is missing' });
      }
    } catch (err) {
      res.json({ message: 'Error creating or finding store', err });
    }
  } else {
    res.json({ message: 'Method is GET' });
  }
};

export default createCoffeeStore;
