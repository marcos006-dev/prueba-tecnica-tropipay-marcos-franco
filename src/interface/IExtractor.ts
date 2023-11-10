import { ILink } from "./ILink";

export interface IDataExtractor {
  title: string;
  softTitle: string;
  description: string;
  links: ILink[];
}

export interface IExtractor {
  getData(pageHtml: any): IDataExtractor;
}
