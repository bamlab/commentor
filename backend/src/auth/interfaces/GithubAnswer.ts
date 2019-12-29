export interface GithubLoginAnswer {
  data: Data;
}

export interface Data {
  viewer: Viewer;
}

export interface Viewer {
  login: String;
}
