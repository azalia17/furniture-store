should = require 'should'
middlewares = require '../lib'


describe 'Express middlewares', (done) ->

  it 'should load middlwares', (done) ->
    middlewares.load dummy: "#{__dirname}/dummy"
    middlewares.dummy.should.equal 'dummy'

    middlewares.load dummy_module: "#{__dirname}/dummy_module"
    middlewares.dummy_module.should.equal 'dummy module'

    done()

