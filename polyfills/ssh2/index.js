// ssh2 polyfill — browser stub. All methods throw NotImplemented.

function notImpl(name) {
  return function() {
    throw new Error(`ssh2: ${name} not implemented in browser`);
  };
}

// ── Client ────────────────────────────────────────────────────────────────────

export class Client {
  connect()              { notImpl('Client.connect')(); }
  end()                  { notImpl('Client.end')(); }
  destroy()              { notImpl('Client.destroy')(); }
  exec()                 { notImpl('Client.exec')(); }
  shell()                { notImpl('Client.shell')(); }
  subsys()               { notImpl('Client.subsys')(); }
  sftp()                 { notImpl('Client.sftp')(); }
  forwardIn()            { notImpl('Client.forwardIn')(); }
  unforwardIn()          { notImpl('Client.unforwardIn')(); }
  forwardOut()           { notImpl('Client.forwardOut')(); }
  openssh_noMoreSessions(){ notImpl('Client.openssh_noMoreSessions')(); }
  openssh_forwardInStreamLocal() { notImpl('Client.openssh_forwardInStreamLocal')(); }
  openssh_unforwardInStreamLocal(){ notImpl('Client.openssh_unforwardInStreamLocal')(); }
  openssh_forwardOutStreamLocal() { notImpl('Client.openssh_forwardOutStreamLocal')(); }
  on()                   { return this; }
  once()                 { return this; }
  off()                  { return this; }
  emit()                 { return false; }
  removeListener()       { return this; }
}

// ── Server ────────────────────────────────────────────────────────────────────

export class Server {
  constructor()          { notImpl('Server constructor')(); }
  listen()               { notImpl('Server.listen')(); }
  close()                { notImpl('Server.close')(); }
  on()                   { return this; }
  once()                 { return this; }
  off()                  { return this; }
  emit()                 { return false; }
  removeListener()       { return this; }
}

// ── utils ─────────────────────────────────────────────────────────────────────

export const utils = {
  generateKeyPair:       notImpl('utils.generateKeyPair'),
  generateKeyPairSync:   notImpl('utils.generateKeyPairSync'),
  parseKey:              notImpl('utils.parseKey'),
  parsePrivateKey:       notImpl('utils.parsePrivateKey'),
  parsePublicKey:        notImpl('utils.parsePublicKey'),
  decryptKey:            notImpl('utils.decryptKey'),
  sftp: {
    OPEN_MODE:  {},
    STATUS_CODE: {},
    flagsToString: notImpl('utils.sftp.flagsToString'),
    stringToFlags:  notImpl('utils.sftp.stringToFlags'),
  },
};

// ── HTTPAgent stubs ───────────────────────────────────────────────────────────

export class HTTPAgent {
  constructor() { notImpl('HTTPAgent constructor')(); }
}

export class HTTPSAgent {
  constructor() { notImpl('HTTPSAgent constructor')(); }
}

// ── default export (mirrors ssh2 CommonJS shape) ─────────────────────────────

export default { Client, Server, utils, HTTPAgent, HTTPSAgent };