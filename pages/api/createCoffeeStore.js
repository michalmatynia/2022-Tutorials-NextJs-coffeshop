const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="0"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => ({
          ...record.fields,
        }));

        res.json(records);
      } else {
        res.json({ message: 'create a record' });

        
      }
    } catch (err) {
      console.log('Error finding store', err);
      res.json({ message: 'Error finding store', err });
    }
  } else {
    res.json({ message: 'Method is GET' });
  }
};

export default createCoffeeStore;
