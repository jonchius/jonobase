
/*
jonobase by @jonchius
/sanity/env.ts
environment variable checks
*/


export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-14'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET ,
  'Missing environment variable: SANITY_STUDIO_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID ,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
)

export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_TOKEN || process.env.SANITY_STUDIO_TOKEN,
  'Missing environment variable: NEXT_PUBLIC_SANITY_TOKEN'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
