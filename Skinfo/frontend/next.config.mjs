/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // Allows ESM packages to be imported without the .js extension
        },
      });
      return config;
    },
  };
  
export default nextConfig;



