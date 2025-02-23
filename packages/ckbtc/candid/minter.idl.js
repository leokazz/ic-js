/* Do not edit.  Compiled with ./scripts/compile-idl-js from packages/ckbtc/candid/minter.did */
export const idlFactory = ({ IDL }) => {
  const Mode = IDL.Variant({
    'RestrictedTo' : IDL.Vec(IDL.Principal),
    'DepositsRestrictedTo' : IDL.Vec(IDL.Principal),
    'ReadOnly' : IDL.Null,
    'GeneralAvailability' : IDL.Null,
  });
  const UpgradeArgs = IDL.Record({
    'kyt_principal' : IDL.Opt(IDL.Principal),
    'mode' : IDL.Opt(Mode),
    'retrieve_btc_min_amount' : IDL.Opt(IDL.Nat64),
    'max_time_in_queue_nanos' : IDL.Opt(IDL.Nat64),
    'min_confirmations' : IDL.Opt(IDL.Nat32),
    'kyt_fee' : IDL.Opt(IDL.Nat64),
  });
  const BtcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'kyt_principal' : IDL.Opt(IDL.Principal),
    'ecdsa_key_name' : IDL.Text,
    'mode' : Mode,
    'retrieve_btc_min_amount' : IDL.Nat64,
    'ledger_id' : IDL.Principal,
    'max_time_in_queue_nanos' : IDL.Nat64,
    'btc_network' : BtcNetwork,
    'min_confirmations' : IDL.Opt(IDL.Nat32),
    'kyt_fee' : IDL.Opt(IDL.Nat64),
  });
  const MinterArg = IDL.Variant({
    'Upgrade' : IDL.Opt(UpgradeArgs),
    'Init' : InitArgs,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8), 'vout' : IDL.Nat32 }),
  });
  const BitcoinAddress = IDL.Variant({
    'p2sh' : IDL.Vec(IDL.Nat8),
    'p2wpkh_v0' : IDL.Vec(IDL.Nat8),
    'p2pkh' : IDL.Vec(IDL.Nat8),
  });
  const Event = IDL.Variant({
    'received_utxos' : IDL.Record({
      'to_account' : Account,
      'utxos' : IDL.Vec(Utxo),
    }),
    'sent_transaction' : IDL.Record({
      'fee' : IDL.Opt(IDL.Nat64),
      'change_output' : IDL.Opt(
        IDL.Record({ 'value' : IDL.Nat64, 'vout' : IDL.Nat32 })
      ),
      'txid' : IDL.Vec(IDL.Nat8),
      'utxos' : IDL.Vec(Utxo),
      'requests' : IDL.Vec(IDL.Nat64),
      'submitted_at' : IDL.Nat64,
    }),
    'distributed_kyt_fee' : IDL.Record({
      'block_index' : IDL.Nat64,
      'amount' : IDL.Nat64,
      'kyt_provider' : IDL.Principal,
    }),
    'init' : InitArgs,
    'upgrade' : UpgradeArgs,
    'retrieve_btc_kyt_failed' : IDL.Record({
      'block_index' : IDL.Nat64,
      'uuid' : IDL.Text,
      'address' : IDL.Text,
      'amount' : IDL.Nat64,
      'kyt_provider' : IDL.Principal,
    }),
    'accepted_retrieve_btc_request' : IDL.Record({
      'received_at' : IDL.Nat64,
      'block_index' : IDL.Nat64,
      'address' : BitcoinAddress,
      'amount' : IDL.Nat64,
      'kyt_provider' : IDL.Opt(IDL.Principal),
    }),
    'checked_utxo' : IDL.Record({
      'clean' : IDL.Bool,
      'utxo' : Utxo,
      'uuid' : IDL.Text,
      'kyt_provider' : IDL.Opt(IDL.Principal),
    }),
    'removed_retrieve_btc_request' : IDL.Record({ 'block_index' : IDL.Nat64 }),
    'confirmed_transaction' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8) }),
    'replaced_transaction' : IDL.Record({
      'fee' : IDL.Nat64,
      'change_output' : IDL.Record({ 'value' : IDL.Nat64, 'vout' : IDL.Nat32 }),
      'old_txid' : IDL.Vec(IDL.Nat8),
      'new_txid' : IDL.Vec(IDL.Nat8),
      'submitted_at' : IDL.Nat64,
    }),
    'ignored_utxo' : IDL.Record({ 'utxo' : Utxo }),
  });
  const MinterInfo = IDL.Record({
    'retrieve_btc_min_amount' : IDL.Nat64,
    'min_confirmations' : IDL.Nat32,
    'kyt_fee' : IDL.Nat64,
  });
  const RetrieveBtcArgs = IDL.Record({
    'address' : IDL.Text,
    'amount' : IDL.Nat64,
  });
  const RetrieveBtcOk = IDL.Record({ 'block_index' : IDL.Nat64 });
  const RetrieveBtcError = IDL.Variant({
    'MalformedAddress' : IDL.Text,
    'GenericError' : IDL.Record({
      'error_message' : IDL.Text,
      'error_code' : IDL.Nat64,
    }),
    'TemporarilyUnavailable' : IDL.Text,
    'AlreadyProcessing' : IDL.Null,
    'AmountTooLow' : IDL.Nat64,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat64 }),
  });
  const RetrieveBtcStatus = IDL.Variant({
    'Signing' : IDL.Null,
    'Confirmed' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8) }),
    'Sending' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8) }),
    'AmountTooLow' : IDL.Null,
    'Unknown' : IDL.Null,
    'Submitted' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8) }),
    'Pending' : IDL.Null,
  });
  const UtxoStatus = IDL.Variant({
    'ValueTooSmall' : Utxo,
    'Tainted' : Utxo,
    'Minted' : IDL.Record({
      'minted_amount' : IDL.Nat64,
      'block_index' : IDL.Nat64,
      'utxo' : Utxo,
    }),
    'Checked' : Utxo,
  });
  const UpdateBalanceError = IDL.Variant({
    'GenericError' : IDL.Record({
      'error_message' : IDL.Text,
      'error_code' : IDL.Nat64,
    }),
    'TemporarilyUnavailable' : IDL.Text,
    'AlreadyProcessing' : IDL.Null,
    'NoNewUtxos' : IDL.Record({
      'required_confirmations' : IDL.Nat32,
      'current_confirmations' : IDL.Opt(IDL.Nat32),
    }),
  });
  return IDL.Service({
    'estimate_withdrawal_fee' : IDL.Func(
        [IDL.Record({ 'amount' : IDL.Opt(IDL.Nat64) })],
        [IDL.Record({ 'minter_fee' : IDL.Nat64, 'bitcoin_fee' : IDL.Nat64 })],
        ['query'],
      ),
    'get_btc_address' : IDL.Func(
        [
          IDL.Record({
            'owner' : IDL.Opt(IDL.Principal),
            'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
          }),
        ],
        [IDL.Text],
        [],
      ),
    'get_deposit_fee' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_events' : IDL.Func(
        [IDL.Record({ 'start' : IDL.Nat64, 'length' : IDL.Nat64 })],
        [IDL.Vec(Event)],
        ['query'],
      ),
    'get_minter_info' : IDL.Func([], [MinterInfo], ['query']),
    'get_withdrawal_account' : IDL.Func([], [Account], []),
    'retrieve_btc' : IDL.Func(
        [RetrieveBtcArgs],
        [IDL.Variant({ 'Ok' : RetrieveBtcOk, 'Err' : RetrieveBtcError })],
        [],
      ),
    'retrieve_btc_status' : IDL.Func(
        [IDL.Record({ 'block_index' : IDL.Nat64 })],
        [RetrieveBtcStatus],
        ['query'],
      ),
    'update_balance' : IDL.Func(
        [
          IDL.Record({
            'owner' : IDL.Opt(IDL.Principal),
            'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(UtxoStatus),
            'Err' : UpdateBalanceError,
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  const Mode = IDL.Variant({
    'RestrictedTo' : IDL.Vec(IDL.Principal),
    'DepositsRestrictedTo' : IDL.Vec(IDL.Principal),
    'ReadOnly' : IDL.Null,
    'GeneralAvailability' : IDL.Null,
  });
  const UpgradeArgs = IDL.Record({
    'kyt_principal' : IDL.Opt(IDL.Principal),
    'mode' : IDL.Opt(Mode),
    'retrieve_btc_min_amount' : IDL.Opt(IDL.Nat64),
    'max_time_in_queue_nanos' : IDL.Opt(IDL.Nat64),
    'min_confirmations' : IDL.Opt(IDL.Nat32),
    'kyt_fee' : IDL.Opt(IDL.Nat64),
  });
  const BtcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'kyt_principal' : IDL.Opt(IDL.Principal),
    'ecdsa_key_name' : IDL.Text,
    'mode' : Mode,
    'retrieve_btc_min_amount' : IDL.Nat64,
    'ledger_id' : IDL.Principal,
    'max_time_in_queue_nanos' : IDL.Nat64,
    'btc_network' : BtcNetwork,
    'min_confirmations' : IDL.Opt(IDL.Nat32),
    'kyt_fee' : IDL.Opt(IDL.Nat64),
  });
  const MinterArg = IDL.Variant({
    'Upgrade' : IDL.Opt(UpgradeArgs),
    'Init' : InitArgs,
  });
  return [MinterArg];
};
