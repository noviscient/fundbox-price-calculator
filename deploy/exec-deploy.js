const readline = require('readline')
const fs = require('fs')
const { execSync } = require('child_process')
// deploy script.
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.question('Would you like to deploy? (y/n): ', (answer) => {
	if (answer.toLowerCase() === 'y') {
		const currentDate = new Date().toISOString().slice(0, 10)
		const commitMessage = execSync('git log --format=%B -n 1').toString().trim()

		// Save contents of js and css files in dist folder
		const jsContent = fs.readFileSync('dist/app.js', 'utf8')
		const cssContent = fs.readFileSync('dist/app.css', 'utf8')

		// Switch to gh-pages branch
		execSync('git checkout gh-pages')

		// Replace contents of js and css files in assets folder
		fs.writeFileSync('assets/app.js', jsContent)
		fs.writeFileSync('assets/app.css', cssContent)

		// Commit changes
		execSync(`git add assets/app.js assets/app.css`)
		execSync(`git commit -m "deployment on ${currentDate} - ${commitMessage}"`)

		console.log('Deployment successful!')
	} else {
		console.log('Deployment cancelled.')
	}

	rl.close()
})
