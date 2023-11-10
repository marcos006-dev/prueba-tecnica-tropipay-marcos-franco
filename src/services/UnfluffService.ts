// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import extractor from "unfluff";
import { IDataExtractor, IExtractor } from "../interface/IExtractor";

/**
 * A service that extracts data from HTML using the Unfluff library.
 */
export class UnfluffService implements IExtractor {
  getData(pageHtml: any): IDataExtractor {
    return extractor(pageHtml.data);
  }
}
