// const generateToken = (user) => {
//   return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// }

const generateToken = () =>
  Math.random().toString(36).substr(2, 7) + Date.now().toString(36);

export { generateToken };
