Splunk.Module.Layer = $.klass(Sideview.utils.getBaseClass(false), {
    
    initialize: function($super, container){
        $super(container);
        this.logger = Sideview.utils.getLogger();
        Sideview.utils.applyCustomProperties(this);
        var  c = this.container.detach();
        c.appendTo($("body"));
        this.VISIBILITY_CLASS = "layer and its contents should only be visible if Layer thinks so";
        this.container.hide(this.VISIBILITY_CLASS);
        
        $(".closeButton", this.container).remove();
        this.closeButton = $("<div>")
            .text("x")
            .addClass("closeButton")
            .prependTo(this.container)
            .click(this.close.bind(this));
        $(document).bind("keyup", this.onKeyUp.bind(this))
    },

    onKeyUp: function(evt) {
        // we only close when user hits the ESC key
        if (evt.keyCode==27) {
            this.close();
        } 
    },

    onLoadStatusChange: function($super,statusInt) {
        if (!this.isPageLoadComplete() && statusInt >= Sideview.utils.moduleLoadStates.WAITING_FOR_CONTEXT) {
            var layer = this.container;
            this.withEachDescendant(function(module) {
                var c = module.container.detach();
                c.appendTo(layer);
            });
        }
        return $super(statusInt);
    },

    close: function() {
        this.container.hide(this.VISIBILITY_CLASS);
    },

    resetUI: function() {
        
    },

    alignToSelectedElement: function(selectedElement) {
        var offset = selectedElement.offset();
        var left = offset.left;
        var top = offset.top + selectedElement.height();
        this.container.css({
            "left": left,
            "top": top
        });
    },
    
    alignToCenterOfScreen: function() {
        var width  = this.container.width();
        var height = this.container.height();
        this.container.css({
            "position":"fixed",
            "top": "50%",
            "left": "50%",
            "margin-top": -(height/2)+"px",
            "margin-left": -(width/2)+"px"
        });
    },

    /**
     * hides other Layer modules that are currently shown
     * with the exception of Layers that are in our direct
     * Ancestor chain.  ie we could be a little detail layer
     * downstream from some giant modal popup layer 
     * that was downstream from something else.
     * Yes, that sounds crazy. And you can't argue with crazy.
     */
    hideOtherLayers: function() {
        var hallPasses = [this.moduleId];
        this.withEachAncestor(function(module) {
            if (module.moduleType=="Splunk.Module.Layer") {
                hallPasses.push(module.moduleId);
            }
        });
        $("div.Layer").each(function(i, container) {
            var id = $(container).attr("id");
            if (hallPasses.indexOf(id)!=-1) return;
            var module = Sideview.utils.getModule(id);
            if (module) {
                module.hide(module.VISIBILITY_CLASS);
            }
        })
    },

    onContextChange: function(){
        var context = this.getContext();
        this.show(this.VISIBILITY_CLASS);
        this.hideOtherLayers();
        var selectedElement = $(context.get("click.selectedElement"));
        if (selectedElement) {
            this.alignToSelectedElement(selectedElement);
        }
        else {
            this.alignToCenterOfScreen();
        }
        //Sideview.utils.balanceLabelWidths(this.container);
    }

});