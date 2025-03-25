# Insiders Test Task

## Installation and Setup

1. Clone the repo:
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:
```sh
npm install
```

3. Create Supabase empty project and run the folowing sql to create a table:
```sql
create table users (
  id uuid not null references auth.users on delete cascade,
  name text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

4. Configure environment variables in server/.env:
```env
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key
PORT=3500
```

5. Configure environment variable in client/.env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:3500
```


## Application start

1. Server:

To start the server using nodemon:
```sh
cd server
npm run dev
```

To start the server using node:
```sh
cd server
npm start
```

2. Client:

To start the client in dev mode:
```sh
cd client
npm run dev
```

To start the client in production mode:
```sh
cd client
npm start
```

## Client routes

1. Login - /login
2. Profile - /profile

## Server API Endpoints

1. User registration - POST /register
Request body - { name, email, password }
After successful registration, you have to confirm your email
2. User login - POST /login
Request body - { email, password }
3. User info - GET /profile
4. User logout - POST /logout
5. Reset password - POST /reset-password
Request body - { email }
