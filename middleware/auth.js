const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	} else {

		if (req.body.headers.Authorization && req.body.headers.Authorization.startsWith("Bearer")) {
			token = req.body.headers.Authorization.split(" ")[1];
		}
	}


	if (!token) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if(!user) {
			return next(new ErrorResponse("No user found with this id", 404));
		}

		req.user = user;

		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}
}