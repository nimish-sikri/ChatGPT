export function trimTextWithDots(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + '...';
    }
}