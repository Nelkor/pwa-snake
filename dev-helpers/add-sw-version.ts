import { writeFileSync } from 'fs'

import { version } from '../src/service-worker/version'

writeFileSync('dist/sw-version', version.toString())
