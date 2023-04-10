import { PAGINATION_SIZE } from "./constants";

export const VISIBLE_LINKS = (tableData: LinkData[]): LinkData[] => {
  const visibleLinks = tableData.slice(0, 5); // get first 5 links
  const lastVisibleLink = visibleLinks[visibleLinks.length - 1];
  const blurredLastLink = { ...lastVisibleLink, blur: true }; // create a new object with blur property
  visibleLinks[visibleLinks.length - 1] = blurredLastLink; // replace the last visible link with the blurred one

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
