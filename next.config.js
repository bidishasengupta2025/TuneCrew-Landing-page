// /** @type {import('next').NextConfig} */

// const nextConfig = {
// 	images: {
// 		domains: ["localhost"],
// 		remotePatterns: [
// 			{
// 				protocol: "https",
// 				hostname: "cdn.sanity.io",
// 				port: "",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "lh3.googleusercontent.com",
// 				port: "",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "avatars.githubusercontent.com",
// 				port: "",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
// 				port: "",
// 			},
// 		],
// 	},
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**", // Add this to allow all paths for this hostname
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
