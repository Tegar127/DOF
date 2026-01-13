export function getIndoDate(dateStr) {
    if (!dateStr) return '...';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
