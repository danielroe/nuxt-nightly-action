import { execSync } from 'node:child_process'

import {} from '@actions/core'
import {} from '@actions/github'

// TODO: configuration - point to Nuxt directory? (default repo root)
// TODO: add package resolutions for nuxt nightly versions
// TODO: dedupe dependencies
// TODO: create a long-running branch
// TODO: open a PR

execSync('npx nuxi@latest upgrade --force')
