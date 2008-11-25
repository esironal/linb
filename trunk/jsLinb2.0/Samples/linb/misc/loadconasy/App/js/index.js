
Class('App', 'linb.Com',{
    Instance:{
        //base Class for linb.Com
        base:["linb.UI"], 
        //requried class for the App
        required:["linb.UI.Pane", "linb.UI.TreeBar", "linb.UI.FoldingList"], 
        //Com events
        events:{}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Pane)
                .host(host,"pane3")
                .setLeft(20)
                .setTop(20)
                .setWidth(270)
                .setHeight(510)
            );
            
            host.pane3.append((new linb.UI.TreeBar)
                .host(host,"treebar3")
                .setItems([{"id":"string", "caption":"to load html string", "sub":true}, {"id":"arr", "caption":"to load more items", "sub":true}, {"id":"template", "caption":"to load a linb.Template", "sub":true}, {"id":"ui", "caption":"to load some linb.UI widgets", "sub":true}, {"id":"com", "caption":"to load a linb.Com object", "sub":true}])
                .setLeft(0)
                .setTop(0)
                .setGroup(true)
                .onGetContent("_treebar3_ongetcontent")
            );
            
            append((new linb.UI.Pane)
                .host(host,"pane10")
                .setLeft(300)
                .setTop(20)
                .setWidth(300)
                .setHeight(510)
            );
            
            host.pane10.append((new linb.UI.FoldingList)
                .host(host,"foldinglist1")
                .setItems([{"id":"string", "title":"to load html string", "sub":true}, {"id":"template", "title":"to load a linb.Template", "sub":true}, {"id":"ui", "title":"to load some linb.UI widgets", "sub":true}, {"id":"com", "title":"to load a linb.Com object", "sub":true}])
                .setDock("fill")
                .setLeft(30)
                .setTop(60)
                .setCmds([])
                .onGetContent("_treebar3_ongetcontent")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _treebar3_ongetcontent:function (profile, item, callback, threadid) {
            switch(item.id){
            case 'string':
                return '<strong>HTML String was loaded!</strong>';
            case 'template':
                return new linb.Template('<div> <div>{p1} was loaded!</div></div>',{p1:'template'});
            case 'ui':
                var btn1=new linb.UI.Button({caption:'button 1',position:'relative'}),
                    btn2=new linb.UI.ComboInput({type:'colorpicker',position:'relative'})
                return btn1.merge(btn2);
            case 'arr':
                return [{id:'suba',caption:'sub item a'}, {id:'subb',caption:'sub item b'}];
            case 'com':
            console.log(threadid);
                linb.ComFactory.newCom('App.ACom',function(threadid){
            console.log(threadid);
                    this.create(function(com, threadid){
            console.log(threadid);
                        callback(com.getUIComponents());
                    },threadid)
                },threadid);
            }
        }
    }
});