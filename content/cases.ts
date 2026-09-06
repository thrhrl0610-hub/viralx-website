/** Written case studies. A case study is a list of blocks rather than a fixed
 *  template, so each campaign can take the shape its story needs. A project
 *  without an entry here stays on the wall and links to Instagram instead. */

export type Block =
  /** `src` is a path under /public. Leave it off and the block keeps the
   *  gradient placeholder, so a study can go live before every still is cut. */
  | { type: 'split'; side: 'left' | 'right'; title: string; body: string[]; src?: string; alt?: string }
  /** `play: false` hides the play badge when the still is a photo, not a video frame. */
  | { type: 'full'; caption?: string; src?: string; alt?: string; play?: boolean }
  | { type: 'duo'; captions: [string, string]; srcs?: [string, string] }
  /** The finished film itself. `poster` is the frame shown before play, so the
   *  page costs nothing to load until someone asks for it. */
  /** Leave `src` off to reserve the slot. The page shows a marked placeholder
   *  until the file lands in /public, so the layout is visible while you pick. */
  /** `ratio` is the film's own aspect ('16/9', '9/16', '40/27'). Set it and the
   *  frame matches the footage instead of cropping it to fit. */
  | { type: 'video'; src?: string; poster?: string; caption?: string; portrait?: boolean; ratio?: string; slot?: string }
  | { type: 'pull'; text: string }
  /** Full-width text. For a section that would only pad out a picture slot. */
  | { type: 'note'; title?: string; body: string[] }
  /** Two films side by side. Each keeps its own ratio. */
  | { type: 'videos'; items: { src: string; poster?: string; caption?: string; ratio?: string }[] }

export type CaseStudy = {
  slug: string
  client: string
  sector: string
  year: string
  services: string[]
  delivered: string
  headline: string
  /** Wide still behind the title. Falls back to the gradient when absent. */
  hero?: string
  blocks: Block[]
  phases: [string, string][]
  stats: [string, string][]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: '1946-company',
    client: '1946 Company',
    sector: 'Hospitality',
    year: '2026',
    services: ['Social Media Management', 'Food Photography', 'Video Production', 'Content Strategy'],
    delivered: 'Monthly content across the group',
    hero: '/work/1946-company/cs/hero.jpg',
    headline: 'A group with more than one room needs more than one look.',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          '1946 Company does not run one venue. 1946 Butchery is a dark room with a grill in the middle of the table. Seoul 1946 is a daylit cafe and roastery. They serve different people at different hours, and they share a parent brand.',
          'Content that flattens the two into one house style loses what makes each of them worth visiting. Content with no house style at all stops looking like a group.',
        ],
        src: '/work/1946-company/cs/front.jpg',
        alt: '1946 Butchery from the street at dusk',
      },
      { type: 'pull', text: 'Shoot each room in its own light. Grade the whole group as one.' },
      {
        type: 'video',
        src: '/work/1946-company/cs/film01.mp4',
        poster: '/work/1946-company/cs/poster01.jpg',
        ratio: '40 / 27',
        caption: '1946 Butchery. The room, the grill and the counter in one pass.',
      },
      {
        type: 'split', side: 'left', title: 'How we shoot the Butchery',
        body: [
          'The Butchery lives after dark. We shoot it that way, working with the red room lighting and the brick instead of flattening it with a flash, so the pictures carry the temperature of the room a customer walks into.',
          'The food is shot on the table it is served on, in the light it is served under. Nothing is moved to a white sweep.',
        ],
        src: '/work/1946-company/cs/table.jpg',
        alt: 'A full table at 1946 Butchery',
      },
      {
        type: 'duo',
        captions: ['Shot on the table, in the room light', 'The bar, lit the way the room is lit'],
        srcs: ['/work/1946-company/cs/dish.jpg', '/work/1946-company/cs/bar.jpg'],
      },
      {
        type: 'video',
        src: '/work/1946-company/cs/film02.mp4',
        poster: '/work/1946-company/cs/poster02.jpg',
        ratio: '32 / 27',
        caption: 'A Butchery cut for the feed.',
      },
      {
        type: 'split', side: 'right', title: 'And how we shoot Seoul 1946',
        body: [
          'The cafe side gets the opposite treatment. Window light, pale timber, the pastry cabinet in the morning. It reads as somewhere you go before work rather than somewhere you go for dinner.',
          'What holds the two together is the grade and the framing rules, not the location. Side by side on a feed they read as one company with two rooms.',
        ],
        src: '/work/1946-company/cs/seoul-room.jpg',
        alt: 'The room at Seoul 1946 in the morning',
      },
      {
        type: 'duo',
        captions: ['The cabinet, shot in the morning', 'Dessert, shot against the dark'],
        srcs: ['/work/1946-company/cs/seoul-pastry.jpg', '/work/1946-company/cs/seoul-bing.jpg'],
      },
      {
        type: 'video',
        src: '/work/1946-company/cs/film03.mp4',
        poster: '/work/1946-company/cs/poster03.jpg',
        ratio: '9 / 16',
        portrait: true,
        caption: 'Seoul 1946, shot vertical for the feed.',
      },
      {
        type: 'note', title: 'Why it runs monthly',
        body: [
          'Hospitality content goes stale faster than any other category we work in. A menu changes, a season turns, a room gets rearranged, and a six-month-old grid starts advertising a restaurant that no longer exists.',
          'So the work is a standing monthly shoot across the group rather than a campaign with an end date. Every month the venues get a fresh set of stills and reels, and the account never runs on stock from last summer.',
        ],
      },
      {
        type: 'video',
        src: '/work/1946-company/cs/film04.mp4',
        poster: '/work/1946-company/cs/poster04.jpg',
        ratio: '9 / 16',
        portrait: true,
        caption: 'The menu, cut the way it runs on the account.',
      },
    ],
    phases: [
      ['Setup', 'A shared grade and framing system across every venue in the group.'],
      ['Butchery', 'Night shoots that work with the room light instead of against it.'],
      ['Seoul 1946', 'Daylight shoots for the cafe and roastery side.'],
      ['Monthly', 'A standing shoot so the feed never runs on old material.'],
    ],
    stats: [
      ['Monthly', 'Standing shoot across the group'],
      ['2 rooms', '1946 Butchery and Seoul 1946'],
      ['Stills + reels', 'Both from the same shoot'],
    ],
  },
  {
    slug: 'stroll-cafe',
    client: 'Stroll Cafe',
    sector: 'Cafe',
    year: '2026',
    services: ['Social Media Management', 'Product Photography', 'Video Production'],
    delivered: 'Ongoing monthly content',
    hero: '/work/stroll-cafe/cs/hero.jpg',
    headline: 'Everyone sells an iced latte. Almost nobody makes you want this one.',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          'A cafe has the hardest product to film. There is no dish to reveal and no kitchen theatre. It is a cup, and the cup next door looks the same.',
          'What Stroll actually has is a branded cup, a pastry cabinet worth photographing and a room people sit in. The job was to make those three things carry a feed on their own.',
        ],
        src: '/work/stroll-cafe/cs/brandcup.jpg',
        alt: 'The branded Stroll Coffee cup',
      },
      { type: 'pull', text: 'If the product cannot surprise you, the camera has to.' },
      {
        type: 'note', title: 'How we shoot it',
        body: [
          'We shoot the cup as an object. Close, shallow, lit so the logo reads and the condensation shows, with the pastry in the frame for texture rather than as a second product shot.',
          'The room gets the same treatment. Warm timber, morning light through the front glass, no wide empty interiors that make a small cafe look emptier than it is.',
        ],
      },
      {
        type: 'video',
        src: '/work/stroll-cafe/cs/film01.mp4',
        poster: '/work/stroll-cafe/cs/poster01.jpg',
        ratio: '16 / 9',
        caption: 'Overhead build, shot flat on the timber.',
      },
      {
        type: 'duo',
        captions: ['The menu, shot as one picture', 'Concept setups built for the feed'],
        srcs: ['/work/stroll-cafe/cs/lattes.jpg', '/work/stroll-cafe/cs/puzzle.jpg'],
      },
      {
        type: 'note', title: 'What keeps it moving',
        body: [
          'A coffee feed dies of repetition. The same cup on the same counter, three times a week, and people stop seeing it.',
          'So alongside the product work we build concept setups, a puzzle printed on the table, a stack of cups shot as a wall, a pour framed as the whole story. It gives the account something to say on the days when nothing new came out of the kitchen.',
        ],
      },
    ],
    phases: [
      ['Brief', 'Make a cup of coffee worth stopping for on a feed full of coffee.'],
      ['Product', 'The branded cup shot close and lit as an object.'],
      ['Concept', 'Setups built for the feed, so the account has more than one note.'],
      ['Monthly', 'Ongoing shoots to keep the grid from repeating itself.'],
    ],
    stats: [
      ['Monthly', 'Ongoing content'],
      ['Product + concept', 'Two lanes, one look'],
      ['Auckland', 'Stroll Cafe'],
    ],
  },
  {
    slug: 'bcg-group',
    client: 'BCG Group',
    sector: 'Construction',
    year: '2025',
    services: ['Video Production', 'Architectural Photography', 'Floor Plans', 'Listing Assets'],
    delivered: '13 Walmer Road development',
    headline: 'A finished build sells itself. Someone still has to show it.',
    hero: '/work/bcg-group/cs/hero.jpg',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          'BCG Group builds townhouses. By the time we arrive the hard part is done, and the job changes shape. A development that nobody can picture living in does not sell, however well it was built.',
          'For 13 Walmer Road they needed one shoot to carry every surface a buyer would meet the development on. The listing, the socials, the brochure, the agent walkthrough.',
        ],
        src: '/work/bcg-group/cs/facade.jpg',
        alt: 'Cedar batten and dark cladding detail at 13 Walmer Road',
      },
      { type: 'pull', text: 'One shoot, every asset. The alternative is four shoots that do not match.' },
      {
        type: 'split', side: 'left', title: 'How we shot it',
        body: [
          'We filmed the development in 4K, opening on the drone so the street reads before the building does, then walking the camera inside without a cut in the logic. Kitchen, living, bedroom, bathroom, back to the facade at the end.',
          'The stills came off the same shoot on the same grade, so the photography and the film look like one piece of work rather than two suppliers.',
        ],
        src: '/work/bcg-group/cs/interior.jpg',
        alt: 'Living opening onto the deck at 13 Walmer Road',
      },
      {
        type: 'video',
        src: '/work/bcg-group/cs/film.mp4',
        poster: '/work/bcg-group/cs/poster.jpg',
        caption: '13 Walmer Road. Shot in 4K, March 2025.',
      },
      {
        type: 'duo',
        captions: ['Dining, opening onto the deck', 'The kitchen in its own daylight'],
        srcs: ['/work/bcg-group/cs/deck.jpg', '/work/bcg-group/cs/kitchen.jpg'],
      },
      {
        type: 'split', side: 'right', title: 'The full package',
        body: [
          'Alongside the film and the photography we produced the floor plans, so an agent could answer the layout question in the same place a buyer was already looking.',
          'That is the whole listing kit from one job. Nothing left for the client to commission separately, and nothing that looks like it came from somewhere else.',
        ],
        src: '/work/bcg-group/cs/stair.jpg',
        alt: 'The timber stair at 13 Walmer Road',
      },
    ],
    phases: [
      ['Scope', 'One shoot briefed to cover film, stills and floor plans together.'],
      ['Production', '4K capture across drone, exterior and full interior walkthrough.'],
      ['Post', 'Film and photography graded as one set so every asset matches.'],
      ['Delivery', 'Listing film, architectural stills and floor plans handed over as a package.'],
    ],
    stats: [
      ['4K', 'Capture across drone and interior'],
      ['Walmer Rd', 'Auckland development'],
      ['One shoot', 'Film, stills and floor plans'],
    ],
  },
  {
    slug: 'ray-white',
    client: 'Ray White',
    sector: 'Real Estate',
    year: '2025',
    services: ['Listing Film', 'Property Photography', 'Floor Plans', 'Agent Assets'],
    delivered: '124 Kewa Road listing',
    headline: 'Most listing videos are a slideshow with music. This is not that.',
    hero: '/work/ray-white/cs/hero.jpg',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          'A Ray White agent is competing with every other listing on the same portal, on the same phone, in the same scroll. The photography is usually the only thing separating two houses at the same price.',
          '124 Kewa Road needed a listing film that held someone past the first two seconds, and a set of stills that did not look like the twenty listings above it.',
        ],
        src: '/work/ray-white/cs/aerial.jpg',
        alt: '124 Kewa Road from the air at dusk',
      },
      { type: 'pull', text: 'The house was always going to look good. The question was whether anyone would stop.' },
      {
        type: 'split', side: 'left', title: 'How we shot it',
        body: [
          'We opened on the drone to place the house in its street and its outlook, which is the thing a portal photo can never do, then moved inside on a considered walk rather than a pan across every room.',
          'The interiors were shot into the light so the windows stay part of the room, and we came back out at twilight when the house is lit from inside and reads as somewhere people live.',
        ],
        src: '/work/ray-white/cs/living.jpg',
        alt: 'Living area at 124 Kewa Road',
      },
      {
        type: 'video',
        src: '/work/ray-white/cs/film.mp4',
        poster: '/work/ray-white/cs/poster.jpg',
        caption: '124 Kewa Road. Listing film, drone to twilight.',
      },
      {
        type: 'duo',
        captions: ['Twilight exterior, lit from inside', 'The deck, shot in full sun'],
        srcs: ['/work/ray-white/cs/twilight.jpg', '/work/ray-white/cs/deck.jpg'],
      },
      {
        type: 'note', title: 'What the agent gets',
        body: [
          'The film, the photography and the floor plans come from the same job, so the agent has the whole listing ready at once and every piece matches.',
          'It is the same package we run for developments. A listing is a smaller job than a development, but the buyer scrolling past it cannot tell the difference, so we do not make one.',
        ],
      },
    ],
    phases: [
      ['Brief', 'A listing that has to stand out in a portal scroll, not just look accurate.'],
      ['Production', 'Drone, interiors and twilight exterior captured in one visit.'],
      ['Post', 'Film and stills graded together for a consistent listing set.'],
      ['Delivery', 'Listing film, photography and floor plans to the agent.'],
    ],
    stats: [
      ['124 Kewa Rd', 'Auckland listing'],
      ['Drone to plan', 'Full listing package'],
      ['One visit', 'Film, stills and floor plans'],
    ],
  },
  {
    slug: 'sony-nzcreatorcon',
    client: 'Sony x Pullman Hotel',
    sector: 'Event Marketing',
    year: '2025',
    services: ['Event Production', 'Set Build', 'Creator Activation', 'Content Capture'],
    delivered: 'NZCreatorCon, Pullman Hotel Auckland',
    headline: 'Put a camera brand in a room full of people who film for a living.',
    hero: '/work/sony/cs/hero.jpg',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          'Sony wanted its camera line in front of the people who actually shoot on it every day. Not a launch stand at a trade show, and not a press release. The audience they needed was the creator community itself.',
          'NZCreatorCon brought that community into one building at the Pullman Hotel in Auckland, with creators and talent from across New Zealand and Australia in the room across two days.',
        ],
        src: '/work/sony/cs/set.jpg',
        alt: 'The podcast set built for NZCreatorCon',
      },
      { type: 'pull', text: 'A stand gets walked past. A set gets filmed.' },
      {
        type: 'split', side: 'left', title: 'What we built',
        body: [
          'We came in as the agency on the activation and built the parts of the room people would point a camera at.',
          'A working podcast studio, lit and dressed against a slatted backdrop, so conversations recorded on the floor came out looking like a produced show. Alongside it, a photo booth running Sony x ViralX NZCreatorCon prints, so the brand went home in people\'s pockets as a physical object.',
        ],
        src: '/work/sony/cs/booth.jpg',
        alt: 'Sony x ViralX NZCreatorCon photo booth prints',
      },
      {
        type: 'duo',
        captions: [
          'The podcast studio in session on the event floor',
          'Branded prints handed out across both days',
        ],
        srcs: ['/work/sony/cs/talk.jpg', '/work/sony/cs/booth.jpg'],
      },
      {
        type: 'note', title: 'Why it worked',
        body: [
          'Creators do not need to be asked to make content. They need something worth making it about.',
          'Both builds were designed backwards from that. The set gave people a frame they wanted to be seen in, and the prints gave them something to hold up to a camera. The brand travelled on posts the room made for itself.',
        ],
      },
    ],
    phases: [
      ['Brief', 'Get Sony cameras in front of the creator community rather than a trade audience.'],
      ['Build', 'Podcast studio and branded photo booth produced for the event floor at the Pullman.'],
      ['Activation', 'Two days of creator sessions and prints across 28 and 29 May.'],
      ['Output', 'Tagged creator posts published from the floor during the event.'],
    ],
    stats: [
      ['2 days', 'NZCreatorCon at the Pullman Hotel'],
      ['NZ + AU', 'Creators and talent in the room'],
      ['Sony', 'Camera line at the centre of the build'],
    ],
  },
  {
    slug: 'victoria-sushi',
    client: 'Victoria Sushi',
    sector: 'Hospitality',
    year: '2025',
    services: ['Creative Direction', 'Product Development', 'Influencer & Talent', 'Social Media'],
    delivered: '50 Albert St launch',
    headline: "A third store isn't news. So we made something that was.",
    hero: '/work/victoria-sushi/cs/hero.jpg',
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        src: '/work/victoria-sushi/cs/room.jpg',
        alt: 'The Victoria Sushi sign above the counter at 50 Albert Street',
        body: [
          'Victoria Sushi already had two stores in the Auckland CBD. The third, on 50 Albert Street, arrived with the problem every third store has. A new address is not a reason to turn up.',
          'An opening needs something people want to see for themselves. A sushi counter opening in the CBD is not, on its own, that thing.',
        ],
      },
      { type: 'pull', text: 'We stopped selling the store and started building the reason.' },
      {
        type: 'split', side: 'left', title: 'Our approach',
        src: '/work/victoria-sushi/cs/product.jpg',
        alt: 'Push-up sushi held up by creators in the launch campaign',
        body: [
          'We went looking for a product that did not exist in this country. Push-up sushi, served in a tube you push up as you eat, was a format nobody in New Zealand had seen.',
          'We sourced the packaging from a manufacturer in China and developed it into a menu item with the Victoria Sushi kitchen, timed to land on opening day.',
        ],
      },
      {
        type: 'split', side: 'right', title: 'The launch',
        src: '/work/victoria-sushi/cs/viral.jpg',
        alt: 'Creators eating push-up sushi in store, from the launch campaign',
        body: [
          'Then we put it in the hands of the creators whose audiences would react to it first, timed to opening day.',
          'The product did the work the address could not. It gave every creator in the campaign something to film that nobody in the country had filmed before, so they wanted to make it rather than just get paid for it.',
        ],
      },
      {
        type: 'videos',
        items: [
          {
            src: '/work/victoria-sushi/cs/film01.mp4',
            poster: '/work/victoria-sushi/cs/poster01.jpg',
            caption: 'The store film. Front door to the counter to the fryer.',
          },
          {
            src: '/work/victoria-sushi/cs/film02.mp4',
            poster: '/work/victoria-sushi/cs/poster02.jpg',
            caption: 'Staff-led content shot at the front counter.',
          },
        ],
      },
      {
        type: 'note', title: 'A year on',
        body: [
          'A launch is a moment. It takes the attention, and then the attention moves on. The stores still open the next morning.',
          'So the campaign became a retainer. Twelve months later we are still running the account, shooting monthly across all three CBD stores, so the feed shows what is on the counter this week instead of what was there on opening day.',
        ],
      },
    ],
    phases: [
      ['Strategy', 'A new address is not news. We went looking for something that was.'],
      ['Product', 'Packaging sourced from a manufacturer in China, developed into a menu item with the kitchen.'],
      ['Launch', 'Influencer campaign timed to opening day, built on a format New Zealand had never seen.'],
      ['Retainer', 'Twelve months of monthly social across all three stores, and counting.'],
    ],
    stats: [
      ['2M+', 'Views across the launch campaign'],
      ['1M+', 'Views on the top piece alone'],
      ['3', 'Auckland CBD stores'],
    ],
  },
]

export function caseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
