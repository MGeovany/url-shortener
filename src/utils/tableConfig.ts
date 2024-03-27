import { PAGINATION_SIZE } from "./constants";

export const VISIBLE_LINKS = (tableData: LinkData[] = []): LinkData[] => {
  if (tableData.length === 0) {
    return [];
  }

  const visibleLinks = tableData.slice(0, 5);

  if (visibleLinks.length === 0) {
    return [];
  }

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
  const linksToShow = tableData?.slice(startIndex, endIndex);

  return linksToShow;
};
