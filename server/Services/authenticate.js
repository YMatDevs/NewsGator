function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware/route
  }
  return res
    .status(401)
    .json({ message: "Unauthorized access. Please log in." });
}



export default isAuthenticated;
