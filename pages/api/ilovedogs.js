// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const breed = req.query.name;
  res.status(200).json({ message: `I love ${breed}` });
}
