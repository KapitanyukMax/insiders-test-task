const { createClient } = require('@supabase/supabase-js');
const { parse } = require('cookie');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const authMiddleware = async (req, res, next) => {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    req.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
