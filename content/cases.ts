/** Written case studies. A case study is a list of blocks rather than a fixed
 *  template, so each campaign can take the shape its story needs. A project
 *  without an entry here stays on the wall and links to Instagram instead. */

export type Block =
  | { type: 'split'; side: 'left' | 'right'; title: string; body: string[] }
  | { type: 'full'; caption?: string }
  | { type: 'duo'; captions: [string, string] }
  | { type: 'pull'; text: string }

export type CaseStudy = {
  slug: string
  client: string
  sector: string
  year: string
  services: string[]
  delivered: string
  headline: string
  blocks: Block[]
  phases: [string, string][]
  stats: [string, string][]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'victoria-sushi',
    client: 'Victoria Sushi',
    sector: 'Hospitality',
    year: '2025',
    services: ['Creative Direction', 'Product Development', 'Influencer & Talent', 'Social Media'],
    delivered: '50 Albert St launch',
    headline: "A third store isn't news. So we made something that was.",
    blocks: [
      {
        type: 'split', side: 'right', title: 'The brief',
        body: [
          'Victoria Sushi already had two stores in the Auckland CBD. The third, on 50 Albert Street, arrived with the problem every third store has. A new address is not a reason to turn up.',
          'An opening needs something people want to see for themselves. A sushi counter opening in the CBD is not, on its own, that thing.',
        ],
      },
      { type: 'pull', text: 'We stopped selling the store and started building the reason.' },
      {
        type: 'split', side: 'left', title: 'Our approach',
        body: [
          'We went looking for a product that did not exist in this country. Push-up sushi, served in a tube you push up as you eat, was a format nobody in New Zealand had seen.',
          'We sourced the packaging from a manufacturer in China and developed it into a menu item with the Victoria Sushi kitchen, timed to land on opening day.',
        ],
      },
      { type: 'full', caption: 'The product built for the launch. The first push-up sushi on the New Zealand market.' },
      {
        type: 'split', side: 'right', title: 'The launch',
        body: [
          'Then we put it in the hands of the creators whose audiences would react to it first, timed to opening day.',
          'The product did the work the address could not. It gave every creator in the campaign something to film that nobody in the country had filmed before, so they wanted to make it rather than just get paid for it.',
        ],
      },
      { type: 'duo', captions: ['Packaging sourced and developed for the launch', 'Opening day, 50 Albert Street'] },
    ],
    phases: [
      ['Strategy', 'A new address is not news. We went looking for something that was.'],
      ['Product', 'Packaging sourced from a manufacturer in China, developed into a menu item with the kitchen.'],
      ['Launch', 'Influencer campaign timed to opening day, built on a format New Zealand had never seen.'],
      ['Ongoing', 'Monthly social media management across all three stores since.'],
    ],
    stats: [
      ['2M+', 'Views across the launch campaign'],
      ['3', 'Auckland CBD stores'],
      ['Ongoing', 'Monthly social since launch'],
    ],
  },
]

export function caseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
