
Class('App', 'linb.Com',{
    Instance:{
        //base Class for linb.Com
        base:["linb.UI"], 
        //requried class for the App
        required:["linb.UI.Pane", "linb.UI.TimeLine", "linb.UI.TreeGrid", "linb.UI.Label", "linb.UI.Button", "linb.UI.DatePicker"], 
        //Com events
        events:{"onReady":"_onready"}, 
        iniComponents:function(){
            // [[code created by jsLinb UI Builder
            var host=this, children=[], append=function(child){children.push(child.get(0))};
            
            append((new linb.UI.Pane)
                .host(host,"pane3")
                .setTop(10)
                .setWidth(780)
                .setHeight(640)
                .setPosition("relative")
                .setCustomClass({"KEY":"hcenter"})
            );
            
            host.pane3.append((new linb.UI.Pane)
                .host(host,"pane8")
                .setLeft(210)
                .setTop(84)
                .setWidth(567)
                .setHeight(150)
                .setCustomStyle({"KEY":"border:solid 1px #ccc;"})
            );
            
            host.pane8.append((new linb.UI.TreeGrid)
                .host(host,"treegrid2")
                .setRowNumbered(true)
                .setHeader([{"id":"course", "type":"label", "caption":"course", "width":240}, {"caption":"from", "type":"datepicker", "width":120}, {"caption":"to", "type":"datepicker", "width":120}, {"type":"button", "caption":"remove", "width":45, "cellClass":"gridbutton"}])
                .setDropKeys("iEvent2")
                .onClickButton("_treegrid2_onclickbutton")
                .onDrop("_od")
            );
            
            host.pane3.append((new linb.UI.TimeLine)
                .host(host,"timeline1")
                .setLeft(0)
                .setTop(240)
                .setWidth(780)
                .setHeight(260)
                .setReadonly(true)
                .setDftTaskName("course")
                .setTaskHeight(54)
                .setUnitPixs(48)
                .setMultiTasks(true)
                .setDateBtn(false)
                .onGetContent("_timeline1_ongetcontent")
                .beforeNewTasks("_timeline1_beforenewtasks")
                .beforeDragTask("_timeline1_beforedrag")
            );
            
            host.pane3.append((new linb.UI.Label)
                .host(host,"label1")
                .setLeft(480)
                .setTop(60)
                .setCaption("Your selection")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            host.pane3.append((new linb.UI.Button)
                .host(host,"button3")
                .setLeft(620)
                .setTop(20)
                .setWidth(150)
                .setCaption("Approve this request")
                .onClick("_button3_onclick")
            );
            
            host.pane3.append((new linb.UI.DatePicker)
                .host(host,"datepicker1")
                .setLeft(0)
                .setTop(87)
                .afterUIValueSet("_datepicker1_afteruivalueset")
            );
            
            host.pane3.append((new linb.UI.Label)
                .host(host,"label4")
                .setLeft(20)
                .setTop(10)
                .setWidth(480)
                .setHeight(30)
                .setCaption("Mr. xxx, welcom to training online management")
                .setShadowText(true)
                .setHAlign("left")
                .setFontSize("14px")
                .setFontWeight("bold")
            );
            
            return children;
            // ]]code created by jsLinb UI Builder
        }, 
        _timeline1_beforenewtasks:function (profile, tasks) {
        }, 
        _timeline1_beforedrag:function(profile, item,e,src){
            linb(src).startDrag(e, {
                dragDefer:1,
                dragCursor:'default',
                dragType:'icon',
                shadowFrom:linb([src]).parent(),
                dragKey:'iEvent2',
                dragData:item
            });
            return false;
        }, 
        _od:function(profile,e,src,key,data,item){
            this._select(data);
        }, 
        _selectFromNode:function(src){
            var item=this.timeline1.getItemByDom(src);
            if(item)
                SPA._select(item, src);
        }, 
        _select:function(data, src){
            var grid=this.treegrid2,
                rows=grid.getRows(),
                index=_.arr.subIndexOf(rows,'id',data.id);
            if(index!=-1){
                linb.message('You\'ve selected it already!');
                return;
            }

            if(SPA.inSelectProcess)return;
            SPA.inSelectProcess=true;

            var item={id:data.id, cells:[data.value,data.from,data.to,'X']};
            {
                src = src||SPA.timeline1.getSubNodeByItemId('ITEM',data.id);
                var pos=linb(src).offset(),
                    size=linb(src).cssSize(),
                    body=SPA.treegrid2.getSubNode('BODY'),
                    last=body.last(),
                    width=body.parent().width(),
                    tpos;
                if(last.isEmpty()){
                    tpos=body.offset();
                }else{
                    tpos=last.offset();
                    tpos.top+=last.height();
                }
                linb.Dom.animate({border:'dashed 1px #ff0000'},{left:[pos.left,tpos.left],top:[pos.top,tpos.top],width:[size.width,width],height:[size.height, 20]}, null,function(){
                    grid.insertRows([item]);
                    SPA.inSelectProcess=false;
                },360,12,'outexp').start();
            }

        }, 
        _button3_onclick:function (profile, e, src, value) {
            alert('This is for manager to approve the current selection.');
        }, 
        _datepicker1_afteruivalueset:function (profile, oldValue, newValue) {
            this.timeline1.setDateStart(newValue);
        }, 
        _onready:function () {
            SPA=this;
            linb.CSS.addStyleSheet('.gridbutton button{border:0} .hcenter{margin:0 auto;}')
            SPA.timeline1.setMinDate(new Date());

            var arr=SPA.courses=[],
                d=linb.Date.getTimSpanStart(new Date(),'d'),
                renderer=function(v){
                    v.caption="<strong>"+v.value+"</strong><p>"+v.location+"</p>";
                    return v.caption + "<button onclick='SPA._selectFromNode(this.parentNode)' style='position:absolute;bottom:2px;right:2px;'>select it</button>";
                };
            arr.push({
                id:_.id(),
                from:linb.Date.add(d,'d',1).getTime(),
                to:linb.Date.add(d,'d',4).getTime(),
                value:'Module 1',
                location:'[Beijing Yejian Hotlel]',
                renderer:renderer
            },{
                id:_.id(),
                from:linb.Date.add(d,'d',1).getTime(),
                to:linb.Date.add(d,'d',4).getTime(),
                value:'Module 1',
                location:'[Shanghai xx Hotlel]',
                background:'#00ff00;',
                renderer:renderer
            },{
                id:_.id(),
                from:linb.Date.add(d,'d',5).getTime(),
                to:linb.Date.add(d,'d',8).getTime(),
                value:'Module 2',
                location:'[Beijing Yejian Hotlel]',
                renderer:renderer
            },{
                id:_.id(),
                from:linb.Date.add(d,'d',10).getTime(),
                to:linb.Date.add(d,'d',13).getTime(),
                value:'Module 3',
                location:'[Beijing Yejian Hotlel]',
                renderer:renderer
            });
        }, 
        _treegrid2_onclickbutton:function (profile, cell, proEditor, pos, e, src) {
            linb.UI.Dialog.confirm('confirm','Do you mean to remove the course?',function(){
                profile.boxing().removeRows([cell._row.id]);
            });
        }, 
        _timeline1_ongetcontent:function (profile, from, to, minMs, type, callback, threadid) {
            var datasource=SPA.courses;
 
            from=from.getTime();
            to=to.getTime();
            var tasks=[];
            if(type=='ini'){
                _.arr.each(datasource,function(o){
                    if(o.to >= from && o.from < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }else if(type=='left'){
                _.arr.each(datasource,function(o){
                    if(o.to >= from && o.to < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }else{
                _.arr.each(datasource,function(o){
                    if(o.from >= from && o.from < to && (o.to - o.from > minMs))
                        tasks.push(o);
                });
            }
            var arr = _.clone(tasks);
            profile.boxing().addTasks(arr);
        }
    }
});