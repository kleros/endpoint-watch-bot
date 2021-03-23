const fetch = require('node-fetch')
const alarm = require('./utils/alarm')

console.info('Booting...')
let lastAlarmAt = 0
let strikes = 0
const threshold = 5
const run = async () => {
  console.info('')
  console.info('Checking alarms...')
  console.info('Path:', process.env.ENDPOINT_URL)
  console.info('')

  try {
    const response = await fetch(process.env.ENDPOINT_URL)
    if (response.ok) {
      strikes = 0
      console.info('All good.')
      return
    } else strikes++
  } catch (_error) {
    strikes++
    console.error(
      `Failed to fetch file from gateway. Strike ${strikes} of ${threshold}`
    )
  }

  if (strikes >= threshold) {
    console.info('Outage detected.')
    const now = Date.now()
    if (
      now - lastAlarmAt >
      Number(process.env.ALARM_PERIOD_HOURS) * 60 * 60 * 1000
    ) {
      console.info('Notifying watchers.')
      alarm({
        subject:
          'A fatal flaw requires critical attention from the team urgently.',
        message: `IPFS outtage detected.
        <br>
        <br>Our IPFS watch bot tried downloading a file ${threshold} times and failed.
        <br>
        <br>This means all our apps are not working and is an emergency that needs immediate attention.
        <br>
        Endpoint checked: ${process.env.ENDPOINT_URL}
        `,
        templateId: process.env.TEMPLATE_ID
      })
      lastAlarmAt = now
    } else
      console.info(
        `Will notify watchers again in ${(
          (lastAlarmAt +
            Number(process.env.ALARM_PERIOD_HOURS) * 60 * 60 * 1000 -
            now) /
          60 /
          60 /
          1000
        ).toFixed(3)} hours.`
      )
  }
}

run() // Run bots on startup.
setInterval(run, Number(process.env.POLL_INTERVAL_MINUTES) * 60 * 1000)
