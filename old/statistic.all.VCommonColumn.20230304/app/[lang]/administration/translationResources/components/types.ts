export type TComputingNodeInstance = {
  id: string;
  memory: number;
  nbRestart: number;
  pid: number;
  status: string;
};
type TComputingNodeDependencyChild = {
  convergenceState: string;
  id: string;
  role: string;
  status: string;
};
type TComputingNodeDependencyInstance = {
  id: string;
  image: string;
  name: string;
  status: string;
};
export type TComputingNodeDependency = {
  architecture: string;
  convergenceState: string;
  dependencies: TComputingNodeDependencyChild[];
  description: string;
  distrib: string;
  expectedInstanceCount: number;
  expectedStatus: string;
  id: string;
  instanceCount: number;
  instances: TComputingNodeDependencyInstance[];
  internal: string;
  isContainerTR: string;
  name: string;
  role: string;
  runnable: string;
  sourceLanguage: string;
  status: string;
  targetLanguage: string;
  type: string;
  version_pushProfile: string;
  version?: string;
};
export type TComputingNode = {
  convergenceState: string;
  expectedStatus: string;
  hostname: string;
  id: string;
  lastUpdate: string;
  nbInstances: number;
  nbInstancesRequested?: number;
  nodeStatus: string;
  status: string;
  statusFailed: boolean;
  instances: TComputingNodeInstance[];
  dependencies: TComputingNodeDependency[];
  warning?: boolean;
  flow?: unknown;
  installOutput?: string;
  postConfigOutput?: string;
  unconfigureOutput?: string;
  uninstallOutput?: string;
};
type TPackageDependencies = {[key: string]: string};
type TDefaultDowngradeTr = {
  defaultDowngrade: boolean;
  dependencies: unknown;
  description: {name: string; service: string; version: string};
  id: string;
  insertedAt: string;
  packageDependencies: TPackageDependencies;
  rejected: boolean;
  _id: string;
};
export type TSelectors = {
  owner?: string;
  domain?: string;
  languagePair?: string;
  size?: string;
  project?: string;
  tech?: {
    details: Array<{type: string; name: string}>;
    type: string;
    name: string;
  };
};
type TJsonSchemaProperties = {
  [key: string]:
    | {
        default: string;
        enum: string[];
        title: string;
        type: string;
      }
    | string;
  title: string;
  type: string;
};
type TJsonSchema = {
  additionalProperties?: string | boolean;
  properties?: TJsonSchemaProperties;
  title?: string;
  type?: string;
};
export type TModelOptions = {
  supported_features: {
    [key: string]: boolean;
  };
  json_schema: TJsonSchema;
};
export type TRoute = {
  comment: {
    profileId?: string;
    serviceName: string;
    translationResourceId: string;
    translationResourceName: string;
  };
  deactivated: boolean;
  flow?: Array<{
    options: Array<{name: string; value: string}>;
    profileId: string;
    serviceName: string;
  }>;
  insertionTime: string;
  internal?: boolean;
  json_schema?: TJsonSchema;
  options?: Array<{name: string; value: string}>;
  priority: number;
  profileId: string;
  public: boolean;
  queue: string;
  running: boolean;
  selectors?: TSelectors;
  service: string;
  version: string;
  serverVersion: string;
  insertedAt: string;
  sharingStatus: string;
  source?: string;
  target?: string;
  serviceName: string;
};

export type TTranslationResourceFlowObject = {depId: string; nbInstances: number; nbInstancesRequested: number; status: string; expectedStatus: string; role?: string};
export type TTranslationResourceFlow = Array<string | TTranslationResourceFlowObject>;

export type TTranslationResource = {
  activatedProfiles: number;
  architecture: string;
  computingNodes?: TComputingNode[];
  defaultDowngradeTr?: TDefaultDowngradeTr;
  defaultUpgradeTr?: {id?: string};
  description: string;
  distrib: string;
  downgradeable: boolean;
  expectedStatus: string;
  flow?: TTranslationResourceFlow;
  id: string;
  insertedAt: string;
  installBodyOptions?: unknown;
  installableComputingNodes: Array<{hostname: string}>;
  lastUpdate: string;
  master: boolean;
  name: string;
  nbInstances: number;
  nbInstancesRequested: number;
  packageDependencies: TPackageDependencies;
  profiles: number;
  role: string;
  routes?: TRoute[];
  runnable: boolean;
  runningProfiles: number;
  selectors?: TSelectors;
  service: string;
  status: string;
  statusFailed: boolean;
  updatedAt: string;
  upgradeable: boolean;
  version: string;
  versionObj: {major: number; minor: number; patch: number};
  modelOptions: TModelOptions;
  pivot?: unknown;
  warning?: boolean;
  size?: number | string;
  type?: string;
  store?: unknown;
  noSelectors?: boolean;
  authorizeConfigTrOption?: unknown;
  profileId?: string;
  internal?: unknown;
  source?: string;
  target?: string;
};
