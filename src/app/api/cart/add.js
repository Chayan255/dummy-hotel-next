export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies.token;

  // 🔐 Token check
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access. Please login.' });
  }

  const { itemId, quantity } = req.body;

  // ✅ Validate incoming data
  if (!itemId || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid item or quantity' });
  }

  // ✅ Data processing (ধরে নিচ্ছি DB নেই — তুমি এখানে DB insert করতে পারো)
  return res.status(200).json({
    message: 'Item added to cart successfully!',
    data: {
      itemId,
      quantity
    }
  });
}
