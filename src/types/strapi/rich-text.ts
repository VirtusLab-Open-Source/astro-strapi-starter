export type StrapiBlockTextItem = {
	text: string;
	type: "text";
	bold?: boolean;
	italic?: boolean;
};

export type StrapiBlockLinkItem = {
	url: string;
	type: "link";
	children: Array<StrapiBlockTextItem>;
};

export type StrapiBlockListItem = {
	type: "list-item";
	children: Array<StrapiBlockNode>;
};

export type StrapiBlockNode = StrapiBlockTextItem | StrapiBlockLinkItem;

export type StrapiBlockHeading = {
	type: "heading";
	level: number;
};

export type StrapiBlockListType = "ordered" | "unordered";

export type StrapiBlockList = {
	type: "list";
	format: StrapiBlockListType;
	children: Array<StrapiBlockListItem>;
};

export type StrapiBlockParagraph = {
	type: "paragraph";
};

export type StrapiBlockVariations = StrapiBlockParagraph | StrapiBlockHeading | StrapiBlockList;

export type StrapiBlock<T = StrapiBlockVariations> = {
	children: Array<StrapiBlockTextItem>;
} & T;

export type StrapiBlockField = Array<StrapiBlock>;
