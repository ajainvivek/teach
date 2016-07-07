import Ember from 'ember';
import thunky from 'npm:thunky';
import dragDrop from 'npm:drag-drop';
import hat from 'npm:hat';
import path from 'npm:path';
import Peer from 'npm:simple-peer';
import Tracker from 'npm:bittorrent-tracker/client';
import videostream from 'npm:videostream';
import WebTorrent from 'npm:webtorrent';
import BufferBrowserify from 'npm:buffer-browserify';

export default Ember.Service.extend({
  peerId : function () {
    return new BufferBrowserify.Buffer(hat(160), 'hex');
  }.property(),
  getClient: function () {
    let peerId = this.get('peerId');
    return thunky(function (cb) {
      var client = new WebTorrent({ peerId: peerId, rtcConfig: undefined })
      client.on('error', function (err) {
        window.alert(err.message || err)
      });
      client.on('warning', function (err) {
        console.error(err.message || err)
      });
      cb(null, client);
    });
  }
});
