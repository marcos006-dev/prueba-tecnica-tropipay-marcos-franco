#!/usr/bin/env node
import yargs, { Arguments } from "yargs";
import { Crawler } from "./services/CrawlerService";
import { RequestService } from "./services/RequestService";
import { UnfluffService } from "./services/UnfluffService";

const main = async () => {
  try {
    /**
     * Command line options for the crawler.
     */
    const options: Arguments = await yargs
      .option("url", {
        describe: "URL to crawl",
        type: "string",
        demandOption: true,
      })
      .option("maxdist", {
        describe: "Maximum distance to crawl",
        type: "number",
        demandOption: true,
      })
      .option("db", {
        describe: "Database connection string",
        type: "string",
        demandOption: true,
      })
      .help(true).argv;

    /**
     * Represents a web crawler instance.
     */
    const crawler = new Crawler(
      new RequestService(),
      new UnfluffService(),
      options.url as string,
      options.maxdist as number,
      options.db as string
    );

    crawler.crawl();
  } catch (error) {
    console.log(error);
  }
};

main();
