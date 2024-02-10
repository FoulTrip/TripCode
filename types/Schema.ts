// Define enums
export type ProgrammerRole =
  | "notDefined"
  | "frontendEngineer"
  | "backendEngineer";

export type ProjectStatus = "planning" | "development" | "deployment";

export type DockerStatus = "false" | "true";

export type MeetingStatus = "pending" | "scheduled" | "completed";

// Define main types
export type ScalarClient = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  avatar: string | null | undefined;
};

export type ScalarSoftwareEngineer = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  avatar: string | null | undefined;
  github: string;
  role?: ProgrammerRole;
};

export type ScalarProjectManager = {
  id?: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  avatar: string | null | undefined;
};

export type ScalarMeetingRequest = {
  id?: string;
  clientId: string;
  managerId?: string;
  timestamp?: string;
  status?: MeetingStatus;
  meetingLink?: string;
};

export type ProjectRequirement = {
  id: string;
  requirement: string;
  dueDate?: Date | null;
  MeetingRequest?: ScalarMeetingRequest | null;
  meetingRequestId?: string | null;
  Project?: Project | null;
  projectId?: string | null;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  dockerized: DockerStatus;
  client: ScalarClient;
  clientId: string;
  commits: Commit[];
  engineers: SoftwareEngineerProject[];
  managers: ProjectManagerProject[];
  ProjectHistory: ProjectHistory[];
  requirements: ProjectRequirement[];
  SoftwareEngineer?: ScalarSoftwareEngineer | null;
  softwareEngineerId?: string | null;
  ProjectManager: ScalarProjectManager[];
};

export type SoftwareEngineerProject = {
  id: string;
  softwareEngineerId: string;
  projectId: string;
  softwareEngineer: ScalarSoftwareEngineer;
  project: Project;
};

export type ProjectManagerProject = {
  id: string;
  projectManagerId: string;
  projectId: string;
  projectManager: ScalarProjectManager;
  project: Project;
};

export type ProjectHistory = {
  id: string;
  project: Project;
  projectId: string;
  description: string;
  developers: string;
  commits: string;
  completionDate: Date;
};

export type Commit = {
  id: string;
  message: string;
  changes: string;
  author: ScalarSoftwareEngineer;
  authorId: string;
  timestamp: Date;
  project: Project;
  projectId: string;
  branch: string;
  files: File[];
};

export type File = {
  id: string;
  name: string;
  changes: string;
  commit: Commit;
  commitId: string;
};
