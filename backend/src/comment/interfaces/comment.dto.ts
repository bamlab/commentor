import { Tag } from '../../tag/tag.entity';
import { Comment as CommentEntity } from '../comment.entity';

export interface Comment {
  body: string;
  filePath: string;
  url: string;
  commentor: string;
  requester: string;
  pullRequestUrl: string;
  repositoryId: number;
}

export type CommentEvent = GithubCommentEvent | GitlabCommentEvent;

export type CommentAction = 'created' | 'edited' | 'deleted';

export interface GithubCommentEvent {
  action: 'created' | 'edited' | 'deleted';
  comment: GithubComment;
  pull_request: GithubPullRequest;
  repository: GithubRepo;
  sender: GithubSender;
}

export interface GithubComment {
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
  user: GithubSender;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: GithubCommentLinks;
}

export interface GithubCommentLinks {
  self: HTML;
  html: HTML;
  pull_request: HTML;
}

export interface HTML {
  href: string;
}

export interface GithubSender {
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

export interface GithubPullRequest {
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
  user: GithubSender;
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
  head: GithubBase;
  base: GithubBase;
  _links: GithubPullRequestLinks;
  author_association: string;
}

export interface GithubPullRequestLinks {
  self: HTML;
  html: HTML;
  issue: HTML;
  comments: HTML;
  review_comments: HTML;
  review_comment: HTML;
  commits: HTML;
  statuses: HTML;
}

export interface GithubBase {
  label: string;
  ref: string;
  sha: string;
  user: GithubSender;
  repo: GithubRepo;
}

export interface GithubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubSender;
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

export interface GitlabCommentEvent {
  object_kind: string;
  user: GitlabUser;
  project_id: number;
  project: GitlabProject;
  repository: GitlabRepository;
  object_attributes: GitlabObjectAttributes;
  merge_request?: GitlabMergeRequest;
  commit?: GitlabCommit;
}

export interface GitlabCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: GitlabAuthor;
}

export interface GitlabMergeRequest {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number;
  state: string;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  position: number;
  source: GitlabProject;
  target: GitlabProject;
  last_commit: GitlabLastCommit;
  work_in_progress: boolean;
  assignee: GitlabUser;
}

export interface GitlabUser {
  name: string;
  username: string;
  avatar_url: string;
}

export interface GitlabLastCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: GitlabAuthor;
}

export interface GitlabAuthor {
  name: string;
  email: string;
}

export interface GitlabProject {
  name: string;
  description: string;
  web_url: string;
  avatar_url: null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
  id?: number;
}

export interface GitlabObjectAttributes {
  id: number;
  note: string;
  noteable_type: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: null;
  line_code: null;
  commit_id: string;
  noteable_id: number;
  system: boolean;
  st_diff: GitlabStDiff;
  url: string;
}

export interface GitlabStDiff {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export interface GitlabRepository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface FiltersType {
  repositoryIds: number[];
  startingDate: Date | null;
  endingDate: Date | null;
  requesterIds: string[];
  commentorIds: string[];
  tagCodes: string[];
  oAuthLogin: string | null;
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
