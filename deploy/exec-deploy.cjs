const readline = require('readline')
const fs = require('fs')
const c = require('ansi-colors')
const { execSync, exec } = require('child_process')
// deploy script.
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

// Check if we are able to checkout to gh-pages branch (we cannot if there are uncommitted changes).
// If we are unable, explain so and exit.
try {
	console.log('')
	console.log(c.blue('$ node deploy/exec-deploy.cjs'))
	console.log(c.blue('Checking deployability'))
	console.log(c.gray('$ git checkout gh-pages'))
	execSync('git checkout gh-pages')
} catch (error) {
	console.log('')
	console.log('Unable to checkout to gh-pages branch. If you\'d like to deploy, please commit your changes, then run')
	console.log(c.cyan(''))
	console.log(c.cyan('   $ pnpm deploy-only'))
	console.log(c.cyan(''))
	process.exit(1)
}
console.log(c.gray('==> ok'))
console.log(c.gray('$ git checkout -'))
execSync('git checkout -')

rl.question(c.yellow.bold('Would you like to deploy now? (y/n): '), (answer) => {
	if (answer.toLowerCase() === 'y') {
		const currentDate = new Date().toISOString().slice(0, 10)

		console.log(c.blue('Deploying...'))
		const commitMessage = execSync('git log --format=%B -n 1').toString().trim()
		console.log(c.gray('obtain commit message: "' + commitMessage + '"'))

		console.log(c.gray('fs.readFileSync(\'dist/assets/index.js\', \'utf8\')'))
		// Save contents of js and css files in dist/assets folder
		const jsContent = fs.readFileSync('dist/assets/index.js', 'utf8')
		console.log(c.gray('fs.readFileSync(\'dist/assets/index.js\', \'utf8\')'))
		const cssContent = fs.readFileSync('dist/assets/index.css', 'utf8')

		// Switch to gh-pages branch
		console.log(c.gray('$ git checkout gh-pages'))
		execSync('git checkout gh-pages')

		// Replace contents of js and css files in assets folder
		console.log(c.gray('fs.writeFileSync(\'assets/index.js\', jsContent) ...'))
		fs.writeFileSync('assets/index.js', jsContent)
		console.log(c.gray('fs.writeFileSync(\'assets/index.css\', cssContent) ...'))
		fs.writeFileSync('assets/index.css', cssContent)

		// Commit changes
		console.log(c.gray('$ git add assets/index.js assets/index.css'))
		execSync(`git add assets/index.js assets/index.css`)
		console.log(c.blue(`$ git commit -m ${c.red("deployment on ${currentDate} - ${commitMessage}")}`))
		execSync(`git commit -m "deployment on ${currentDate} - ${commitMessage}"`)

		console.log(c.gray('$ git push origin gh-pages'))
		execSync('git push origin gh-pages')

		console.log(c.gray('$ git checkout -'))
		execSync('git checkout -')
		console.log(c.blue('Deployment successful!'))
	} else {
		console.log('Have a nice day. 🏞️')
	}


	rl.close()
})
