const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.get('^/$|/index(.html)?', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
