module.exports = {
  apps: [
    {
      name: 'russian-daily',
      script: '/Users/datathunk/.bun/bin/bun',
      args: 'run dev',
      interpreter: 'none',
      cwd: '/Users/datathunk/dev/AI/russian-daily',
      env: {
        PORT: 3030,
        // Key loaded from .env (gitignored) — run: export $(cat .env | xargs) before pm2 start
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        DB_PATH: '/Users/datathunk/dev/AI/russian-daily/data',
        NODE_ENV: 'development',
      },
      watch: false,
      autorestart: true,
    }
  ]
}
