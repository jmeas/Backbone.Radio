describe('Channel:', function () {
  beforeEach(function () {
    this.channel = Backbone.Radio.channel('myChannel');
  });

  describe('when calling Radio.channel with no name', function() {
    it('should throw an error', function() {
      expect(Backbone.Radio.channel).to.throw(Error, 'You must provide a name for the channel.');
    });
  });

  describe('upon creation', function() {
    it('should create a new instance of the Channel', function() {
      expect(this.channel).to.be.instanceOf(Backbone.Radio.Channel);
    });

    it('should have its name set', function() {
      expect(this.channel).to.have.property('_channelName', 'myChannel');
    });

    it('should have all of the Backbone.Events methods', function() {
      expect(this.channel).to.contain(Backbone.Events);
    });

    it('should have all of the Radio.Commands methods', function() {
      expect(this.channel).to.contain(Backbone.Radio.Commands);
    });

    it('should have all of the Radio.Requests methods', function() {
      expect(this.channel).to.contain(Backbone.Radio.Requests);
    });
  });

  describe('calling channel twice with the same name', function() {
    beforeEach(function() {
      this.channelCopy = Backbone.Radio.channel('myChannel');
    });

    it('should return the same channel', function() {
      expect(this.channelCopy).to.deep.equal(this.channel);
    });
  });

  describe('executing the `reset` method of a Channel', function() {
    beforeEach(function() {
      stub(this.channel, 'off');
      stub(this.channel, 'stopListening');
      stub(this.channel, 'stopComplying');
      stub(this.channel, 'stopReplying');
      spy(this.channel, 'reset');

      this.channel.reset();
    });

    it('should call the reset functions of Backbone.Events', function() {
      expect(this.channel.off).to.have.been.calledOnce;
      expect(this.channel.stopListening).to.have.been.calledOnce;
    });

    it('should call the reset functions of Backbone.Radio.Commands', function() {
      expect(this.channel.stopComplying).to.have.been.calledOnce;
    });

    it('should call the reset functions of Backbone.Radio.Requests', function() {
      expect(this.channel.stopReplying).to.have.been.calledOnce;
    });

    it('should return the Channel', function() {
      expect(this.channel.reset).to.have.always.returned(this.channel);
    });
  });

  describe('convenience methods', function() {
    beforeEach(function() {
      this.hash = {
        eventOne: stub(),
        eventTwo: stub()
      };
      this.keys = Object.keys(this.hash);
      spy(this.channel, 'connectEvents');
      spy(this.channel, 'connectCommands');
      spy(this.channel, 'connectRequests');
    });

    it('should attach the listeners to the Channel when passing an event hash to `connectEvents`', function() {
      this.channel.connectEvents(this.hash);
      expect(this.channel._events).to.have.keys(this.keys);
    });

    it('should attach the listeners to the Channel when passing a commands hash to `connectCommands`', function() {
      this.channel.connectCommands(this.hash);
      expect(this.channel._commands).to.have.keys(this.keys);
    });

    it('should attach the listeners to the Channel when passing a requests hash to `connectRequests`', function() {
      this.channel.connectRequests(this.hash);
      expect(this.channel._requests).to.have.keys(this.keys);
    });

    it('should return the channel for all three methods', function() {
      this.channel.connectEvents(this.hash);
      this.channel.connectCommands(this.hash);
      this.channel.connectRequests(this.hash);

      expect(this.channel.connectEvents).to.have.always.returned(this.channel);
      expect(this.channel.connectCommands).to.have.always.returned(this.channel);
      expect(this.channel.connectRequests).to.have.always.returned(this.channel);
    });
  });
});
