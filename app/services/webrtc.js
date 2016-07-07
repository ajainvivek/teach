import Ember from 'ember';
import thunky from 'npm:thunky';
//import dragDrop from 'npm:drag-drop';
import hat from 'npm:hat';
//import path from 'npm:path';
import Peer from 'npm:simple-peer';
import Tracker from 'npm:bittorrent-tracker/client';
//import videostream from 'npm:videostream';
import WebTorrent from 'npm:webtorrent';
import BufferBrowserify from 'npm:buffer-browserify';

const TRACKER_URL = 'wss://tracker.webtorrent.io';
window.WEBTORRENT_ANNOUNCE = [ TRACKER_URL ];

export default Ember.Service.extend({
  state : {},
  peers : [],
  torrentData : {},
  username: "test",
  initialize : function () {
    let self = this;
    let tracker = this.get('tracker');
    let peers = this.get('peers');

    if (!Peer.WEBRTC_SUPPORT) {
      window.alert('This browser is unsupported. Please use a browser with WebRTC support.')
    }
    tracker.start();
    tracker.on('peer', function (peer) {
      peers.pushObject(peer);
      if (peer.connected) {
        self.onPeerConnect(peer);
      } else {
        peer.once('connect', function () {
          self.onPeerConnect(peer);
        });
      }
    });
  },
  peerId : function () {
    return new BufferBrowserify.Buffer(hat(160), 'hex');
  }.property(),
  tracker : function () {
    let peerId = this.get('peerId');
    //let guid = this.get('guid')();
    return new Tracker({
      peerId: peerId,
      announce: TRACKER_URL,
      infoHash: new BufferBrowserify.Buffer(20)
    });
  }.property(),
  getClient: function () {
    let peerId = this.get('peerId');
    return thunky(function (cb) {
      var client = new WebTorrent({ peerId: peerId, rtcConfig: undefined })
      client.on('error', function (err) {
        window.alert(err.message || err)
      });
      client.on('warning', function (err) {
        console.error(err.message || err);
      });
      cb(null, client);
    });
  },
  broadcast : function (obj) {
    let peers = this.get('peers');
    peers.forEach(function (peer) {
      if (peer.connected) peer.send(JSON.stringify(obj))
    });
  },
  onPeerConnect : function (peer) {
    let self = this;
    let peers = this.get('peers');
    let state = this.get('state');
    peer.on('data', onMessage);
    peer.on('close', onClose);
    peer.on('error', onClose);
    peer.on('end', onClose);
    peer.send(JSON.stringify({ username: self.username, state: state }));

    function onClose () {
      peer.removeListener('data', onMessage)
      peer.removeListener('close', onClose)
      peer.removeListener('error', onClose)
      peer.removeListener('end', onClose)
      peers.splice(peers.indexOf(peer), 1)
    }

    function onMessage (data) {
      let state = self.get('state');
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(err.message);
      }
      if (data.username) {
        peer.username = data.username;
      }
      if (data.state) {
        Object.keys(data.state)
          .filter(function (id) {
            return !state[id]
          })
          .forEach(function (id) {
            state[id] = data.state[id]
          })
      }
      if (data.pt) {
        if (!state[data.i]) {
          state[data.i] = { pts: [] };
        }
        state[data.i].pts.push(data.pt);
      }
      if (data.infoHash) {
        state[data.infoHash] = data;
      }
    }
  }
});
