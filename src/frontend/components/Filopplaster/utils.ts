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
    PDF = 'PDF',
    PNG = 'PNG',
    JPG = 'JPG',
    JPEG = 'JPEG',
}

export const filtypeTilMime: Record<Filtyper, string> = {
    PDF: 'application/pdf',
    PNG: 'image/png',
    JPG: 'image/jpg',
    JPEG: 'image/jpeg',
};

export const filtypeTilFilendelse: Record<Filtyper, string> = {
    PDF: '.pdf',
    PNG: '.png',
    JPG: '.jpg',
    JPEG: '.jpeg',
};
export const TILLATE_FILTYPER: string[] = Object.values(filtypeTilMime);

export const TILLATE_FILENDELSER: string = Object.values(filtypeTilFilendelse).join(',');

export const TILLATE_SAMTDIGE_OPPLASTINGER = 5;
