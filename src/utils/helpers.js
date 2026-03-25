/**
 * Format a date string to a human-readable locale string
 */
export function formatDate(date, locale = 'fr-FR') {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
/**
 * Format a date to relative time (e.g., "il y a 3 jours")
 */
export function timeAgo(date) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    const intervals = [
        { label: 'an', seconds: 31536000 },
        { label: 'mois', seconds: 2592000 },
        { label: 'jour', seconds: 86400 },
        { label: 'heure', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `il y a ${count} ${interval.label}${count > 1 && interval.label !== 'mois' ? 's' : ''}`;
        }
    }
    return "à l'instant";
}
/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength).trimEnd() + '...';
}
/**
 * Format file size in bytes to human-readable
 */
export function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
/**
 * Generate initials from a name
 */
export function getInitials(firstName, lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
/**
 * Debounce a function
 */
export function debounce(fn, ms) {
    let timeoutId;
    return ((...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), ms);
    });
}
