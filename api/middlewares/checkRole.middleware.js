module.exports.isGuide = (req, res, next) => {
    console.log("user")
      if (req.user.role === "guide") {
        console.log("GUIDE")
        next();
      } else {
        res.redirect('/error');
      }
    };