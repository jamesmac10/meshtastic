import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ReactMarkdown from "react-markdown";

import "../css/faq.css";

export interface Faq {
  title: string;
  content: string;
}

/**
 * Gets the query parameter `openFaqItems` which is an array of
 * faq items that should be pre-opened
 * @type {Function}
 */
const getOpenFaqItemsFromUrl = (slug: string): string[] => {
  if (typeof window !== "undefined") {
    // Use URLSearchParams to parse the query parameters from the current URL
    const searchParams = new URLSearchParams(window.location.search);

    // Get the 'openFaqItems' parameter as a comma-separated string
    const openFaqItemsString = searchParams.get(`openFaqItems-${slug}`);

    // If the parameter exists, split it by commas into an array; otherwise, return an empty array
    return openFaqItemsString ? openFaqItemsString.split(",") : [];
  }
};

/**
 * Updates query parameters in the url when items are opened
 * so that a link can be shared with the faq item already opened
 */
const handleChange = (
  openFaqItems: (string | number)[],
  slug: string,
): void => {
  const searchParams = new URLSearchParams(window.location.search);

  if (openFaqItems.length > 0) {
    // Create comma-separated string and update/add the parameter
    searchParams.set(
      `openFaqItems-${slug}`,
      openFaqItems.map(String).join(","),
    );

    // Update the hash to be the first item in the openFaqItems array
    // Ensure the first item is a string and encode it for URL hash
    const hash = `accordion__heading-${openFaqItems[0]}`;
    console.log("hash", hash);
    window.location.hash = hash;
  } else {
    // If openFaqItems is empty, remove the parameter and hash from the URL
    searchParams.delete(`openFaqItems-${slug}`);
    window.location.hash = "";
  }

  // Construct the new URL, preserve existing parameters
  const newUrlWithoutHash = `${window.location.protocol}//${
    window.location.host
  }${window.location.pathname}?${searchParams.toString()}`;

  // Change the URL without reloading the page, including the new hash if applicable
  // Note: We don't directly include the hash in newUrl because changing window.location.hash already modifies it
  window.history.pushState(
    { path: newUrlWithoutHash + window.location.hash },
    "",
    newUrlWithoutHash + window.location.hash,
  );
};

export const FaqAccordion = ({
  rows,
  slug,
}: { rows: Faq[]; slug: string }): JSX.Element => {
  return (
    <BrowserOnly fallback={<div>Loading FAQ's...</div>}>
      {() => {
        return (
          <Accordion
            allowMultipleExpanded={true}
            allowZeroExpanded={true}
            onChange={(itemUuids) => {
              handleChange(itemUuids, slug);
            }}
            preExpanded={getOpenFaqItemsFromUrl(slug)}
          >
            {rows.map((row, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: React complains if there is no key
              <AccordionItem key={index}>
                <AccordionItemHeading aria-level="3">
                  <AccordionItemButton>{row.title}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ReactMarkdown>{row.content}</ReactMarkdown>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        );
      }}
    </BrowserOnly>
  );
};
