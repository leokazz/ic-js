import type { DerEncodedPublicKey } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import type { CreateServiceNervousSystem } from "../../candid/governance";
import type {
  NeuronState,
  ProposalRewardStatus,
  ProposalStatus,
  Topic,
  Vote,
} from "../enums/governance.enums";
import type {
  AccountIdentifier,
  CanisterIdString,
  E8s,
  NeuronId,
  Option,
  PrincipalString,
} from "./common";

export type Action =
  | { RegisterKnownNeuron: KnownNeuron }
  | {
      ExecuteNnsFunction: ExecuteNnsFunction;
    }
  // TODO: Create new CreateServiceNervousSystem type (don't use array for optional fields)
  | { CreateServiceNervousSystem: CreateServiceNervousSystem }
  | { ManageNeuron: ManageNeuron }
  | { ApproveGenesisKyc: ApproveGenesisKyc }
  | { ManageNetworkEconomics: NetworkEconomics }
  | { RewardNodeProvider: RewardNodeProvider }
  | { RewardNodeProviders: RewardNodeProviders }
  | { AddOrRemoveNodeProvider: AddOrRemoveNodeProvider }
  | { SetDefaultFollowees: SetDefaultFollowees }
  | { Motion: Motion }
  | { SetSnsTokenSwapOpenTimeWindow: SetSnsTokenSwapOpenTimeWindow }
  | { OpenSnsTokenSwap: OpenSnsTokenSwap };
export interface AddHotKey {
  newHotKey: Option<PrincipalString>;
}
export interface AddOrRemoveNodeProvider {
  change: Option<Change>;
}
export interface ApproveGenesisKyc {
  principals: Array<PrincipalString>;
}
export type AuthzChangeOp =
  | { Authorize: { addSelf: boolean } }
  | { Deauthorize: null };
export interface Ballot {
  neuronId: bigint;
  vote: Vote;
  votingPower: bigint;
}
export interface BallotInfo {
  vote: Vote;
  proposalId: Option<ProposalId>;
}
export type By =
  | { NeuronIdOrSubaccount: Record<string, never> }
  | { MemoAndController: ClaimOrRefreshNeuronFromAccount }
  | { Memo: bigint };
export interface CanisterAuthzInfo {
  methodsAuthz: Array<MethodAuthzInfo>;
}
export type Change = { ToRemove: NodeProvider } | { ToAdd: NodeProvider };
export type ClaimOrRefresh = { by: Option<By> };
export interface ClaimOrRefreshNeuronFromAccount {
  controller: Option<Principal>;
  memo: bigint;
}
export type ClaimOrRefreshNeuronRequest = {
  neuronId: NeuronId;
  by: Option<By>;
};
export type Command =
  | { Spawn: Spawn }
  | { Split: Split }
  | { Follow: Follow }
  | { ClaimOrRefresh: ClaimOrRefresh }
  | { Configure: Configure }
  | { RegisterVote: RegisterVote }
  | { Merge: Merge }
  | { DisburseToNeuron: DisburseToNeuron }
  | { MergeMaturity: MergeMaturity }
  | { StakeMaturity: StakeMaturity }
  | { MakeProposal: Proposal }
  | { Disburse: Disburse };
export interface Configure {
  operation: Option<Operation>;
}
export interface Disburse {
  toAccountId: Option<AccountIdentifier>;
  amount: Option<E8s>;
}
export interface DisburseResponse {
  transferBlockHeight: bigint;
}
export interface DisburseToNeuron {
  dissolveDelaySeconds: bigint;
  kycVerified: boolean;
  amount: E8s;
  newController: Option<PrincipalString>;
  nonce: bigint;
}
export type DissolveState =
  | { DissolveDelaySeconds: bigint }
  | { WhenDissolvedTimestampSeconds: bigint };
export interface ExecuteNnsFunction {
  nnsFunctionId: number;
  payloadBytes?: ArrayBuffer;
}
export interface Follow {
  topic: Topic;
  followees: Array<NeuronId>;
}
export interface Followees {
  topic: Topic;
  followees: Array<NeuronId>;
}

export interface IncreaseDissolveDelay {
  additionalDissolveDelaySeconds: number;
}
export interface KnownNeuron {
  id: NeuronId;
  name: string;
  description: Option<string>;
}
export interface SetDissolveTimestamp {
  dissolveTimestampSeconds: bigint;
}
export interface ChangeAutoStakeMaturity {
  requestedSettingForAutoStakeMaturity: boolean;
}
export interface ListProposalsRequest {
  // Limit on the number of [ProposalInfo] to return. If no value is
  // specified, or if a value greater than 100 is specified, 100
  // will be used.
  limit: number;

  // If specified, only return proposals that are stricty earlier than
  // the specified proposal according to the proposal ID. If not
  // specified, start with the most recent proposal.
  beforeProposal: Option<ProposalId>;

  // Include proposals that have a reward status in this list (see
  // [ProposalRewardStatus] for more information). If this list is
  // empty, no restriction is applied. For example, many users listing
  // proposals will only be interested in proposals for which they can
  // receive voting rewards, i.e., with reward status
  // PROPOSAL_REWARD_STATUS_ACCEPT_VOTES.
  includeRewardStatus: Array<ProposalRewardStatus>;

  // Exclude proposals with a topic in this list. This is particularly
  // useful to exclude proposals on the topics TOPIC_EXCHANGE_RATE and
  // TOPIC_KYC which most users are not likely to be interested in
  // seeing
  excludeTopic: Array<Topic>;

  // Include proposals that have a status in this list (see
  // [ProposalStatus] for more information). If this list is empty, no
  // restriction is applied.
  includeStatus: Array<ProposalStatus>;
}
export interface ListProposalsResponse {
  proposals: Array<ProposalInfo>;
}
export interface MakeProposalResponse {
  proposalId: ProposalId;
}
export interface ManageNeuron {
  id: Option<NeuronId>;
  command: Option<Command>;
  neuronIdOrSubaccount: Option<NeuronIdOrSubaccount>;
}
export interface Merge {
  sourceNeuronId: Option<NeuronId>;
}
export interface MergeRequest {
  sourceNeuronId: NeuronId;
  targetNeuronId: NeuronId;
}
export interface StakeMaturity {
  percentageToStake?: number;
}
export interface MergeMaturity {
  percentageToMerge: number;
}
export interface MergeMaturityRequest {
  neuronId: NeuronId;
  percentageToMerge: number;
}
export interface MergeMaturityResponse {
  mergedMaturityE8s: bigint;
  newStakeE8s: bigint;
}
export interface MethodAuthzChange {
  principal: Option<PrincipalString>;
  methodName: string;
  canister: CanisterIdString;
  operation: AuthzChangeOp;
}
export interface MethodAuthzInfo {
  methodName: string;
  principalIds: Array<ArrayBuffer>;
}
export interface Motion {
  motionText: string;
}
export interface OpenSnsTokenSwap {
  communityFundInvestmentE8s?: bigint;
  targetSwapCanisterId?: Principal;
  params?: {
    minParticipantIcpE8s: bigint;
    maxIcpE8s: bigint;
    swapDueTimestampSeconds: bigint;
    minParticipants: number;
    snsTokenE8s: bigint;
    maxParticipantIcpE8s: bigint;
    minIcpE8s: bigint;
    saleDelaySeconds?: bigint;
    neuronBasketConstructionParameters?: {
      // Keep snake case to avoid having to convert back and forth.
      dissolve_delay_interval_seconds: bigint;
      count: bigint;
    };
  };
}
export interface SetSnsTokenSwapOpenTimeWindow {
  request?: {
    openTimeWindow?: {
      startTimestampSeconds: bigint;
      endTimestampSeconds: bigint;
    };
  };
  swapCanisterId?: string;
}
export interface NetworkEconomics {
  neuronMinimumStake: E8s;
  maxProposalsToKeepPerTopic: number;
  neuronManagementFeePerProposal: E8s;
  rejectCost: E8s;
  transactionFee: E8s;
  neuronSpawnDissolveDelaySeconds: bigint;
  minimumIcpXdrRate: bigint;
  maximumNodeProviderRewards: bigint;
}
export interface Neuron {
  id: Option<NeuronId>;
  stakedMaturityE8sEquivalent: Option<bigint>;
  controller: Option<PrincipalString>;
  recentBallots: Array<BallotInfo>;
  kycVerified: boolean;
  notForProfit: boolean;
  cachedNeuronStake: E8s;
  createdTimestampSeconds: bigint;
  autoStakeMaturity: Option<boolean>;
  maturityE8sEquivalent: bigint;
  agingSinceTimestampSeconds: bigint;
  spawnAtTimesSeconds: Option<bigint>;
  neuronFees: E8s;
  hotKeys: Array<PrincipalString>;
  accountIdentifier: AccountIdentifier;
  joinedCommunityFundTimestampSeconds: Option<bigint>;
  dissolveState: Option<DissolveState>;
  followees: Array<Followees>;
}
export type NeuronIdOrSubaccount =
  | { Subaccount: Array<number> }
  | { NeuronId: NeuronId };
export interface NeuronInfo {
  neuronId: NeuronId;
  dissolveDelaySeconds: bigint;
  recentBallots: Array<BallotInfo>;
  createdTimestampSeconds: bigint;
  state: NeuronState;
  joinedCommunityFundTimestampSeconds: Option<bigint>;
  retrievedAtTimestampSeconds: bigint;
  votingPower: bigint;
  ageSeconds: bigint;
  fullNeuron: Option<Neuron>;
}

export interface NodeProvider {
  id: Option<PrincipalString>;
  rewardAccount: Option<AccountIdentifier>;
}
export type Operation =
  | { RemoveHotKey: RemoveHotKey }
  | { AddHotKey: AddHotKey }
  | { StopDissolving: Record<string, never> }
  | { StartDissolving: Record<string, never> }
  | { IncreaseDissolveDelay: IncreaseDissolveDelay }
  | { JoinCommunityFund: Record<string, never> }
  | { LeaveCommunityFund: Record<string, never> }
  | { SetDissolveTimestamp: SetDissolveTimestamp }
  | { ChangeAutoStakeMaturity: ChangeAutoStakeMaturity };
export interface Proposal {
  title: Option<string>;
  url: string;
  action: Option<Action>;
  summary: string;
}
export type ProposalId = bigint;

export interface ProposalInfo {
  id: Option<ProposalId>;
  ballots: Array<Ballot>;
  rejectCost: E8s;
  proposalTimestampSeconds: bigint;
  rewardEventRound: bigint;
  failedTimestampSeconds: bigint;
  decidedTimestampSeconds: bigint;
  deadlineTimestampSeconds: Option<bigint>;
  latestTally: Option<Tally>;
  proposal: Option<Proposal>;
  proposer: Option<NeuronId>;
  executedTimestampSeconds: bigint;
  topic: Topic;
  status: ProposalStatus;
  rewardStatus: ProposalRewardStatus;
}

export interface RegisterVote {
  vote: Vote;
  proposal: Option<ProposalId>;
}
export interface RemoveHotKey {
  hotKeyToRemove: Option<PrincipalString>;
}
export type RewardMode =
  | { RewardToNeuron: RewardToNeuron }
  | { RewardToAccount: RewardToAccount };
export type RewardNodeProviders = {
  useRegistryDerivedRewards: boolean | undefined;
  rewards: Array<RewardNodeProvider>;
};
export interface RewardToAccount {
  toAccount: Option<AccountIdentifier>;
}
export interface RewardToNeuron {
  dissolveDelaySeconds: bigint;
}

export type ClaimNeuronRequest = {
  publicKey: DerEncodedPublicKey;
  nonce: bigint;
  dissolveDelayInSecs: bigint;
};

export interface RewardNodeProvider {
  nodeProvider: Option<NodeProvider>;
  rewardMode: Option<RewardMode>;
  amountE8s: bigint;
}
export interface SetDefaultFollowees {
  defaultFollowees: Array<Followees>;
}
export interface Spawn {
  newController: Option<PrincipalString>;
  percentageToSpawn: number | undefined;
}

export interface Split {
  amount: E8s;
}
export interface Tally {
  no: bigint;
  yes: bigint;
  total: bigint;
  timestampSeconds: bigint;
}

export interface AddHotKeyRequest {
  neuronId: NeuronId;
  principal: PrincipalString;
}

export interface RemoveHotKeyRequest {
  neuronId: NeuronId;
  principal: PrincipalString;
}

export interface StartDissolvingRequest {
  neuronId: NeuronId;
}

export interface StopDissolvingRequest {
  neuronId: NeuronId;
}

export interface IncreaseDissolveDelayRequest {
  neuronId: NeuronId;
  additionalDissolveDelaySeconds: number;
}

export interface FollowRequest {
  neuronId: NeuronId;
  topic: Topic;
  followees: Array<NeuronId>;
}

export interface RegisterVoteRequest {
  neuronId: NeuronId;
  vote: Vote;
  proposal: ProposalId;
}

export interface SpawnRequest {
  neuronId: NeuronId;
  newController: Option<PrincipalString>;
  percentageToSpawn?: number;
}

export interface SplitRequest {
  neuronId: NeuronId;
  amount: E8s;
}

export interface DisburseRequest {
  neuronId: NeuronId;
  toAccountId?: AccountIdentifier;
  amount?: E8s;
}

export interface DisburseToNeuronRequest {
  neuronId: NeuronId;
  dissolveDelaySeconds: bigint;
  kycVerified: boolean;
  amount: E8s;
  newController: Option<PrincipalString>;
  nonce: bigint;
}

export interface JoinCommunityFundRequest {
  neuronId: NeuronId;
}

export interface MakeProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  url: string;
  summary: string;
  action: Action;
}

export interface MakeMotionProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  url: string;
  text: string;
  summary: string;
}

export interface MakeNetworkEconomicsProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  summary: string;
  url: string;
  networkEconomics: NetworkEconomics;
}

export interface MakeRewardNodeProviderProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  summary: string;
  url: string;
  nodeProvider: PrincipalString;
  amount: E8s;
  rewardMode: Option<RewardMode>;
}

export interface MakeSetDefaultFolloweesProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  summary: string;
  url: string;
  followees: Array<Followees>;
}

export interface MakeExecuteNnsFunctionProposalRequest {
  neuronId: NeuronId;
  title: Option<string>;
  summary: string;
  url: string;
  nnsFunction: number;
  payload: ArrayBuffer;
}

export interface ListNodeProvidersResponse {
  nodeProviders: NodeProvider[];
}
