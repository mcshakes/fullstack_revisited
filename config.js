exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       "mongodb://localhost/personal-library";

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                          'mongodb://localhost/test-personal-library';

exports.PORT = process.env.PORT || 8080;

// https://github.com/Remchi/bookworm-api
