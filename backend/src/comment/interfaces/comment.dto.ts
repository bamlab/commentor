import { Tag } from '../../tag/tag.entity';
import { Comment as CommentEntity } from '../comment.entity';

export interface CommentEvent {
  action: 'created' | 'edited' | 'deleted';
  comment: Comment;
  pull_request: PullRequest;
  repository: Repo;
  sender: Sender;
}

export interface Comment {
  url: string;
  pull_request_review_id: number;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  user: Sender;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: CommentLinks;
}

export interface CommentLinks {
  self: HTML;
  html: HTML;
  pull_request: HTML;
}

export interface HTML {
  href: string;
}

export interface Sender {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: Sender;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: null;
  merged_at: null;
  merge_commit_sha: string;
  assignee: null;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone: null;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: Base;
  base: Base;
  _links: PullRequestLinks;
  author_association: string;
}

export interface PullRequestLinks {
  self: HTML;
  html: HTML;
  issue: HTML;
  comments: HTML;
  review_comments: HTML;
  review_comment: HTML;
  commits: HTML;
  statuses: HTML;
}

export interface Base {
  label: string;
  ref: string;
  sha: string;
  user: Sender;
  repo: Repo;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Sender;
  html_url: string;
  description: null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface FiltersType {
  repositoryIds: number[];
  startingDate: Date | null;
  endingDate: Date | null;
  requesterIds: string[];
  commentorIds: string[];
  tagCodes: string[];
  githubLogin: string | null;
}

interface PieChartData {
  x: number | string;
  y: number;
  tag: Tag;
}

export interface BarChartData {
  x: Date;
  y: number;
  y0: number;
  tag: Tag;
}

export interface GetFilteredCommentsAnswer {
  comments: CommentEntity[];
  pieChartData: PieChartData[];
  barChartData: BarChartData[];
}
