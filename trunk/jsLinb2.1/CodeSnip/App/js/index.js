Class('App', 'linb.Com',{
    Instance:{
        //base Class for linb.Com
        base:["linb.UI"], 
        //requried class for the App
        //"linb.Tips","linb.UI.Resizer","linb.UI.Border","linb.UI.Shadow"
        required:["linb.UI.Layout", "linb.UI.Panel", "linb.UI.TreeBar", "linb.UI.Block", "linb.UI.Tabs", "linb.UI.Div", "linb.UI.Link"], 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Layout)
                .host(host,"layout")
                .setDomId("ce_layout")
                .setItems([{"id":"before", "pos":"before", "locked":false, "size":200, "min":50, "max":400, "hide":false, "cmd":true, "caption":"before"}, {"id":"main", "min":10, "caption":"main"}])
                .setType("horizontal")
            );
            
            host.layout.append((new linb.UI.Layout)
                .host(host,"layout_r")
                .setDomId("ce_layout_r")
                .setItems([{"id":"main", "min":10, "caption":"main"}, {"id":"after", "pos":"after", "locked":false, "size":300, "min":50, "max":600, "hide":false, "cmd":true, "caption":"after"}])
            , 'main');
            
            host.layout_r.append((new linb.UI.Block)
                .host(host,"stage")
                .setDomId("ce_stage")
                .setDock("fill")
                .setBorderType("none")
                .setCustomStyle({"PANEL":"background:#fff;"})
            , 'main');
            
            host.stage.append((new linb.UI.Div)
                .host(host,"div17")
                .setLeft(150)
                .setTop(50)
                .setWidth(220)
                .setHeight(30)
            );
            
            host.layout_r.append((new linb.UI.Link)
                .host(host,"openinbuild")
                .setTop(10)
                .setRight(50)
                .setVisibility("hidden")
                .setCaption("Open it in UI builder")
                .setTarget("_blank")
                .onClick("_openinbuild_onclick")
                .setCustomStyle({"KEY":"font-weight:bold;text-decoration:underline;"})
            , 'main');
            
            host.layout_r.append((new linb.UI.Block)
                .host(host,"blockCode")
                .setDomId("ce_blockCode")
                .setDock("fill")
                .setCustomStyle({"PANEL":"background:#F4F4F4"})
            , 'after');
            
            host.layout.append((new linb.UI.TreeBar)
                .host(host,"treebar")
                .setDomId("ce_treebar")
                .setAnimCollapse(true)
                .onItemSelected("_treebar_onitemselected")
            , 'before');
            
            append((new linb.UI.Block)
                .host(host,"blockTop")
                .setDock("top")
                .setHeight("30")
                .setHtml('<div style="text-align:center;font-size:20px;">jsLinb Code Snippets</div>')
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _onready:function () {
            Class("Component");
            var ns=this;
            ns.treebar.setItems(CONF.widgets);
            linb.History.setCallback(function(str){
                if(str){
                    ns.treebar.setValue(str, true);
                    //fire event
                    ns.treebar.onItemSelected(ns.treebar.get(0), {id: str} );
                }
            })
        }, 
        _treebar_onitemselected:function (profile, item, src) {
            var host=this,
                id = 'Classes.'+item.id,
                clsName = 'App.'+item.id.replace(/\./g,'_'),
                path = linb.getPath(id,'.js'),
                message = 'Getting file from <strong>"' + path + '"</strong>...',
                fail = function(msg){
                    if(!msg)
                        msg = 'Related file <strong>"' + path + '"</strong> doesn\'t exists, or has invalid format!';
                    host.stage.setHtml(msg);
                    host.blockCode.setHtml(msg);
                    host.openinbuild.setVisibility('hidden');
                    
                };

            //destroy the instance
            if(host._instance){
                host._instance.destroy();
                delete host._instance;
            }
            //destroy the Class
            if(host._class){
                Class.__gc(host._class.KEY);
                delete host._class;
            }

            //set loading... message
            host.stage.setHtml(message);
            host.blockCode.setHtml(message);

            linb.History.setFI(item.id, false)

            linb.Thread.observableRun(function(threadid){
                //get com
                linb.Ajax(path,"",function(txt){
                    try{
                        //set code
                        host.blockCode.setHtml(linb.Coder.formatHTML(txt,'js',['plain']));
                        //get instance
                        _.exec(txt);
                        var obj=linb.SC.get(clsName);
                        if(obj){
                            host._class=obj;
                            var o = host._instance = new obj();
                            o.create(function(){
                                //show UI
                                host.stage.getSubNode('PANEL').html('');
                                host.stage.append(this.getUIComponents(),false);
                            });
                            host.openinbuild.setVisibility('visible');
                            
                            var a=linb.ini.path.split('/').slice(0,-3),b=a.join('/')+'/VisualJS/UIBuilder.html';
                            host.openinbuild.setHref(b + "#url=" + encodeURIComponent(path))
                            
                            host.$path=path;
                        }else
                            fail();
                    }catch(e){
                        fail(String(e));
                    }
                },function(msg){
                    fail()
                },threadid).start();
            });
        }, 
        events:{"onReady":"_onready"}, 
        _openinbuild_onclick:function (profile, e) {
            return true;
        }
    }
});