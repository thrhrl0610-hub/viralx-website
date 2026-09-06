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
  { client: 'BCG Group', sector: 'Construction', hook: 'Drone to floor plan. The whole development, sold.', href: '/work/bcg-group', external: false, cover: '/work/bcg-group/cover.jpg?v=2' },
  { client: '1946 Company', sector: 'Hospitality', hook: 'Two rooms, one house style, shot every month', href: '/work/1946-company', external: false, cover: '/work/1946-company/cover.jpg?v=5' },
  { client: 'Ray White', sector: 'Real Estate', hook: 'Drone to floor plan. Listings that sell the street.', href: '/work/ray-white', external: false, cover: '/work/ray-white/cover.jpg?v=2' },
  { client: 'Stroll Cafe', sector: 'Cafe', hook: 'The daily coffee run, worth stopping the scroll for', href: '/work/stroll-cafe', external: false, cover: '/work/stroll-cafe/cover.jpg?v=1' },
  { client: 'Sony x Pullman Hotel', sector: 'Event Marketing', hook: 'A podcast set and a photo booth in a room of creators', href: '/work/sony-nzcreatorcon', external: false, cover: '/work/sony/cover.jpg?v=4' },
  { client: 'Victoria Sushi', sector: 'Hospitality', hook: '2M+ views. The first push-up sushi in New Zealand', href: '/work/victoria-sushi', external: false, cover: '/work/victoria-sushi/cover.jpg?v=2' },
]

export const clients = [
  'Sony', 'BCG Group', 'Harcourts', 'Ray White', 'ALLGOT',
  'Victoria Sushi', 'Pocha', 'Seoul 1946', 'Two Dollar Things Plus',
  'JFC', 'Stroll Cafe', 'Face Club',
]

/** Adding a post is one line and one link. Swap `url` for the individual
 *  reel once you have it. */
export const feed = [
  { handle: '@pocha.eatery', label: 'Pocha, a night out',        url: 'https://www.instagram.com/p/DakHMMvTjXP/',  cover: '/feed/01.jpg' },
  { handle: '@pocha.eatery', label: 'Hands up, hands down',      url: 'https://www.instagram.com/p/Dazd7jYRZsM/',  cover: '/feed/02.jpg' },
  { handle: '@delicious.food.finder',          label: 'ALLGOT frozen kimbap',      url: 'https://www.instagram.com/p/DMg1wjmvCVM/',  cover: '/feed/03.jpg' },
  { handle: '@kain_kat',          label: 'ALLGOT in the aisle',       url: 'https://www.instagram.com/p/DMjBBwsTSUt/',  cover: '/feed/04.jpg' },
  { handle: '@aronvatt3i', label: 'Victoria Sushi, 1M views',  url: 'https://www.instagram.com/p/DZTj7Wlyddl/',  cover: '/feed/05.jpg' },
  { handle: '@seoul1946.akl', label: 'Wait, let me wipe the camera', url: 'https://www.instagram.com/p/DageH7vTpUt/', cover: '/feed/06.jpg' },
  { handle: '@seoul1946.akl', label: 'Seoul 1946 from the street', url: 'https://www.instagram.com/p/DZgLVftyXr_/', cover: '/feed/07.jpg' },
  { handle: '@1946butchery_akl', label: '1946 Butchery after dark',  url: 'https://www.instagram.com/p/Dagpfv5TLSO/',  cover: '/feed/08.jpg' },
  { handle: '@strolling_troll', label: 'Stroll Cafe, three lattes', url: 'https://www.instagram.com/p/DaOuF0Myc2d/',  cover: '/feed/09.jpg' },
  { handle: '@strolling_troll', label: 'Coffee Saturday',           url: 'https://www.instagram.com/p/DZhKdjoOPqG/',  cover: '/feed/10.jpg' },
  { handle: '@viralx_hospitality', label: 'But we were born in 2008',  url: 'https://www.instagram.com/reel/DbFZLfmPGIL/', cover: '/feed/11.jpg' },
  { handle: '@sonynz',          label: 'Sony at NZCreatorCon',      url: 'https://www.instagram.com/p/DKJp-xUJMfX/',  cover: '/feed/12.jpg' },
  { handle: '@strolling_troll', label: 'The good part',             url: 'https://www.instagram.com/p/DZef1bBpx66/',  cover: '/feed/13.jpg' },
  { handle: '@strolling_troll', label: 'Seven coffees, one free',   url: 'https://www.instagram.com/p/Da4D2MEhT9I/',  cover: '/feed/14.jpg' },
]
