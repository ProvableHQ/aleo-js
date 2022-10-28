format:
	npx prettier --write .

linter:
	npx eslint .

generate_docs:
	jsdoc --configure jsdoc.json --verbose
