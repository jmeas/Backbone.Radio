/*
 * Backbone.Radio
 * --------------
 * The 'top-level' API for working with Backbone.Radio
 *
 */

var previousRadio = Backbone.Radio;

var Radio = Backbone.Radio = {};

Radio.VERSION = '<%= version %>';

Radio.noConflict = function () {
  Backbone.Radio = previousRadio;
  return this;
};

_.extend(Radio, {
  _channels: {},

  DEBUG: false,

  channel: function(channelName) {
    if (!channelName) {
      throw new Error('You must provide a name for the channel.');
    }
    return Radio._getChannel(channelName);
  },

  _getChannel: function(channelName) {
    var channel = Radio._channels[channelName];
    if (!channel) {
      channel = new Radio.Channel(channelName);
      Radio._channels[channelName] = channel;
    }
    return channel;
  }
});
