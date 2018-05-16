exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       "mongodb://localhost/personal-library";

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                          'mongodb://localhost/test-personal-library';

exports.PORT = process.env.PORT || 8080;

exports.GOODREADS_KEY = "JA8x37btYafVM0F2slleVQ";

exports.GOODREADS_SECRET = "pGgHODbF9ltRwqKHZrhm3zJpobana2lL5jOnAQEwUg";

// https://github.com/Remchi/bookworm-api
