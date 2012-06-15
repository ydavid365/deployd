var Keys = require('../lib/keys');

describe('Keys', function() {
	describe('.get(key, callback)', function() {
		it('should return a key if it exists', function(done) {
			var keys = new Keys(__dirname + '/support/keys.json');

			keys.get('abcdefghijklmnopqrstuvwxyz', function(err, exists) {
				expect(exists).to.equal(true);
				done(err);
			});
		});

		it('should not throw if the file does not exist', function(done) {
			var keys = new Keys(__dirname + '/support/file-doesnt-exist.json');

			keys.get('abcdefghijklmnopqrstuvwxyz', function(err, exists) {
				expect(exists).to.equal(undefined);
				done(err);
			});
		});
	});

	describe('.generate()', function() {
		it('should create a new key', function() {
			var keys = new Keys()
				,	key = keys.generate();

			expect(key).to.exist;
			expect(key.length).to.equal(512);
		});
	});

	describe('.create(callback)', function() {
		it('create a new key which should then exist', function(done) {
			var keys = new Keys(__dirname + '/support/keys.json');

			keys.create(function(err, key) {
				expect(err).to.not.exist;
				keys.get(key, function(err, exists) {
					expect(exists).to.equal(true);
					done(err);
				});
			});
		});
	});
});