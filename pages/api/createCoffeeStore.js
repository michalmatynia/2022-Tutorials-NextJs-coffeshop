import { table, getMinifiedRecords } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);

          res.json(records);
        }

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

          const records = getMinifiedRecords(createRecords);

          res.json(records);
        } else {
          res.status(400);
          res.json({ message: 'name is missing' });
        }
      } else {
        res.status(400);
        res.json({ message: 'Id  is missing' });
      }
    } catch (err) {
      console.log('Error creating or finding store', err);
      res.json({ message: 'Error creating or finding store', err });
    }
  } else {
    res.json({ message: 'Method is GET' });
  }
};

export default createCoffeeStore;
