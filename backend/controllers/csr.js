import asyncHandler from "express-async-handler";
import CSR from '../models/CSR.js'
const csrPost = asyncHandler(async (req, res) => {
  const { query, description } = req.body;

  const contactData = await CSR.create({
    query,
    description
  });

  if (contactData) {
    res.status(201).json({
      _id: contactData._id,
      query: contactData.query,
      description: contactData.description,
    });
  } else {
    res.status(400);
    throw new Error("CSR not Saved");
  }
});

const getCSR = asyncHandler(async (req, res) => {
  const csr = await CSR.find();
  res.json(csr);
});

export {csrPost,getCSR};
