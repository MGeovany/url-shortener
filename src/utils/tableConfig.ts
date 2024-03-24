import { PAGINATION_SIZE } from "./constants";

export const VISIBLE_LINKS = (tableData: LinkData[]): LinkData[] => {
  const visibleLinks = tableData.slice(0, 5);
  const lastVisibleLink = visibleLinks[visibleLinks.length - 1];
  const blurredLastLink = { ...lastVisibleLink, blur: true };
  visibleLinks[visibleLinks.length - 1] = blurredLastLink;

  return visibleLinks;
};

export const LINKS_PER_PAGE = (
  tableData: LinkData[],
  activePage: number
): LinkData[] => {
  const startIndex = (activePage - 1) * PAGINATION_SIZE;
  const endIndex = startIndex + PAGINATION_SIZE;
  const linksToShow = tableData.slice(startIndex, endIndex);

  return linksToShow;
};
