export const validateEnv = () => {
  const required = ["PORT", "JIKAN_API"];
  required.forEach((key) => {
    if (!process.env[key]) {
      console.error(`❌ Missing env variable: ${key}`);
      process.exit(1);
    }
  });
}; 