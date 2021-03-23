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
        subject: 'Endpoint Outage Detected',
        message: `IPFS outtage detected. Our ipfs watch bot tried downloading a file ${threshold} times and failed. This can mean all our apps are malfunctioning and is an emergency that needs attention.
        <br>
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
