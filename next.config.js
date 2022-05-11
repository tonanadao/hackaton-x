/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REACT_APP_API_LOCATION: process.env.REACT_APP_API_LOCATION,
    REACT_APP_API_LOCATION_BLOCKCZECH:
      process.env.REACT_APP_API_LOCATION_BLOCKCZECH,
    REACT_APP_POLYGON_CHAIN_ID: process.env.REACT_APP_POLYGON_CHAIN_ID,
    REACT_APP_EVENT_CONTRACT: process.env.REACT_APP_EVENT_CONTRACT,
  },
  reactStrictMode: true,
};
