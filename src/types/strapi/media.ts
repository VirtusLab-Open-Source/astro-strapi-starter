export type StrapiMedia = {
	url: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	previewUrl: string;
	provider: string;
	provider_metadata: any;
	formats: {
		small?: StrapiMedia;
		medium?: StrapiMedia;
		large?: StrapiMedia;
	};
};
