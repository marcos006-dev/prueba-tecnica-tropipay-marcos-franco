import fs from "fs";
import { IExtractor } from "../interface/IExtractor";
import { ILink } from "../interface/ILink";
import { IPage } from "../interface/IPage";
import { IRequest } from "../interface/IRequest";

export class Crawler {
  private requestService: IRequest;
  private extractorService: IExtractor;
  private url: string;
  private maxDist: number;
  private pathSave: string;
  private visitedLinks: IPage[] = [];

  constructor(
    requestService: IRequest,
    extractorService: IExtractor,
    url: string,
    maxDist: number,
    pathSave: string
  ) {
    this.url = url.trim().replace(/^\/|\/$/g, "");
    this.maxDist = maxDist;
    this.pathSave = pathSave;
    this.requestService = requestService;
    this.extractorService = extractorService;
  }

  /**
   * Crawls the specified URL and searches for links to visit.
   * @returns A Promise that resolves when the crawling is complete.
   */
  async crawl() {
    try {
      this.logger("Starting crawler...");

      const pageHtml = await this.requestService.sendRequest(this.url);
      this.logger("Extracting data...");
      const data = this.extractorService.getData(pageHtml);

      this.logger("Filtering links...");
      const links: ILink[] = this.filterLinksWithoutHref(data.links);
      const linksToVisit = links.slice(0, this.maxDist);
      await this.searchLinks(linksToVisit);
    } catch (error: any) {
      this.logger(`Error Crawling ${error}`);
    }
  }

  /**
   * Searches for links in the provided array, visits each link, extracts data from the page HTML,
   * and saves the visited links to a file.
   * @param links An array of links to search for and visit.
   */
  async searchLinks(links: ILink[]) {
    for (let link of links) {
      try {
        link = this.verifyCleanLinks(link);
        this.logger(`Visiting link: ${link.href}`);
        const pageHtml = await this.requestService.sendRequest(link.href);
        const data = this.extractorService.getData(pageHtml);
        this.visitedLinks.push({
          title: data.title,
          href: data.links,
          description: data.description,
        });
      } catch (error: any) {
        this.logger(`Error to get link ${link.href} ${error}`);
      }
    }
    this.logger("Saving links...");
    this.saveLinksInFile(this.pathSave, this.visitedLinks);
    this.logger("Crawler finished!");
  }

  /**
   * Saves an array of IPage objects as a JSON file at the specified path.
   * If the directory does not exist, it will be created.
   * @param path - The path where the file will be saved.
   * @param links - An array of IPage objects to be saved as a JSON file.
   */
  saveLinksInFile(path: string, links: IPage[]) {
    const data = JSON.stringify(links);
    const filePath = `${path}/links.json`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFileSync(filePath, data);
  }

  /**
   * Verifies and cleans the provided link, ensuring that it includes the protocol and the full URL.
   * @param link - The link to be verified and cleaned.
   * @returns The cleaned link.
   */
  verifyCleanLinks(link: ILink): ILink {
    if (!link.href.includes("http://") && !link.href.includes("https://")) {
      link.href = link.href.trim().replace(/^\/|\/$/g, "");
      link.href = `${this.url}/${link.href}`;
    }
    return link;
  }

  /**
   * Filters an array of links to remove any links without an href attribute.
   * @param links - The array of links to filter.
   * @returns An array of links that have an href attribute.
   */
  filterLinksWithoutHref(links: ILink[]): ILink[] {
    return links.filter((link: ILink) => link.href != "#");
  }

  /**
   * Logs a message to the console.
   * @param message - The message to log.
   */
  private logger(message: string) {
    console.log(message);
  }
}
