const protectAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: 'Not authorized'
        });
    }

    // CHECK ROLE
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Admin access only'
        });
    }
    console.log(req.user);
    next();
};

module.exports = protectAdmin;