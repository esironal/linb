Class('App.Module2', 'linb.Com',{
    Instance:{
        base:["linb.UI"], 
        iniComponents:function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Pane)
                .setHost(host,"panelMain")
                .setLeft(0)
                .setTop(0)
                .setWidth(220)
                .setHeight(80)
            );
            
            host.panelMain.append((new linb.UI.Div)
                .setHost(host,"div37")
                .setLeft(30)
                .setTop(10)
                .setHeight(20)
                .setHtml("UI in Module2")
            );
            
            host.panelMain.append((new linb.UI.Button)
                .setHost(host,"button22")
                .setLeft(20)
                .setTop(40)
                .setWidth(180)
                .setCaption("button in Module2")
                .onClick("_button22_onclick")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }, 
        _button22_onclick:function (profile, e, value) {
            alert("I'm in Module2");
        }
    }
});