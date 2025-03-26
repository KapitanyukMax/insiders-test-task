const { createClient } = require('@supabase/supabase-js');
const { serialize, parse } = require('cookie');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: 'Email, password, and name are required' });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const { error: dbError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        name,
      },
    ]);

    if (dbError) return res.status(400).json({ error: dbError.message });

    res.status(201).json({
      message: 'Register successful',
      user: {
        email: authData.user.email,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ error: error.message });

    const {
      data: { name },
    } = await supabase
      .from('users')
      .select('name')
      .eq('id', data.user.id)
      .single();

    res.setHeader(
      'Set-Cookie',
      serialize('access_token', data.session.access_token, {
        httpOnly: true,
        path: '/',
      })
    );

    res.json({
      message: 'Login successful',
      user: { email: data.user.email, name },
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const {
      data: { name },
    } = await supabase.from('users').select('name').eq('id', user.id).single();

    res.json({
      message: 'User retrieved successfully',
      user: { email: user.email, name },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(400).json({ error: error.message });

    res.setHeader(
      'Set-Cookie',
      serialize('access_token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
      })
    );

    res.json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile, logout, resetPassword };
