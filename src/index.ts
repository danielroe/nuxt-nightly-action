import { execSync } from 'node:child_process'

import { getInput, info, warning } from '@actions/core'
import { context, getOctokit } from '@actions/github'

// TODO: configuration - point to Nuxt directory? (default repo root)
// TODO: add package resolutions for nuxt nightly versions
// TODO: dedupe dependencies
// TODO: create a long-running branch
// TODO: open a PR

const octokit = getOctokit(process.env.GITHUB_TOKEN)

const base = getInput('base') || execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
const head = getInput('head')

try {
  execSync(`git checkout ${head}`)
  info(`Checking out existing branch ${head}`)
} catch (e) {
  info(`Creating new branch ${head}`)
  execSync(`git checkout -b ${head}`)
}

execSync('npx nuxi@latest upgrade --force')
execSync('git commit -am "chore: upgrade nuxt"')
execSync(`git push -u origin ${head}`)

octokit.rest.pulls.create({
  base,
  head,
  owner: context.repo.owner,
  repo: context.repo.repo,
  draft: true,
})
