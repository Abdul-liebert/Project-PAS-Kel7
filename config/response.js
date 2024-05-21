const successRes = (res, message, data) => {
    return res.status(200).json({ success: true, message, data });
};

const errorRes = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};

const validErr = (res, errors) => {
    return res.status(400).json({ success: false, errors, message: "validation errors" });
};

const notFoundRes = (res, message) => {
    return res.status(404).json({ success: false, message })
}

const internalErrorRes = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message })
};

module.exports = {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
};