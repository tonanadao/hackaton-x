/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REACT_APP_API_LOCATION: process.env.REACT_APP_API_LOCATION,
    REACT_APP_API_LOCATION_BLOCKCZECH:
      process.env.REACT_APP_API_LOCATION_BLOCKCZECH,
  },
  reactStrictMode: true,
};
