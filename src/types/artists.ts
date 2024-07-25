import { AxiosHeaders } from "axios";

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  name: string;
  popularity: number;
  type: string;
	uri: string;
  country?: string;
  gender?: string;
  debut?: string;
  groupOrPerson?: string;
}

export interface ArtistsResponse {
    items: Artist[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
	previous: string | null;
}

export interface ArtistApiResponse {
	config: unknown;
	data: ArtistsResponse;
	headers: AxiosHeaders;
	request: XMLHttpRequest;
	status: number;
	statusText: string;
  }
