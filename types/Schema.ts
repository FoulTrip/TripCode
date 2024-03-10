// Define enums
export type ProgrammerRole =
  | "notDefined"
  | "frontendEngineer"
  | "backendEngineer"
  | "projectManager";

export type ProjectStatus =
  | "planning"
  | "development"
  | "deployment"
  | "decline";

export type DockerStatus = "false" | "true";

export type MeetingStatus = "pending" | "scheduled" | "completed";

export type PaymentStatus = "pendingPay" | "paid";

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

export type AuthSession = {
  id?: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  phone: string;
  avatar?: string | null | undefined;
  github?: string;
  role?: ProgrammerRole;
  token: string;
};

export type ScalarProjectManager = {
  id?: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  avatar: string | null | undefined;
  role?: ProgrammerRole;
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
  id?: string;
  requirement: string;
  meetingRequestId: string;
  projectId: string;
};

export type PaymentProject = {
  id?: string;
  projectId: string;
  clientId: string;
};

export type DetailPaymentProject = {
  id?: string;
  name: string;
  description: string;
  price: number;
  payProjectId: string;
};

export type ScalarProject = {
  id?: string;
  name: string;
  description: string;
  status: ProjectStatus;
  dockerized: DockerStatus;
  engineers: string[];
  ProjectManagerId: string | null;
  clientId: string;
  repositoryId: string | null;
};

export type ScalarTask = {
  id?: string;
  nameTask: string;
  descriptionTask: string;
  completedBy: string[];
  details: string;
  status: boolean;
  projectId: string;
};

export type RepositoryDetail = {
  id?: string;
  projectId: string;
  repositoryUrl: string;
  name: string;
  description: string;
  branch: string[];
};

// export type ScalarCommit = {
//   id?: string;
//   message: string;
//   changes: string;
//   authorId: string;
//   timestamp: Date;
//   projectId: string;
//   branch: string;
// };

// export type File = {
//   id: string;
//   name: string;
//   changes: string;
//   commit: ScalarCommit;
//   commitId: string;
// };

export type SoftwareEngineerProject = {
  id: string;
  softwareEngineerId: string;
  projectId: string;
  softwareEngineer: ScalarSoftwareEngineer;
  project: ScalarProject;
};

export type ProjectManagerProject = {
  id: string;
  projectManagerId: string;
  projectId: string;
  projectManager: ScalarProjectManager;
  project: ScalarProject;
};

export type ProjectHistory = {
  id: string;
  project: ScalarProject;
  projectId: string;
  description: string;
  developers: string;
  commits: string;
  completionDate: Date;
};
