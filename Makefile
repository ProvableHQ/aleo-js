format:
	npx prettier --write .

linter:
	npx eslint .

generate_docs:
	npx jsdoc --configure jsdoc.json --verbose
