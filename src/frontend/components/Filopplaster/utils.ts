export const formaterFilstørrelse = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const MAX_FILSTØRRELSE = 1024 * 1024 * 10; // 10mb
export const MAKS_FILSTØRRELSE_FORMATTERT = formaterFilstørrelse(MAX_FILSTØRRELSE);

enum Filtyper {
    PDF = 'application/pdf',
    PNG = 'image/png',
    JPG = 'image/jpg',
    JPEG = 'image/jpeg',
}
export const TILLATE_FILTYPER: string[] = [Filtyper.PNG, Filtyper.PDF, Filtyper.JPG, Filtyper.JPEG];
