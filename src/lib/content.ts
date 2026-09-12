export type PageRecord = {
    slug: string
    title: string
    description?: string
    body?: string
    order?: number
    [key: string]: unknown
}

const pageModules = import.meta.glob('../content/pages/*.json', {
    eager: true,
    import: 'default',
}) as Record<string, PageRecord>

const siteModules = import.meta.glob('../content/site.json', {
    eager: true,
    import: 'default',
}) as Record<string, Record<string, unknown>>

const rawSite = Object.values(siteModules)[0] ?? {}
const contact = (rawSite.contact ?? {}) as Record<string, unknown>
const rawAddress = (contact.address ?? {}) as Record<string, unknown>

const defaultAddress = 'Slånbacken 8, 163 51 Spånga'
const address = [rawAddress.street, rawAddress.postalCode, rawAddress.city]
    .filter((part): part is string => typeof part === 'string' && part.length > 0)
    .join(', ')

export const site = {
    name: typeof rawSite.title === 'string' ? rawSite.title : 'Förskolan Sol och Dur',
    shortName: 'Sol och Dur',
    tagline:
        typeof rawSite.description === 'string'
            ? rawSite.description
            : 'En liten förskola med stora möjligheter',
    description:
        typeof rawSite.description === 'string'
            ? rawSite.description
            : 'Förskolan Sol och Dur är en liten förskola i Solhem, Spånga, där barn får utforska, leka och lära tillsammans.',
    address: address || defaultAddress,
    email: typeof contact.email === 'string' ? contact.email : '',
    phone: typeof contact.phone === 'string' ? contact.phone : '',
}

export type NavItem = {
    label: string
    href: string
    children?: NavItem[]
}

const fallbackNavigation: NavItem[] = [
    { label: 'Personal', href: '/personal/' },
    { label: 'Föräldrakooperativet', href: '/foraldrakooperativet/' },
    {
        label: 'Utbildningen',
        href: '/verksamheten/',
        children: [
            { label: 'Arbetssätt', href: '/arbetssatt/' },
            { label: 'Värdegrund & Värdeord', href: '/vardegrund-vardeord/' },
            {
                label: 'Handlingsplaner',
                href: '/styrdokument-handlingsplaner/',
                children: [
                    { label: 'Likabehandlingsplan', href: '/likabehandlingsplan/' },
                    {
                        label: 'Anmälan till Socialnämnden',
                        href: '/barn-i-behov-av-sarskilt-stod/',
                    },
                    { label: 'Barn i behov av särskilt stöd', href: '/modersmalsstod/' },
                ],
            },
        ],
    },
    {
        label: 'Kontakta oss',
        href: '/kontakt/',
        children: [
            { label: 'Nyheter', href: '/nyheter/' },
            {
                label: 'Integritetsskyddspolicy',
                href: '/forskolan-sol-och-durs-integritetsskyddspolicy/',
            },
            { label: 'Klagomålshantering på vår förskola', href: '/synpunkter/' },
        ],
    },
]

function normalizeNavigation(value: unknown, useFallback = true): NavItem[] {
    if (!Array.isArray(value)) return useFallback ? fallbackNavigation : []

    return value
        .filter(
            (item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object',
        )
        .filter((item) => typeof item.label === 'string' && typeof item.href === 'string')
        .map((item) => {
            const children = normalizeNavigation(item.children, false)
            return {
                label: item.label as string,
                href: item.href as string,
                ...(children.length > 0 ? { children } : {}),
            }
        })
}

export const navigation = normalizeNavigation(rawSite.navigation)

function normalizeSlug(value: string | undefined): string {
    const decoded = decodeURIComponent(value ?? '')
    const withoutSlashes = decoded.trim().replace(/^\/+|\/+$/g, '')
    return withoutSlashes || 'solochdur'
}

function slugFromFile(path: string): string {
    const fileName =
        path
            .split('/')
            .pop()
            ?.replace(/\.json$/, '') ?? ''
    return normalizeSlug(fileName)
}

function pageFromModule(path: string, data: PageRecord): PageRecord {
    return {
        ...data,
        slug: normalizeSlug(data.slug || slugFromFile(path)),
        title: data.title || 'Sol och Dur',
    }
}

export function getAllPages(): PageRecord[] {
    return Object.entries(pageModules)
        .map(([path, data]) => pageFromModule(path, data))
        .sort((left, right) => (left.order ?? 100) - (right.order ?? 100))
}

export function getPage(slug?: string): PageRecord | undefined {
    const wanted = normalizeSlug(slug)
    return getAllPages().find((page) => page.slug === wanted)
}

export function pathForPage(page: Pick<PageRecord, 'slug'>): string {
    return page.slug === 'solochdur' ? '/' : `/${page.slug}/`
}

export function isCurrentPath(currentPath: string, href: string): boolean {
    const current = currentPath.replace(/\/+$/, '') || '/'
    const target = href.replace(/\/+$/, '') || '/'
    return current === target
}
