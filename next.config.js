module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_SERVICE_ID: process.env.GMAIL_SERVICE_ID,
    GMAIL_USER_ID: process.env.GMAIL_USER_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID
  }
}
