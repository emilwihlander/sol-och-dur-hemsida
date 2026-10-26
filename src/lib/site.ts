import site from '../content/site.json'

export { site }

export const navigation = [
    { label: 'Nyheter', href: '/nyheter/' },
    { label: 'Om oss', href: '/om-oss/' },
    { label: 'Utbildningen', href: '/utbildningen/' },
    { label: 'Föräldrakooperativet', href: '/foraldrakooperativet/' },
    { label: 'Kontakt', href: '/kontakt/' },
]

// Policy documents linked from the education page, in reading order.
export const educationDocuments = [
    'arbetssatt',
    'vardegrund-vardeord',
    'styrdokument-handlingsplaner',
    'likabehandlingsplan',
    'barn-i-behov-av-sarskilt-stod',
    'modersmalsstod',
]

export const address = `${site.street}, ${site.postalCode} ${site.city}`

export function telHref(phone: string) {
    return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function paragraphs(text = '') {
    return text
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean)
}

const dateFormat = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatDate(date: Date) {
    return dateFormat.format(date)
}
