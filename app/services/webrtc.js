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
import _array from 'lodash/array';

const TRACKER_URL = 'wss://tracker.webtorrent.io';
window.WEBTORRENT_ANNOUNCE = [ TRACKER_URL ];

export default Ember.Service.extend({
  state : {},
  peers : [],
  torrentData : {},
  slideData: {},
  random: false,
  infoHash: undefined,
  initialize : function (options) {
    let slideData = options.data;
    let callback = options.callback;
    let random = options.random;
    let self = this;
    let tracker = this.tracker(random, options.infoHash);
    let peers = this.get('peers');
    let onPeerConnectCallback = options.onPeerConnect;

    this.set('infoHash', options.infoHash);
    this.set('random', random);


    if (!Peer.WEBRTC_SUPPORT) {
      window.alert('This browser is unsupported. Please use a browser with WebRTC support.')
    }
    tracker.start();
    tracker.on('peer', function (peer) {
      peers.pushObject({
        infoHash: tracker.infoHash,
        peer: peer
      });
      if (peer.connected) {
        self.onPeerConnect(peer, slideData, callback, onPeerConnectCallback, tracker.infoHash);
      } else {
        peer.once('connect', function () {
          self.onPeerConnect(peer, slideData, callback, onPeerConnectCallback, tracker.infoHash);
        });
      }
    });
    return tracker;
  },
  peerId : function () {
    return new BufferBrowserify.Buffer(hat(160), 'hex');
  }.property(),
  tracker : function (random, infoHash) {
    let peerId = this.get('peerId');
    let guid = random ? new BufferBrowserify.Buffer(hat(160), 'hex') : new BufferBrowserify.Buffer(20);
    return new Tracker({
      peerId: peerId,
      announce: TRACKER_URL,
      infoHash: infoHash ? infoHash : guid
    });
  },
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
  broadcast : function (obj, infoHash) {
    let peers = this.get('peers');
    peers.forEach(function (data) {
      if (data.infoHash === infoHash) {
        if (data.peer.connected) data.peer.send(JSON.stringify(obj))
      }
    });
  },
  onPeerConnect : function (peer, slideData, callback, onPeerConnectCallback, infoHash) {
    let peers = this.get('peers');
    peer.on('data', onMessage);
    peer.on('close', onClose);
    peer.on('error', onClose);
    peer.on('end', onClose);
    if(slideData) {
      slideData.infoHash = infoHash;
      peer.send(JSON.stringify(slideData));

      if (typeof callback === 'function') {
        callback(slideData);
      }
    }
    //Once Peer is connected
    if (typeof onPeerConnectCallback === 'function') {
      onPeerConnectCallback();
    }

    function onClose () {
      peer.removeListener('data', onMessage);
      peer.removeListener('close', onClose);
      peer.removeListener('error', onClose);
      peer.removeListener('end', onClose);
      peers.removeAt(_array.findIndex(peers, {peer : peer}));
      callback({
        peerId: peer.id,
        connectionClosed: true
      });
    }

    function onMessage (data) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(err.message);
      }
      if (typeof callback === 'function') {
        callback(data);
      }
    }
  }
});
