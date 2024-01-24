function isNotNullAndNotUndefined(item) {
    return item !== null && item !== undefined;
}

const validationUtils = {
    isNotNullAndNotUndefined
}

module.exports = validationUtils;