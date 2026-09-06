/** Selected work. Replaces the Supabase `portfolio` table: the shape a case
 *  study can take is no longer capped by a database row, and there is no
 *  admin surface to secure. */

export type WorkItem = {
  client: string
  sector: string
  /** One line on the card: the reason to click, shown before the click. */
  hook: string
  /** Written case study, or the Instagram account until one exists. */
  href: string
  external: boolean
  /** Path under /public once the real still lands. */
  cover?: string
}

export const work: WorkItem[] = [
  { client: 'Victoria Sushi', sector: 'Hospitality', hook: 'Launched a product New Zealand had never seen', href: '/work/victoria-sushi', external: false },
  { client: 'BCG Group', sector: 'Construction', hook: 'One brand film, cut twelve ways', href: 'https://instagram.com/viralx_nz', external: true },
  { client: '1946 Company', sector: 'Hospitality', hook: 'Put the cutting board in front of the camera', href: 'https://instagram.com/viralx_hospitality', external: true },
  { client: 'Ray White', sector: 'Real Estate', hook: 'Made the agent the reason people called', href: 'https://instagram.com/viralx_productions', external: true },
  { client: 'ALLGOT', sector: 'Retail', hook: 'A content system they could run without us', href: 'https://instagram.com/viralx_nz', external: true },
  { client: 'Two Dollar Things Plus', sector: 'Retail', hook: 'Everyday product, made worth watching', href: 'https://instagram.com/viralx_nz', external: true },
]

export const clients = [
  'Sony', 'BCG Group', 'Harcourts', 'Ray White', 'ALLGOT',
  'Victoria Sushi', 'Pocha', 'Seoul 1946', 'Two Dollar Things Plus',
  'JFC', 'Stroll Cafe', 'Face Club',
]

/** Adding a post is one line and one link. Swap `url` for the individual
 *  reel once you have it. */
export const feed = [
  { handle: '@viralx_hospitality', label: 'Pocha opening night', url: 'https://instagram.com/viralx_hospitality' },
  { handle: '@viralx_productions', label: 'Remuera listing walkthrough', url: 'https://instagram.com/viralx_productions' },
  { handle: '@viralx_hospitality', label: 'Victoria Sushi omakase', url: 'https://instagram.com/viralx_hospitality' },
  { handle: '@viralx_nz', label: 'ALLGOT campaign cutdown', url: 'https://instagram.com/viralx_nz' },
  { handle: '@viralx_productions', label: 'Ray White agent series', url: 'https://instagram.com/viralx_productions' },
  { handle: '@viralx_hospitality', label: '1946 Company dry-age room', url: 'https://instagram.com/viralx_hospitality' },
  { handle: '@viralx_nz', label: 'BCG Group brand film', url: 'https://instagram.com/viralx_nz' },
  { handle: '@viralx_productions', label: 'Parnell waterfront build', url: 'https://instagram.com/viralx_productions' },
  { handle: '@viralx_hospitality', label: 'Stroll Cafe morning service', url: 'https://instagram.com/viralx_hospitality' },
  { handle: '@viralx_nz', label: 'Face Club brand shoot', url: 'https://instagram.com/viralx_nz' },
  { handle: '@viralx_hospitality', label: 'Seoul 1946 the counter', url: 'https://instagram.com/viralx_hospitality' },
  { handle: '@viralx_nz', label: 'JFC product campaign', url: 'https://instagram.com/viralx_nz' },
]
