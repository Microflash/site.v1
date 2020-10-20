const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const { google } = require('googleapis')
const { prefs, paths } = require('./app.config')

dotenv.config()

if (process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY && process.env.VIEW_ID) {
  console.log('Found env variables')
}

const jwtAuth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n"),
  scopes: 'https://www.googleapis.com/auth/analytics.readonly'
})

const analytics = google.analytics({
  version: 'v3',
  auth: jwtAuth
})

const getReport = () => {
  return analytics.data.ga.get({
    'ids': `ga:${process.env.VIEW_ID}`,
    'dimensions': 'ga:pageTitle,ga:pagePath',
    'metrics': 'ga:pageviews',
    'filters': 'ga:pagePathLevel1=@/blog/',
    'start-date': '30daysAgo',
    'end-date': 'today',
    'max-results': prefs.maxPopularPosts,
    'sort': '-ga:pageviews'
  })
}

const getPopularPosts = () => {
  const reportPath = path.resolve(process.cwd(), paths.report.dir, paths.report.name)
  const reportExists = fs.existsSync(reportPath)

  if (process.env.NODE_ENV === 'production' || !reportExists) {
    getReport().then(res => {
      writeToFile('analytics report', paths.report, res.data.rows.map(entry => {
        return {
          title: entry[0].slice(0, -13),
          path: entry[1],
          views: entry[2]
        }
      }))
    }).catch(err => console.error(err))
  }

  return require(reportPath)
}

const writeToFile = (target, output, data) => {
  const outputPath = path.resolve(process.cwd(), output.dir)
  const outputPathExists = fs.existsSync(outputPath)
  const fileName = output.name.endsWith('.json') ? output.name : `${output.name}.json`

  if (!outputPathExists) {
    fs.mkdirSync(outputPath)
  }

  if (outputPathExists && data && target) {
    console.log(`Generate ${target}`)
  }

  fs.writeFileSync(path.resolve(process.cwd(), output.dir, fileName), JSON.stringify(data))
}

module.exports = {
  getPopularPosts,
  writeToFile
}
