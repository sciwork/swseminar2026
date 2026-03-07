module.exports = {
  siteUrl: "https://seminar2026.sciwork.dev",
  ...(process.env.OUTPUTDIR && { outDir: process.env.OUTPUTDIR }),
  generateRobotsTxt: true,
};
