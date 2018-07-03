// Copyright (C) 2010-2018 Sideview LLC.  All Rights Reserved.

Splunk.Module.REST= $.klass(Sideview.utils.getBaseClass(true), {

    initialize: function($super, container) {
        $super(container);
        this.logger = Sideview.utils.getLogger();
        this.name = this.getParam("name");
        
        Sideview.utils.applyCustomProperties(this);
    },

    resetUI: function() {},

    onContextChange: function() {
        console.log("REST.onContextChange");
        this.payloadArgs = {};
        var context = this.getContext();
        for (var key in this._params) {
            if (!this._params.hasOwnProperty(key)) continue;
            if (key.indexOf("arg.")==0) {
                var payloadKey = Sideview.utils.replaceTokensFromContext(key.substr(4),context);
                var value = Sideview.utils.replaceTokensFromContext(this._params[key],context)
                this.payloadArgs[payloadKey] = value;
            }
        }
        
        
        var headers = {};
        var args = $.extend({},this.payloadArgs,true);
        args["output_mode"] = "json";
        var uri = Sideview.utils.replaceTokensFromContext(this.getParam("uri"),context);
        //if (uri.startsWith("/")) {
        //    headers["X-Splunk-Form-Key"] = Sideview.utils.getSplunkFormKey();
        //}
        this.inFlight = true;
        $.ajax({
            url: Sideview.utils.make_url(uri),
            type: 'post',
            data: args,
            headers: headers,
            dataType: 'json',
            success: this.handleSuccess.bind(this),
            failure: this.handleFailure.bind(this)
        });

        

    },

    isReadyForContextPush: function($super) {
        if (this.inFlight) {
            return Splunk.Module.DEFER;
        }
        else return $super();
    },

    handleSuccess: function(response) {
        this.inFlight = false;
        this.success = "True";
        console.log("REST success response is ");
        console.log(response);
        this.pushContextToChildren();
    },

    handleFailure: function(response) {
        this.inFlight = false;
        this.success = "False";
        console.log("REST failure response is ");
        console.log(response);
        this.pushContextToChildren();
    },

    getModifiedContext: function() {
        var context = this.getContext();
        context.set(this.name + ".success", this.success);
        return context;
    }

});