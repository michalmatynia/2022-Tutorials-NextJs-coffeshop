const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = findCoffeeStoreRecords.map((record) => ({
            ...record.fields,
          }));

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

          const records = createRecords.map((record) => ({
            ...record.fields,
          }));

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
